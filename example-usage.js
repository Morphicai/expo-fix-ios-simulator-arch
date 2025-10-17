/**
 * Example Usage of expo-fix-ios-simulator-arch plugin
 * 
 * Add these examples to your app.config.js file
 */

// ========================================
// Method 1: Xcode Project Modification (Recommended)
// ========================================

// Example 1A: Basic usage - Automatically fix all targets (RECOMMENDED)
module.exports = {
  expo: {
    name: 'My App',
    slug: 'my-app',
    plugins: [
      './plugins/fix-ios-simulator-arch',
    ],
  },
};

// Example 1B: Fix specific targets only
module.exports = {
  expo: {
    name: 'My App',
    slug: 'my-app',
    plugins: [
      [
        './plugins/fix-ios-simulator-arch',
        {
          applyToAllTargets: false,
          targetNames: ['MyApp', 'MyAppTests'],
        },
      ],
    ],
  },
};

// Example 1C: Explicit configuration
module.exports = {
  expo: {
    name: 'My App',
    slug: 'my-app',
    plugins: [
      [
        './plugins/fix-ios-simulator-arch',
        {
          applyToAllTargets: true, // Default behavior
        },
      ],
    ],
  },
};

// ========================================
// Method 2: Podfile Hook
// ========================================

// Example 2A: Using Podfile modification method
const { withFixIOSSimulatorArchPodfile } = require('./plugins/fix-ios-simulator-arch');

module.exports = {
  expo: {
    name: 'My App',
    slug: 'my-app',
    plugins: [
      withFixIOSSimulatorArchPodfile,
    ],
  },
};

// ========================================
// Method 3: Combined Approach
// ========================================

// Example 3A: Use both Xcode and Podfile methods
const { withFixIOSSimulatorArchCombined } = require('./plugins/fix-ios-simulator-arch');

module.exports = {
  expo: {
    name: 'My App',
    slug: 'my-app',
    plugins: [
      [
        withFixIOSSimulatorArchCombined,
        {
          method: 'both', // Use both Xcode and Podfile methods
          applyToAllTargets: true,
        },
      ],
    ],
  },
};

// Example 3B: Choose method dynamically
const { withFixIOSSimulatorArchCombined } = require('./plugins/fix-ios-simulator-arch');

module.exports = {
  expo: {
    name: 'My App',
    slug: 'my-app',
    plugins: [
      [
        withFixIOSSimulatorArchCombined,
        {
          method: 'xcode', // Options: 'xcode', 'podfile', 'both'
        },
      ],
    ],
  },
};

// ========================================
// Real-World Complete Example
// ========================================

// Example 4: Complete app configuration with multiple plugins
module.exports = {
  expo: {
    name: 'Morphix AI',
    slug: 'morphix-ai',
    version: '1.0.0',
    ios: {
      bundleIdentifier: 'com.example.morphixai',
      supportsTablet: true,
    },
    plugins: [
      'expo-camera',
      'expo-location',
      ['expo-build-properties', {
        ios: {
          deploymentTarget: '15.1',
        },
      }],
      // Add the iOS Simulator architecture fix
      './plugins/fix-ios-simulator-arch',
      // ... other plugins
    ],
  },
};

// ========================================
// NPM Package Usage (After Publishing)
// ========================================

// Example 5: Using as an installed npm package
module.exports = {
  expo: {
    name: 'My App',
    slug: 'my-app',
    plugins: [
      // After publishing to npm
      'expo-fix-ios-simulator-arch',
    ],
  },
};

// Example 6: With options from npm package
module.exports = {
  expo: {
    name: 'My App',
    slug: 'my-app',
    plugins: [
      [
        'expo-fix-ios-simulator-arch',
        {
          applyToAllTargets: true,
        },
      ],
    ],
  },
};

// ========================================
// Advanced: Conditional Application
// ========================================

// Example 7: Only apply on macOS
const os = require('os');
const isMac = os.platform() === 'darwin';

module.exports = {
  expo: {
    name: 'My App',
    slug: 'my-app',
    plugins: [
      ...(isMac ? ['./plugins/fix-ios-simulator-arch'] : []),
      // ... other plugins
    ],
  },
};

// Example 8: Apply based on environment
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  expo: {
    name: 'My App',
    slug: 'my-app',
    plugins: [
      ...(isDevelopment ? ['./plugins/fix-ios-simulator-arch'] : []),
      // ... other plugins
    ],
  },
};

// ========================================
// Migration Examples
// ========================================

// Example 9: Migrating from old hardcoded path approach
// OLD WAY (don't use):
// module.exports = {
//   expo: {
//     plugins: [
//       [
//         './plugins/fix-ios-simulator-arch-old',
//         {
//           filesToModify: [
//             'ios/Pods/Target Support Files/...',
//           ],
//         },
//       ],
//     ],
//   },
// };

// NEW WAY (recommended):
module.exports = {
  expo: {
    name: 'My App',
    slug: 'my-app',
    plugins: [
      './plugins/fix-ios-simulator-arch', // No configuration needed!
    ],
  },
};

// ========================================
// TypeScript Example
// ========================================

// Example 10: Using in TypeScript config (app.config.ts)
// import { ExpoConfig, ConfigContext } from '@expo/config';
// 
// export default ({ config }: ConfigContext): ExpoConfig => ({
//   ...config,
//   name: 'My App',
//   slug: 'my-app',
//   plugins: [
//     './plugins/fix-ios-simulator-arch',
//   ],
// });

// ========================================
// Debugging Examples
// ========================================

// Example 11: With console logging for debugging
module.exports = {
  expo: {
    name: 'My App',
    slug: 'my-app',
    plugins: [
      [
        './plugins/fix-ios-simulator-arch',
        {
          applyToAllTargets: true,
        },
      ],
    ],
  },
};
// Then run: npx expo prebuild --clean
// Look for: "🔧 Fixing iOS Simulator architecture in Xcode project..."
