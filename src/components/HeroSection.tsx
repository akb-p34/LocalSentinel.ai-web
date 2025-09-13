import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Shield, Cpu, Lock, Github } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-blue-900/50 text-blue-100 border-blue-800">
                <Cpu className="w-4 h-4 mr-2" />
                Optimized for Snapdragon X Elite
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl text-white leading-tight">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Local AI
                </span>
                <br />
                Code Auditor
              </h1>
              
              <p className="text-xl text-slate-300 max-w-lg">
                Audit your code for security and compliance issues with AI that runs 
                entirely on your Snapdragon-powered PC. No data ever leaves your device.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-400" />
                100% Local Processing
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                Privacy First
              </div>
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-purple-400" />
                Open Source
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Download LocalSentinel
              </Button>
              <Button size="lg" variant="outline" className="border-slate-600 text-[rgba(0,0,0,1)] hover:bg-slate-800">
                View on GitHub
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-slate-900/80 backdrop-blur-sm rounded-lg border border-slate-700 p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-slate-400 ml-4 text-sm">LocalSentinel Terminal</span>
              </div>
              
              <div className="space-y-4">
                <div className="text-green-400 text-sm font-mono">
                  $ localsentinel --path ./my-project
                </div>
                <div className="text-slate-300 text-sm">
                  Project loaded: /home/user/my-project
                </div>
                
                <div className="grid gap-2 mt-6">
                  <Button variant="outline" className="justify-start border-blue-600 text-blue-400 hover:bg-blue-950">
                    🔍 Compliance Check
                  </Button>
                  <Button variant="outline" className="justify-start border-slate-600 text-slate-400">
                    📋 Copy Results
                  </Button>
                  <Button variant="outline" className="justify-start border-slate-600 text-slate-400">
                    ❌ Exit
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg blur-xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}