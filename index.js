const { withXcodeProject, withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * Expo Config Plugin to fix iOS Simulator arm64 architecture issues
 * 
 * v3.0 - Universal project detection with direct .pbxproj modification
 * Automatically works with any Expo/React Native project
 * 
 * @param {object} config - The Expo config object
 * @param {object} props - Plugin configuration options
 * @param {string} props.method - Method to use: 'xcode' (default), 'podfile', or 'both'
 * @param {boolean} props.applyToAllTargets - Whether to apply to all targets (default: true)
 * @returns {object} Modified config
 */
const withFixIOSSimulatorArch = (config, props = {}) => {
  const { method = 'xcode' } = props;

  // Default method: Direct Xcode project modification (RECOMMENDED)
  if (method === 'xcode') {
    return withXcodeMethod(config, props);
  } 
  // Alternative: Podfile post_install hook
  else if (method === 'podfile') {
    return withPodfileMethod(config, props);
  } 
  // Combined: Both methods for maximum compatibility
  else if (method === 'both') {
    let newConfig = withXcodeMethod(config, props);
    newConfig = withPodfileMethod(newConfig, props);
    return newConfig;
  }

  return config;
};


/**
 * v3.0: Modify Xcode project directly (Universal)
 * Automatically detects project name and works with any Expo/React Native project
 * Only modifies DEBUG configurations, not Release
 * Only applies on Apple Silicon Macs (arm64 architecture)
 */
const withXcodeMethod = (config, props = {}) => {
  const { applyToAllTargets = true, targetNames = [], debugOnly = true } = props;

  return withXcodeProject(config, async (config) => {
    const xcodeProject = config.modResults;
    
    // Check if running on Apple Silicon Mac
    const currentArch = os.arch(); // 'arm64' for Apple Silicon, 'x64' for Intel
    const isAppleSilicon = currentArch === 'arm64';
    
    // Automatically get project name from config
    const projectName = config.modRequest.projectName || config.name || 'App';
    
    console.log(`🔧 iOS Simulator Architecture Fix for ${projectName}`);
    console.log(`   Current architecture: ${currentArch} (${isAppleSilicon ? 'Apple Silicon' : 'Intel'})`);
    
    // Only apply fix on Apple Silicon Macs
    if (!isAppleSilicon) {
      console.log(`   ℹ️  Skipping fix - not needed on Intel Mac`);
      return config;
    }
    
    console.log(`   Mode: ${debugOnly ? 'Debug only' : 'Debug and Release'}`);

    // Get the main project
    const project = xcodeProject.getFirstProject();
    if (!project) {
      console.log('⚠️  Could not find project');
      return config;
    }

    const projectUuid = project.uuid;
    const configurations = xcodeProject.pbxXCBuildConfigurationSection();
    let fixedCount = 0;
    let addedCount = 0;
    const processedConfigs = new Set();

    // Process all build configurations
    for (const key in configurations) {
      const buildConfig = configurations[key];
      
      // Skip non-object entries and already processed configs
      if (typeof buildConfig !== 'object' || !buildConfig.buildSettings || processedConfigs.has(key)) {
        continue;
      }

      const buildSettings = buildConfig.buildSettings;
      const configName = buildConfig.name;
      
      // Only process Debug configurations if debugOnly is true
      if (debugOnly && configName !== 'Debug') {
        continue;
      }
      
      // Check if this configuration belongs to the main project or its targets
      let shouldFix = applyToAllTargets;
      
      if (!applyToAllTargets && targetNames.length > 0) {
        shouldFix = targetNames.some(name => 
          key.includes(name) || 
          configName?.includes(name) ||
          (buildConfig.baseConfigurationReference?.comment?.includes(name))
        );
      }

      if (shouldFix && buildSettings) {
        // Use quoted key name to ensure consistent formatting in .pbxproj
        // Result in .pbxproj: "EXCLUDED_ARCHS[sdk=iphonesimulator*]" = "";
        const archKey = 'EXCLUDED_ARCHS[sdk=iphonesimulator*]';
        const quotedArchKey = `"${archKey}"`;
        
        // Check both quoted and unquoted keys
        let currentValue = buildSettings[quotedArchKey] || buildSettings[archKey];
        const actualKey = buildSettings[quotedArchKey] !== undefined ? quotedArchKey : archKey;
        
        if (currentValue !== undefined) {
          // If exists and has a value (like 'arm64'), set to empty string
          if (currentValue === 'arm64' || currentValue === '"arm64"') {
            // Remove old key if it exists
            delete buildSettings[archKey];
            delete buildSettings[quotedArchKey];
            // Add with quoted key
            buildSettings[quotedArchKey] = '""';
            console.log(`  ✅ Fixed ${configName}: "EXCLUDED_ARCHS[sdk=iphonesimulator*]" = ""`);
            fixedCount++;
          } else if (currentValue === '""' || currentValue === '') {
            // Ensure it uses quoted key
            if (actualKey !== quotedArchKey) {
              delete buildSettings[archKey];
              buildSettings[quotedArchKey] = '""';
              console.log(`  ✅ Updated ${configName}: ensured quoted key format`);
              fixedCount++;
            } else {
              console.log(`  ℹ️  ${configName}: already set correctly`);
            }
          }
          processedConfigs.add(key);
        } else {
          // If doesn't exist, add it with quoted key and empty string value
          buildSettings[quotedArchKey] = '""';
          console.log(`  ✅ Added ${configName}: "EXCLUDED_ARCHS[sdk=iphonesimulator*]" = ""`);
          addedCount++;
          processedConfigs.add(key);
        }
      }
    }

    const totalChanges = fixedCount + addedCount;
    if (totalChanges > 0) {
      console.log(`✨ Architecture fix complete for ${projectName}!`);
      if (fixedCount > 0) console.log(`   Fixed: ${fixedCount} configuration(s)`);
      if (addedCount > 0) console.log(`   Added: ${addedCount} configuration(s)`);
    } else {
      console.log(`ℹ️  No changes needed. ${projectName} already configured correctly.`);
    }

    return config;
  });
};

/**
 * v2.0: Modify Podfile with post_install hook (Legacy)
 */
const withPodfileMethod = (config, props = {}) => {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const projectRoot = config.modRequest.projectRoot;
      const podfilePath = path.join(projectRoot, 'ios', 'Podfile');

      if (!fs.existsSync(podfilePath)) {
        console.log('⚠️  Podfile not found');
        return config;
      }

      let podfileContent = fs.readFileSync(podfilePath, 'utf8');

      if (podfileContent.includes('# Fix iOS Simulator arm64 architecture')) {
        console.log('ℹ️  iOS Simulator arch fix already added to Podfile');
        return config;
      }

      console.log('🔧 Adding iOS Simulator architecture fix to Podfile...');

      const fixCode = `
    # Fix iOS Simulator arm64 architecture
    # Added by expo-fix-ios-simulator-arch plugin
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        # Remove arm64 exclusion for simulator to support Apple Silicon Macs
        config.build_settings.delete('EXCLUDED_ARCHS[sdk=iphonesimulator*]')
      end
    end
`;

      const postInstallRegex = /post_install do \|installer\|([\s\S]*?)^end$/m;
      const match = podfileContent.match(postInstallRegex);

      if (match) {
        const existingContent = match[1];
        const newContent = existingContent + '\n' + fixCode + '\n  ';
        podfileContent = podfileContent.replace(
          postInstallRegex,
          `post_install do |installer|${newContent}end`
        );
        console.log('  ✅ Added architecture fix to existing post_install hook');
      } else {
        const lastEndIndex = podfileContent.lastIndexOf('end');
        if (lastEndIndex !== -1) {
          const newPostInstall = `
  post_install do |installer|
${fixCode}
  end
`;
          podfileContent = 
            podfileContent.slice(0, lastEndIndex) +
            newPostInstall + '\n' +
            podfileContent.slice(lastEndIndex);
          console.log('  ✅ Created new post_install hook with architecture fix');
        }
      }

      fs.writeFileSync(podfilePath, podfileContent, 'utf8');
      console.log('✨ Podfile updated successfully!');

      return config;
    },
  ]);
};

// Export the default method (xcode)
module.exports = withFixIOSSimulatorArch;

// Export alternative methods
module.exports.withFixIOSSimulatorArch = withFixIOSSimulatorArch;
module.exports.withXcodeMethod = withXcodeMethod;
module.exports.withPodfileMethod = withPodfileMethod;
