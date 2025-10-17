# Security Policy

## Supported Versions

We release security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 3.1.x   | :white_check_mark: |
| 3.0.x   | :white_check_mark: |
| 2.x.x   | :x:                |
| < 2.0   | :x:                |

## Reporting a Vulnerability

We take the security of expo-fix-ios-simulator-arch seriously. If you discover a security vulnerability, please follow these steps:

### 1. Do Not Open a Public Issue

Please **do not** report security vulnerabilities through public GitHub issues.

### 2. Email the Maintainer

Send an email to **roc.liu@hotmail.com** with:

- A description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Any suggested fixes (if available)

### 3. Response Time

- We will acknowledge your email within **48 hours**
- We will provide a detailed response within **7 days**
- We will keep you updated on the progress of fixing the vulnerability

### 4. Disclosure Policy

- Please give us reasonable time to fix the issue before public disclosure
- We will credit you in the security advisory (unless you prefer to remain anonymous)
- We will notify users once a fix is available

## Security Best Practices

When using this plugin:

1. **Use Latest Version** - Always use the latest version to get security updates
2. **Review Changes** - Check the CHANGELOG before updating
3. **Verify Source** - Install from npm or the official GitHub repository
4. **Report Suspicious Activity** - If you notice anything unusual, report it

## Known Security Considerations

### Plugin Execution

This plugin:
- ✅ Only modifies iOS project build settings
- ✅ Does not access network resources
- ✅ Does not access user data
- ✅ Runs during build time only
- ✅ Uses official Expo Config Plugin APIs

### What This Plugin Does NOT Do

- ❌ Does not send data anywhere
- ❌ Does not access keychain or credentials
- ❌ Does not modify code at runtime
- ❌ Does not require any permissions

## Security Updates

Security updates will be released as:

- **Patch releases** (e.g., 3.1.1) for minor security fixes
- **Minor releases** (e.g., 3.2.0) for moderate security improvements
- **Major releases** (e.g., 4.0.0) for significant security changes

Users will be notified via:

- GitHub Security Advisories
- Release notes
- npm security alerts

## Contact

For security-related questions or concerns, contact:

**Paul**  
Email: roc.liu@hotmail.com  
GitHub: [@Morphicai](https://github.com/Morphicai)

---

Thank you for helping keep expo-fix-ios-simulator-arch secure! 🔒

