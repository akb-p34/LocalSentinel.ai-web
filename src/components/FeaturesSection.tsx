import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Shield, Cpu, FileCode, Download, Zap, Lock } from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "100% Local Processing",
    description: "Your code never leaves your device. All AI inference happens locally on your Snapdragon NPU.",
    highlight: "Privacy First"
  },
  {
    icon: Cpu,
    title: "Snapdragon Optimized",
    description: "Built specifically for Snapdragon X Elite with ONNX Runtime and Qualcomm QNN Execution Provider.",
    highlight: "Peak Performance"
  },
  {
    icon: FileCode,
    title: "IBM Granite AI Model",
    description: "Powered by IBM Granite-3.1-8B-Instruct for accurate security and compliance analysis.",
    highlight: "Enterprise Grade"
  },
  {
    icon: Zap,
    title: "Simple Terminal UI",
    description: "Clean, focused interface with just three buttons: Check, Copy, Exit. No complexity.",
    highlight: "Developer Friendly"
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Comprehensive scanning for vulnerabilities, compliance issues, and best practice violations.",
    highlight: "Thorough Analysis"
  },
  {
    icon: Download,
    title: "Open Source",
    description: "Fully open-source with permissive licensing. Inspect the code, contribute, or fork it.",
    highlight: "Transparent"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-4">
            Why Choose LocalSentinel?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Unlike cloud-based code auditors, LocalSentinel keeps your intellectual property 
            secure while delivering enterprise-grade analysis powered by cutting-edge AI.
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