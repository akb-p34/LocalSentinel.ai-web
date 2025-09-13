# LocalSentinel.ai - Landing Page

## = Offline Code Security, Right in VS Code

LocalSentinel.ai is a VS Code extension that performs comprehensive security audits of your codebase entirely offline. This repository contains the landing page for the LocalSentinel.ai project, showcasing our one-click offline code audit solution that runs directly in VS Code.

## < Project Overview

LocalSentinel.ai provides developers with:
- **100% Offline Operation**: All scanning and AI analysis happens locally on your machine
- **One-Click Security Audits**: Simple command to scan your entire repository
- **AI-Powered Analysis**: Uses Code Llama 7B to explain issues and propose fixes
- **Clear, Actionable Reports**: Red/Yellow/Green severity ratings with copy-ready fix suggestions
- **Zero Configuration**: Works out of the box with no setup required

## <¯ Key Features

### Static Analysis + AI Intelligence
- Multi-language vulnerability detection using Semgrep
- Python security checks with Bandit
- Smart regex pattern matching for secrets, debug flags, and security misconfigurations
- AI-powered triage to reduce false positives and explain findings in plain English

### Developer-Friendly Reporting
- Clean report interface directly in VS Code
- Jump-to-code functionality for each finding
- Severity-based grouping (Critical/Warning/Info)
- Copy-ready fix suggestions for each issue
- Plain-English repository overview for new team members

### Privacy-First Design
- Runs entirely on your local machine
- Optimized for Snapdragon X and other ARM64 devices
- No code ever leaves your laptop
- Works without internet connection

## =€ Getting Started

### Website Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/akb-p34/LocalSentinel.ai-web.git
   cd LocalSentinel.ai-web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

### VS Code Extension

The LocalSentinel.ai VS Code extension will be available on the Visual Studio Code Marketplace.

**[Download LocalSentinel.ai Extension ’](https://marketplace.visualstudio.com/items?itemName=localsentinel)** *(Coming Soon)*

## =Ê Demo & Presentation

View our slide deck and demo materials:
- [Product Demo Video](#) *(Coming Soon)*
- [Technical Presentation](#) *(Coming Soon)*
- [Sample Security Report](#) *(Coming Soon)*

## =à Technology Stack

### Landing Page
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Deployment**: Vercel

### VS Code Extension (Core Product)
- **Static Analysis**: Semgrep, Bandit
- **AI Model**: Code Llama 7B (quantized for local execution)
- **Runtime**: llama.cpp for efficient inference
- **Platform Support**: Windows ARM64, macOS, Linux

## =È Use Cases

- **Security Audits**: Find vulnerabilities before they reach production
- **Code Reviews**: Automated security checks in your PR workflow
- **Onboarding**: Help new developers understand codebases quickly
- **Compliance**: Ensure code meets security standards
- **Education**: Learn about security issues with clear explanations

## <¯ Target Audience

- Software development teams prioritizing security
- Organizations with strict data privacy requirements
- Developers working with sensitive codebases
- Teams using Qualcomm Snapdragon X devices
- Anyone wanting fast, private code security analysis

## <Æ Awards & Recognition

Built for the Qualcomm Snapdragon X Hackathon, optimized for ARM64 architecture and edge computing.

## =Ý License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## > Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## =ç Contact

- **Website**: [localsentinel.ai](https://localsentinel.ai)
- **Email**: contact@localsentinel.ai
- **GitHub**: [@LocalSentinel](https://github.com/LocalSentinel)

## =O Acknowledgments

- Built with React and Vite
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Optimized for Qualcomm Snapdragon X platform

---

**LocalSentinel.ai** - *Your code's security sentinel, always offline, always private.*