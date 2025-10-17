# 🎯 expo-fix-ios-simulator-arch

[![npm version](https://badge.fury.io/js/expo-fix-ios-simulator-arch.svg)](https://www.npmjs.com/package/expo-fix-ios-simulator-arch)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

An Expo config plugin to automatically fix iOS Simulator arm64 architecture issues on Apple Silicon Macs. **Zero configuration, works with any Expo/React Native project!**

## 🚨 The Problem

When running iOS apps on Apple Silicon Macs (M1/M2/M3/M4) with the iOS Simulator, some CocoaPods dependencies may exclude the arm64 architecture, causing build failures:

```
❌ building for iOS Simulator, but linking in object file built for iOS
```

## ✨ The Solution

This plugin provides an elegant, project-level fix that:

- ✅ **Smart Detection** - Only runs on Apple Silicon Macs, skips on Intel
- ✅ **Zero Configuration** - Works with any project name automatically
- ✅ **Debug Only** - Only modifies Debug builds, keeps Release untouched
- ✅ **Universal** - No hardcoded paths, adapts to your project
- ✅ **Automatic** - Runs during `expo prebuild`, no manual steps
- ✅ **Safe** - Only modifies simulator settings, doesn't affect device builds

## 📦 Installation

```bash
npm install expo-fix-ios-simulator-arch
# or
yarn add expo-fix-ios-simulator-arch
# or
pnpm add expo-fix-ios-simulator-arch
```

## 🚀 Usage

### Quick Start (Recommended)

Add to your `app.config.js` or `app.json`:

```js
// app.config.js
module.exports = {
  expo: {
    // ... other config
    plugins: [
      // ... other plugins
      'expo-fix-ios-simulator-arch',
    ],
  },
};
```

That's it! No configuration needed. 🎉

### Rebuild Your Project

```bash
npx expo prebuild --clean --platform ios
npx expo run:ios
```

## 🎯 How It Works

### Smart Architecture Detection

The plugin automatically detects your Mac's CPU architecture:

| Mac Type | Architecture | Action |
|----------|--------------|--------|
| Apple Silicon (M1/M2/M3/M4) | `arm64` | ✅ Apply fix |
| Intel Mac | `x64` | ⏭️ Skip (not needed) |

### What Gets Modified

**On Apple Silicon Macs**, the plugin:

1. Detects your project name automatically
2. Only modifies **Debug** configurations (not Release)
3. Sets `"EXCLUDED_ARCHS[sdk=iphonesimulator*]" = ""` in `.pbxproj`
4. Ensures proper formatting with quoted keys

**Before Fix:**
```
EXCLUDED_ARCHS[sdk=iphonesimulator*] = arm64;
```

**After Fix:**
```
"EXCLUDED_ARCHS[sdk=iphonesimulator*]" = "";
```

### Example Output

**On Apple Silicon:**
```bash
🔧 iOS Simulator Architecture Fix for YourProject
   Current architecture: arm64 (Apple Silicon)
   Mode: Debug only
  ✅ Added Debug: "EXCLUDED_ARCHS[sdk=iphonesimulator*]" = ""
✨ Architecture fix complete for YourProject!
   Added: 2 configuration(s)
```

**On Intel Mac:**
```bash
🔧 iOS Simulator Architecture Fix for YourProject
   Current architecture: x64 (Intel)
   ℹ️  Skipping fix - not needed on Intel Mac
```

## ⚙️ Advanced Configuration

### Method 1: Xcode Project Modification (Default)

The default and recommended approach:

```js
// app.config.js
module.exports = {
  expo: {
    plugins: [
      [
        'expo-fix-ios-simulator-arch',
        {
          // Apply to all targets (default: true)
          applyToAllTargets: true,
          
          // Only modify Debug configurations (default: true)
          debugOnly: true,
        },
      ],
    ],
  },
};
```

### Method 2: Podfile Hook

Alternative approach using Podfile modification:

```js
// app.config.js
module.exports = {
  expo: {
    plugins: [
      [
        'expo-fix-ios-simulator-arch',
        {
          method: 'podfile',
        },
      ],
    ],
  },
};
```

### Method 3: Combined Approach

Use both methods for maximum compatibility:

```js
// app.config.js
module.exports = {
  expo: {
    plugins: [
      [
        'expo-fix-ios-simulator-arch',
        {
          method: 'both',
          applyToAllTargets: true,
        },
      ],
    ],
  },
};
```

## 📋 Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `method` | `string` | `'xcode'` | Method to use: `'xcode'`, `'podfile'`, or `'both'` |
| `applyToAllTargets` | `boolean` | `true` | Whether to apply to all targets |
| `targetNames` | `string[]` | `[]` | Specific targets (only if `applyToAllTargets: false`) |
| `debugOnly` | `boolean` | `true` | Only modify Debug configurations |

## 🔍 Verifying the Fix

### Check Build Logs

After running `npx expo prebuild`, you should see:

```
✨ Architecture fix complete for YourProject!
   Added: 2 configuration(s)
```

### Check Xcode Project

```bash
open ios/YourApp.xcworkspace
```

Look for `EXCLUDED_ARCHS` in Build Settings for Debug configuration.

### Check Git Diff

```bash
git diff ios/YourApp.xcodeproj/project.pbxproj
```

You should see lines like:
```diff
+ "EXCLUDED_ARCHS[sdk=iphonesimulator*]" = "";
```

## 🆚 Comparison of Methods

| Feature | Xcode Project | Podfile Hook | Combined |
|---------|---------------|--------------|----------|
| No hardcoded paths | ✅ | ✅ | ✅ |
| Survives pod install | ✅ | ✅ | ✅ |
| Works with any project | ✅ | ✅ | ✅ |
| Modifies project file | ✅ | ❌ | ✅ |
| Modifies Podfile | ❌ | ✅ | ✅ |
| Simplicity | ⭐⭐⭐ | ⭐⭐ | ⭐ |
| **Recommended** | ✅ | - | - |

## 🐛 Troubleshooting

### Plugin doesn't seem to work

1. Run clean prebuild:
   ```bash
   npx expo prebuild --clean --clear
   ```

2. Check plugin is in your config:
   ```js
   plugins: ['expo-fix-ios-simulator-arch']
   ```

3. Verify you're on Apple Silicon:
   ```bash
   uname -m  # should output: arm64
   ```

### Build still fails

1. Clean build folder:
   ```bash
   cd ios && rm -rf build && cd ..
   ```

2. Clean derived data:
   ```bash
   rm -rf ~/Library/Developer/Xcode/DerivedData
   ```

3. Reinstall pods:
   ```bash
   cd ios && pod deintegrate && pod install && cd ..
   ```

4. Try combined method:
   ```js
   plugins: [
     ['expo-fix-ios-simulator-arch', { method: 'both' }]
   ]
   ```

## 📚 Documentation

- [Example Output](./EXAMPLE_OUTPUT.md) - Detailed output examples
- [Changelog](./CHANGELOG.md) - Version history
- [Example Usage](./example-usage.js) - Code examples

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📄 License

MIT © [Paul](mailto:roc.liu@hotmail.com)

## 🌟 Why This Plugin?

### Before (Manual Fix)

```bash
# Had to run after every pod install
node scripts/fix-ios-arch.js

# Hardcoded paths, breaks easily
const filesToModify = [
  'ios/Pods/.../Pods-MyApp.debug.xcconfig',
  // ... many hardcoded paths
];
```

### After (This Plugin)

```js
// Just add to config, works automatically
plugins: ['expo-fix-ios-simulator-arch']
```

## 💡 Use Cases

Perfect for:

- ✅ Teams with mixed Mac types (Apple Silicon + Intel)
- ✅ CI/CD pipelines with Apple Silicon runners
- ✅ Projects using CocoaPods with arm64 exclusions
- ✅ Anyone tired of manual architecture fixes
- ✅ Clean, maintainable Expo projects

## 🔗 Related Resources

- [Expo Config Plugins](https://docs.expo.dev/config-plugins/introduction/)
- [Xcode Build Settings](https://developer.apple.com/documentation/xcode/build-settings-reference)
- [CocoaPods Podfile](https://guides.cocoapods.org/syntax/podfile.html)
- [Apple Silicon Support](https://developer.apple.com/documentation/apple-silicon)

## ⭐ Show Your Support

If this plugin helped you, please give it a star on [GitHub](https://github.com/Morphicai/expo-fix-ios-simulator-arch)!

---

Made with ❤️ for the Expo community by [Paul](mailto:roc.liu@hotmail.com)

