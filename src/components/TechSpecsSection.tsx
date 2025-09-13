import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Cpu, HardDrive, Zap, Code } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function TechSpecsSection() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl mb-6">
              Built for Snapdragon Excellence
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              LocalSentinel is optimized from the ground up for Snapdragon X Elite processors, 
              leveraging the NPU for lightning-fast AI inference while maintaining complete privacy.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-base">AI Engine</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    IBM Granite-3.1-8B-Instruct via ONNX Runtime with Qualcomm QNN EP
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-green-600" />
                    <CardTitle className="text-base">Storage</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    ~8GB for model + 500MB for application
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-600" />
                    <CardTitle className="text-base">Performance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Optimized NPU utilization for sub-3s analysis
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-purple-600" />
                    <CardTitle className="text-base">Languages</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    JavaScript, Python, Java, C#, Go, Rust, and more
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="relative">
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1686195165991-74af7c2918d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFsY29tbSUyMHNuYXBkcmFnb24lMjBwcm9jZXNzb3IlMjBjaGlwfGVufDF8fHx8MTc1Nzc4NjYxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Snapdragon processor chip"
                className="w-full h-80 object-cover rounded-lg"
              />
              
              {/* Overlay with tech stack */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent rounded-lg"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-xl mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-blue-900/80 text-blue-100">
                    ONNX Runtime
                  </Badge>
                  <Badge variant="secondary" className="bg-green-900/80 text-green-100">
                    Qualcomm QNN EP
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-900/80 text-purple-100">
                    IBM Granite
                  </Badge>
                  <Badge variant="secondary" className="bg-yellow-900/80 text-yellow-100">
                    Python
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5" />
                System Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="mb-2">Required</h4>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <li>• Snapdragon X Elite Copilot+ PC</li>
                    <li>• Windows 11 (latest)</li>
                    <li>• 16GB+ RAM</li>
                    <li>• 10GB free storage</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2">Recommended</h4>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <li>• 32GB+ RAM for large projects</li>
                    <li>• SSD storage</li>
                    <li>• Terminal/Command Prompt</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2">Development</h4>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <li>• Python 3.9+</li>
                    <li>• Git for source control</li>
                    <li>• Any code editor/IDE</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}