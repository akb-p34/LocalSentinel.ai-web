# LocalSentinel.ai - Landing Page

## 🛡️ Offline Code Security, Right in VS Code

LocalSentinel.ai is a VS Code extension that performs comprehensive security audits of your codebase entirely offline. This repository contains the landing page for the LocalSentinel.ai project, showcasing our one-click offline code audit solution that runs directly in VS Code.

## 📋 Project Overview

LocalSentinel.ai provides developers with:
- **100% Offline Operation**: All scanning and AI analysis happens locally on your machine
- **One-Click Security Audits**: Simple command to scan your entire repository
- **AI-Powered Analysis**: Uses DeepSeek-coder-v2-lite-instruct to explain issues and propose fixes
- **Clear, Actionable Reports**: Red/Yellow/Green severity ratings with copy-ready fix suggestions
- **Zero Configuration**: Works out of the box with no setup required

## ✨ Key Features

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

## 🚀 Getting Started

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

The LocalSentinel.ai VS Code extension is available on GitHub releases.

**[Download LocalSentinel.ai Extension](https://github.com/HarrisHamid/LocalSentinel.ai/releases/tag/v0.0.1)**

## 🎥 Demo & Presentation

View our slide deck and demo materials:
- [Product Demo Video](#) *(Coming Soon)*
- [Technical Presentation](#) *(Coming Soon)*
- [Sample Security Report](#) *(Coming Soon)*

## 🔧 Technology Stack

### Landing Page
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Deployment**: Vercel

### VS Code Extension (Core Product)
- **Static Analysis**: Semgrep, Bandit
- **AI Model**: DeepSeek-coder-v2-lite-instruct (optimized for local execution)
- **Runtime**: LM Studio for efficient inference
- **Platform Support**: Windows, macOS, Linux (optimized for Snapdragon X Elite)

## 💡 Use Cases

- **Security Audits**: Find vulnerabilities before they reach production
- **Code Reviews**: Automated security checks in your PR workflow
- **Onboarding**: Help new developers understand codebases quickly
- **Compliance**: Ensure code meets security standards
- **Education**: Learn about security issues with clear explanations

## 👥 Target Audience

- Software development teams prioritizing security
- Organizations with strict data privacy requirements
- Developers working with sensitive codebases
- Teams using Qualcomm Snapdragon X devices
- Anyone wanting fast, private code security analysis

## 🏆 Awards & Recognition

Built for the Qualcomm NYU Hackathon 2025, optimized for ARM64 architecture and edge computing.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📧 Contact

- **Website**: [localsentinel.ai](https://localsentinel.ai)
- **Email**: akbar.pathan034@gmail.com
- **GitHub**: [@HarrisHamid](https://github.com/HarrisHamid/LocalSentinel.ai)

## 🙏 Acknowledgments

- Built with React and Vite
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Optimized for Qualcomm Snapdragon X platform

---

**LocalSentinel.ai** - *Your code's security sentinel, always offline, always private.*