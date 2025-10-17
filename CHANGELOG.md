# Changelog

All notable changes to this project will be documented in this file.

## [3.1.0] - 2025-10-17

### 🎯 Smart Architecture Detection

**Added intelligent CPU architecture detection to only apply fix when needed**

### Added
- ✨ **Architecture Detection**: Automatically detects CPU architecture using `os.arch()`
- ✨ **Conditional Fix**: Only applies fix on Apple Silicon Macs (arm64)
- ✨ **Intel Mac Skip**: Automatically skips on Intel Macs (x64) where fix is not needed
- ✨ **Quoted Keys**: Ensures build setting keys are always properly quoted in `.pbxproj`
- 📖 Added `EXAMPLE_OUTPUT.md` showing output on different architectures
- 📖 Updated documentation explaining architecture detection

### Changed
- 🔄 Plugin now checks `os.arch()` before applying modifications
- 🔄 Build setting key format changed to quoted: `"EXCLUDED_ARCHS[sdk=iphonesimulator*]"`
- 🔄 Console output now shows detected architecture and reason for skip/apply
- 🔄 More intelligent behavior based on host machine type

### Benefits
- ✅ **Efficiency**: No unnecessary modifications on Intel Macs
- ✅ **Team Collaboration**: Works seamlessly in teams with mixed Mac types
- ✅ **Performance**: Faster prebuild on Intel Macs (no processing needed)
- ✅ **Clarity**: Clear console output explains what's happening and why

### Architecture Detection Logic

| Mac Type | CPU Arch | `os.arch()` | Result |
|----------|----------|-------------|--------|
| M1/M2/M3/M4 | ARM | `arm64` | ✅ Apply fix |
| Intel | x86_64 | `x64` | ⏭️ Skip fix |

### Example Output

**On Apple Silicon:**
```
🔧 iOS Simulator Architecture Fix for YourProject
   Current architecture: arm64 (Apple Silicon)
   Mode: Debug only
  ✅ Added Debug: "EXCLUDED_ARCHS[sdk=iphonesimulator*]" = ""
✨ Architecture fix complete!
```

**On Intel Mac:**
```
🔧 iOS Simulator Architecture Fix for YourProject
   Current architecture: x64 (Intel)
   ℹ️  Skipping fix - not needed on Intel Mac
```

---

## [2.0.0] - 2025-10-17

### 🎉 Major Improvement - Breaking Change

**Changed default implementation from xcconfig file modification to Xcode project modification**

### Added
- ✨ **NEW DEFAULT**: Direct Xcode project build settings modification using `withXcodeProject`
- ✨ No more hardcoded paths - works universally across all projects
- ✨ Three methods available: Xcode (default), Podfile, or Combined
- ✨ `applyToAllTargets` option for flexible target selection
- ✨ `targetNames` option to fix specific targets only
- ✨ `withFixIOSSimulatorArchCombined` export for using multiple methods
- ✨ Better console output with detailed progress information
- 📖 Comprehensive comparison documentation of all methods
- 📖 Migration guide from v1.x to v2.x

### Changed
- 🔄 **BREAKING**: Default behavior now modifies Xcode project instead of xcconfig files
- 🔄 More elegant and maintainable solution
- 🔄 Improved error handling and logging
- 📖 Updated README with detailed method comparison
- 📖 Enhanced example-usage.js with more scenarios

### Why This is Better
- ✅ Works at project level, not file level
- ✅ No hardcoded file paths
- ✅ Survives any pod changes
- ✅ Applies to all targets automatically
- ✅ More portable across different projects
- ✅ Cleaner codebase

### Migration Guide from v1.x

No changes needed in your `app.config.js`! The new version uses the same API but with a better implementation:

```js
// Your existing config works exactly the same
plugins: [
  './plugins/fix-ios-simulator-arch',
]
```

If you want to use the old xcconfig file modification approach, you can explicitly choose the Podfile method:

```js
const { withFixIOSSimulatorArchPodfile } = require('./plugins/fix-ios-simulator-arch');

plugins: [
  withFixIOSSimulatorArchPodfile,
]
```

## [1.0.0] - 2025-10-17

### Added
- Initial release
- Automatic fix for iOS Simulator arm64 architecture exclusion
- Support for fixing all pods or specific pods
- Comprehensive documentation and usage examples
- Two implementation approaches:
  - Direct xcconfig file modification (deprecated in v2.0.0)
  - Podfile post_install hook modification

### Features
- Fix CocoaPods xcconfig files
- Support for custom pod selection
- Detailed logging and progress reporting
- MIT License
- Complete documentation

### Known Limitations (Fixed in v2.0.0)
- Required hardcoded file paths
- Only worked for specific pod names
- Needed updates when pods changed
- Less portable across projects
