# Contributing to expo-fix-ios-simulator-arch

First off, thank you for considering contributing to expo-fix-ios-simulator-arch! 🎉

## 🌟 Ways to Contribute

There are many ways you can contribute to this project:

- 🐛 **Report Bugs** - Found a bug? Let us know!
- 💡 **Suggest Features** - Have an idea? We'd love to hear it!
- 📖 **Improve Documentation** - Help others understand how to use the plugin
- 🔧 **Submit Code** - Fix bugs or add features
- ⭐ **Star the Project** - Show your support!
- 📣 **Spread the Word** - Tell others about the plugin

## 🐛 Reporting Bugs

Before creating a bug report, please check the [existing issues](https://github.com/Morphicai/expo-fix-ios-simulator-arch/issues) to see if the problem has already been reported.

### How to Submit a Good Bug Report

A good bug report includes:

1. **A clear title** - Describe the issue in one sentence
2. **Steps to reproduce** - How can we trigger the bug?
3. **Expected behavior** - What should happen?
4. **Actual behavior** - What actually happens?
5. **Environment details**:
   - macOS version
   - CPU architecture (Intel or Apple Silicon)
   - Expo SDK version
   - Node.js version
   - Plugin version

**Bug Report Template:**

```markdown
## Description
Brief description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- macOS: 14.0
- Architecture: arm64 (Apple Silicon M2)
- Expo SDK: 50.0.0
- Node.js: 18.0.0
- Plugin Version: 3.1.0

## Additional Context
Any other relevant information
```

## 💡 Suggesting Features

We love new ideas! Before suggesting a feature:

1. Check if it has already been suggested in [issues](https://github.com/Morphicai/expo-fix-ios-simulator-arch/issues)
2. Make sure it aligns with the plugin's goals
3. Consider if it would benefit most users

**Feature Request Template:**

```markdown
## Feature Description
Clear description of the feature

## Problem It Solves
What problem does this feature address?

## Proposed Solution
How should it work?

## Alternatives Considered
Other ways to solve the problem

## Additional Context
Any other relevant information
```

## 🔧 Development Setup

### Prerequisites

- Node.js 14.0.0 or higher
- macOS (for iOS development)
- Git

### Getting Started

1. **Fork the repository**

   Click the "Fork" button on GitHub

2. **Clone your fork**

   ```bash
   git clone git@github.com:YOUR_USERNAME/expo-fix-ios-simulator-arch.git
   cd expo-fix-ios-simulator-arch
   ```

3. **Add upstream remote**

   ```bash
   git remote add upstream git@github.com:Morphicai/expo-fix-ios-simulator-arch.git
   ```

4. **Install dependencies** (if any)

   ```bash
   npm install
   ```

### Making Changes

1. **Create a new branch**

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**

   - Write clear, concise code
   - Follow the existing code style
   - Add comments where necessary
   - Update documentation if needed

3. **Test your changes**

   ```bash
   # Create a test Expo project
   npx create-expo-app test-project
   cd test-project
   
   # Link your local plugin
   npm install ../expo-fix-ios-simulator-arch
   
   # Add plugin to app.config.js
   # ...
   
   # Test prebuild
   npx expo prebuild --clean --platform ios
   ```

4. **Commit your changes**

   Use clear, descriptive commit messages:

   ```bash
   git commit -m "feat: add support for custom target selection"
   git commit -m "fix: resolve pbxproj parsing error"
   git commit -m "docs: update README with new examples"
   ```

   **Commit Message Convention:**

   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `refactor:` - Code refactoring
   - `test:` - Adding or updating tests
   - `chore:` - Maintenance tasks

5. **Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**

   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template
   - Submit!

## 📝 Pull Request Guidelines

### Before Submitting

- [ ] Code follows the project's style
- [ ] Changes have been tested
- [ ] Documentation has been updated
- [ ] Commit messages are clear
- [ ] No merge conflicts

### PR Description Should Include

- **What** - What does this PR do?
- **Why** - Why is this change needed?
- **How** - How does it work?
- **Testing** - How was it tested?
- **Screenshots** - If applicable

**PR Template:**

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Other (please describe)

## Testing
How was this tested?

## Checklist
- [ ] Code follows project style
- [ ] Changes have been tested
- [ ] Documentation updated
- [ ] No breaking changes
```

## 🎨 Code Style

- Use **2 spaces** for indentation
- Use **single quotes** for strings
- Add **semicolons**
- Use **meaningful variable names**
- Add **comments** for complex logic
- Keep functions **small and focused**

## 📖 Documentation Guidelines

When updating documentation:

- Use clear, simple language
- Include code examples
- Add screenshots if helpful
- Update CHANGELOG.md
- Keep README.md up to date

## 🔄 Keeping Your Fork Updated

Sync your fork with upstream:

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## 🧪 Testing

### Manual Testing

1. Create a new Expo project
2. Install the plugin
3. Add to app.config.js
4. Run `npx expo prebuild`
5. Verify the fix is applied
6. Build and run on simulator

### Test Scenarios

- ✅ Apple Silicon Mac
- ✅ Intel Mac
- ✅ Debug configuration
- ✅ Release configuration
- ✅ Multiple targets
- ✅ Different project names

## 📋 Code Review Process

1. **Submit PR** - Create your pull request
2. **Initial Review** - Maintainers review within 3-5 days
3. **Feedback** - Address any requested changes
4. **Approval** - At least one maintainer approval required
5. **Merge** - Maintainer merges the PR

## 🎯 Project Goals

Keep these goals in mind when contributing:

1. **Zero Configuration** - Should work out of the box
2. **Universal** - Works with any project
3. **Safe** - No breaking changes to user projects
4. **Simple** - Easy to understand and use
5. **Reliable** - Consistent behavior

## ❓ Questions?

- **General Questions** - Open a [Discussion](https://github.com/Morphicai/expo-fix-ios-simulator-arch/discussions)
- **Bug Reports** - Open an [Issue](https://github.com/Morphicai/expo-fix-ios-simulator-arch/issues)
- **Contact Maintainer** - Email [Paul](mailto:roc.liu@hotmail.com)

## 📜 Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🏆 Recognition

Contributors will be:

- Listed in the project's contributors
- Mentioned in release notes (for significant contributions)
- Thanked in the community

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to expo-fix-ios-simulator-arch! 🙌

Your contributions help make iOS development on Apple Silicon Macs easier for everyone! 🎉

