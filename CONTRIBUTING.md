# CONTRIBUTING.md

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please be respectful and constructive.

## How to Contribute

### Reporting Bugs

1. Check if bug already exists
2. Create detailed issue with:
   - Description
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Environment info

### Suggesting Features

1. Describe the feature
2. Explain use case
3. Provide examples if possible

### Pull Requests

1. **Fork** the repository
2. **Create** feature branch: `git checkout -b feature/name`
3. **Make** your changes
4. **Test** thoroughly
5. **Commit** with clear messages: `git commit -m 'Add feature: description'`
6. **Push** to your fork
7. **Create** Pull Request with description

### Code Style

- Use **TypeScript** for new code
- Follow **ESLint** configuration
- Format with **Prettier**: `npm run format`
- Add JSDoc comments for functions

### Testing

- Write tests for new features
- Ensure all tests pass: `npm run test`
- Aim for >90% coverage

### Documentation

- Update README for new features
- Add code comments for complex logic
- Update API documentation
- Include examples where helpful

## Development Setup

```bash
git clone https://github.com/yourusername/Z-Voting.git
cd Z-Voting
git checkout redesign/v2-complete-overhaul
npm install
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make commits
git commit -m 'Add feature description'

# Keep up with main
git fetch origin
git rebase origin/redesign/v2-complete-overhaul

# Push and create PR
git push origin feature/my-feature
```

## Review Process

1. Maintainer reviews code
2. Feedback provided if needed
3. Changes requested are implemented
4. Final approval and merge

## Areas for Contribution

- 🎨 UI/UX improvements
- 🔧 Bug fixes
- 📚 Documentation
- ✅ Tests
- ⚡ Performance
- 🔒 Security
- 🌐 Translations

## Questions?

Create a discussion or email: amiref007@gmail.com

Thank you for contributing! 🙏
