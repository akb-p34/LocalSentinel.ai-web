import { Button } from "./ui/button";
import { Github, Menu } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">LS</span>
            </div>
            <span className="text-white text-xl">LocalSentinel.ai</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#tech-specs" className="text-slate-300 hover:text-white transition-colors">
              Tech Specs
            </a>
            <a href="#download" className="text-slate-300 hover:text-white transition-colors">
              Download
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Download
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden text-slate-300">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}