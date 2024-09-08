# Contributing to Nillion Tools

We're always excited to welcome new contributors to the Nillion Tools project! This guide outlines the process for effectively and efficiently contributing to the codebase.

## Pre-requisites:

- Basic understanding of Node.js and JavaScript
- Basic Understanding of Ed25519 Key Standards and React
- Familiarity with TypeScript is a plus

## Setting Up the Development Environment

This project is a [turborepo](https://turbo.build/) project, which means that it is a monorepo structure to manage multiple packages. The project is split into two parts:

**Packages**:

- `key-manager`: The main package that provides the key management functionality.

**Apps**:

- `docs`: The documentation website for the tools.

Also this Repository uses pnpm package manager, so make sure you have it installed globally.

1. Clone the repository:
   ```bash
   git clone https://github.com/Envoy-VC/nillion-tools.git
   cd nillion-tools
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Build the packages:
   ```bash
   pnpm run build
   ```

## Making Changes:

### Branch out

Create a new branch for your changes. Feature branches are preferred for specific changes, while hotfixes or pull requests for bugs can use dedicated branches.

---

### Make your changes

Focus on the `packages/` directory for code changes and the apps/docs directory for documentation updates. Update relevant tests alongside your code modifications.

---

### Run tests

Ensure your changes don't break existing functionality. Run the tests with:

```bash
pnpm test
```

---

### Document your changes

Clearly document your changes in the relevant code and markdown files. Make sure your pull request title and commit messages are concise and informative.

---

### Create a Pull Request

Push your changes to your remote branch and create a pull request against the main branch.

---

Contribution Guidelines:

1. Follow the existing code style and conventions.
   Use descriptive variable names and comments.
   Write unit tests for any new code or significant changes.

2. Keep pull requests focused on a single feature or bug fix.

3. Be friendly and respectful in your communication with other contributors.

## Additional Resources

- Turbo Documentation: https://vercel.com/docs/monorepos/turborepo
- Testing in Turbo Repos: https://vercel.com/docs/monorepos/turborepo

**We appreciate your contributions and look forward to seeing your work!**
