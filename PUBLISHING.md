# Publishing Guide

This guide explains how to publish new versions of `expo-fix-ios-simulator-arch` to npm.

## 📋 Prerequisites

1. **npm Account**: You need an npm account with publish permissions
2. **2FA Enabled**: Two-factor authentication should be enabled on npm
3. **Maintainer Access**: You must be a maintainer of the package

## 🔑 Setup npm Access

### First Time Setup

1. **Login to npm**:
   ```bash
   npm login
   ```

2. **Verify your account**:
   ```bash
   npm whoami
   ```

3. **Generate an access token** (for CI/CD):
   - Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   - Click "Generate New Token"
   - Select "Automation" type
   - Save the token securely

### Configure GitHub Secrets

For automated publishing via GitHub Actions:

1. Go to repository Settings → Secrets and variables → Actions
2. Add a new secret named `NPM_TOKEN`
3. Paste your npm automation token

## 📦 Publishing Process

### 1. Update Version

Update the version in `package.json`:

```bash
# Patch release (3.1.0 → 3.1.1) - Bug fixes
npm version patch

# Minor release (3.1.0 → 3.2.0) - New features
npm version minor

# Major release (3.1.0 → 4.0.0) - Breaking changes
npm version major
```

### 2. Update CHANGELOG.md

Add your changes to `CHANGELOG.md`:

```markdown
## [3.1.1] - 2025-10-18

### Fixed
- Fixed issue with...

### Added
- Added support for...
```

### 3. Commit Changes

```bash
git add package.json CHANGELOG.md
git commit -m "chore: bump version to 3.1.1"
git push
```

### 4. Create a Git Tag

```bash
git tag -a v3.1.1 -m "Release v3.1.1"
git push origin v3.1.1
```

### 5. Publish to npm

#### Manual Publishing

```bash
# Dry run to see what will be published
npm pack --dry-run

# Publish to npm
npm publish --access public
```

#### Automated Publishing (Recommended)

1. Go to GitHub repository
2. Click on "Releases"
3. Click "Draft a new release"
4. Fill in:
   - **Tag**: `v3.1.1`
   - **Release title**: `v3.1.1 - Bug Fixes and Improvements`
   - **Description**: Copy from CHANGELOG.md
5. Click "Publish release"

GitHub Actions will automatically publish to npm! 🎉

## 🔍 Verify Publication

1. **Check npm**:
   ```bash
   npm view expo-fix-ios-simulator-arch
   ```

2. **Test installation**:
   ```bash
   npm install expo-fix-ios-simulator-arch@latest
   ```

3. **Check package page**:
   - https://www.npmjs.com/package/expo-fix-ios-simulator-arch

## ✅ Post-Release Checklist

After publishing:

- [ ] Verify package is available on npm
- [ ] Test installation in a new project
- [ ] Update GitHub release notes if needed
- [ ] Announce on social media (optional)
- [ ] Close related issues and PRs

## 🐛 Troubleshooting

### Error: "You do not have permission to publish"

**Solution**: Make sure you're logged in and have maintainer access:
```bash
npm whoami
npm owner ls expo-fix-ios-simulator-arch
```

### Error: "Version already exists"

**Solution**: You need to bump the version number:
```bash
npm version patch
```

### Error: "This package has been marked as private"

**Solution**: Ensure `package.json` doesn't have `"private": true`

### GitHub Actions Not Publishing

**Solution**: Check these:
1. `NPM_TOKEN` secret is set correctly
2. Tag format matches workflow (should be `v3.1.1`)
3. Check workflow logs in Actions tab

## 📚 Version Guidelines

Follow [Semantic Versioning](https://semver.org/):

### Patch (3.1.0 → 3.1.1)
- Bug fixes
- Documentation updates
- Minor improvements
- No breaking changes
- No new features

### Minor (3.1.0 → 3.2.0)
- New features
- New options
- Backwards compatible changes
- Deprecations (with warnings)

### Major (3.0.0 → 4.0.0)
- Breaking changes
- API changes
- Removed features
- Changed defaults
- Migration guide required

## 📝 Release Notes Template

Use this template for GitHub releases:

```markdown
## 🎉 What's New

- Feature 1
- Feature 2

## 🐛 Bug Fixes

- Fix 1
- Fix 2

## 📖 Documentation

- Updated README
- Added examples

## 🙏 Contributors

Thanks to @username for contributions!

## 📦 Installation

\`\`\`bash
npm install expo-fix-ios-simulator-arch@3.1.1
\`\`\`

## 📋 Full Changelog

See [CHANGELOG.md](./CHANGELOG.md) for complete details.
```

## 🔐 Security

- **Never** commit npm tokens
- **Always** use automation tokens for CI/CD
- **Enable** 2FA on your npm account
- **Rotate** tokens regularly

## 📞 Need Help?

- Open an issue on GitHub
- Email: roc.liu@hotmail.com

---

Happy Publishing! 🚀

