import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Shield, Cpu, FileCode, Download, Zap, Lock } from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "Runs fully offline",
    description: "No network calls. No telemetry. Your code stays on your machine.",
    highlight: "LOCAL-ONLY"
  },
  {
    icon: Cpu,
    title: "Snapdragon NPU",
    description: "Leverages Qualcomm QNN for 10x faster inference than CPU.",
    highlight: "OPTIMIZED"
  },
  {
    icon: FileCode,
    title: "IBM Granite 8B",
    description: "State-of-the-art code LLM quantized to 4-bit precision.",
    highlight: "8B PARAMS"
  },
  {
    icon: Zap,
    title: "CLI-first",
    description: "Simple terminal interface. Pipe-friendly. CI/CD ready.",
    highlight: "DEVELOPER UX"
  },
  {
    icon: Shield,
    title: "OWASP + CWE",
    description: "Detects OWASP Top 10 and 200+ CWE vulnerability patterns.",
    highlight: "COVERAGE"
  },
  {
    icon: Download,
    title: "MIT licensed",
    description: "Free forever. No vendor lock-in. Fork and modify as needed.",
    highlight: "OPEN SOURCE"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-4">
            Built for air-gapped teams
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Security-first architecture. Zero external dependencies.
            Your proprietary code never touches the internet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                    <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-xs text-blue-600 dark:text-blue-400 px-2 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    {feature.highlight}
                  </span>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </CardContent>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}