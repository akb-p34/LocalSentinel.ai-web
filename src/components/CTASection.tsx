import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Github, Download, Star, GitFork } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl lg:text-4xl mb-6">
          Ready to Secure Your Code Locally?
        </h2>
        <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
          Join developers who prioritize privacy and performance. 
          LocalSentinel keeps your code secure while delivering enterprise-grade analysis.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4">
                <Download className="w-8 h-8" />
              </div>
              <h3 className="text-xl mb-3 text-[rgba(255,255,255,1)]">Download LocalSentinel</h3>
              <p className="text-blue-100 mb-6">
                Get the latest Windows executable (.EXE) with everything bundled for easy installation.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Download v1.0.0
                <Download className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-xs text-blue-200 mt-2">
                Compatible with Snapdragon X Elite
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mx-auto mb-4">
                <Github className="w-8 h-8" />
              </div>
              <h3 className="text-xl mb-3 text-[rgba(255,255,255,1)]">Explore the Source</h3>
              <p className="text-blue-100 mb-6">
                View, fork, or contribute to the open-source codebase. MIT licensed and fully transparent.
              </p>
              <Button 
                variant="outline" 
                className="w-full border-white/30 text-[rgba(21,93,252,1)] hover:bg-white/10"
                onClick={() => window.open('https://github.com/HarrisHamid/LocalSentinel.ai', '_blank')}
              >
                View on GitHub
                <Github className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-xs text-blue-200 mt-2">
                Build from source available
              </p>
            </CardContent>
          </Card>
        </div>

        {/* GitHub stats */}
        <div className="flex justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            <span>247 stars</span>
          </div>
          <div className="flex items-center gap-2">
            <GitFork className="w-4 h-4" />
            <span>34 forks</span>
          </div>
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>1.2k downloads</span>
          </div>
        </div>

        <div className="mt-12 p-6 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
          <p className="text-yellow-100">
            <strong>Note:</strong> LocalSentinel is currently optimized for Snapdragon X Elite processors. 
            Support for other architectures is planned for future releases.
          </p>
        </div>
      </div>
    </section>
  );
}