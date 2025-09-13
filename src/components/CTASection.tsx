import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Github, Download, Star, GitFork } from "lucide-react";
import { useGitHubStats, FALLBACK_STATS } from "../hooks/useGitHubStats";
import { formatGitHubStat, createLoadingPlaceholder } from "../utils/formatters";

export function CTASection() {
  const { stats, isLoading, error } = useGitHubStats();

  // Use real stats if available, otherwise fallback to cached/default values
  const displayStats = stats || FALLBACK_STATS;

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl lg:text-4xl mb-6">
          Start scanning in 60 seconds
        </h2>
        <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
          Download. Extract. Run. No installation, no configuration, no cloud account.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4">
                <Download className="w-8 h-8" />
              </div>
              <h3 className="text-xl mb-3 text-[rgba(255,255,255,1)]">Windows binary</h3>
              <p className="text-blue-100 mb-6">
                Self-contained .exe with embedded AI model. No Python required.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                localsentinel-v1.0.0.exe
                <Download className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-xs text-blue-200 mt-2">
                147 MB • Snapdragon X Elite
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mx-auto mb-4">
                <Github className="w-8 h-8" />
              </div>
              <h3 className="text-xl mb-3 text-[rgba(255,255,255,1)]">Build from source</h3>
              <p className="text-blue-100 mb-6">
                Clone, build, audit. Full transparency. MIT licensed.
              </p>
              <Button
                variant="outline"
                className="w-full border-white/30 text-[rgba(21,93,252,1)] hover:bg-white/10"
                onClick={() => window.open('https://github.com/HarrisHamid/LocalSentinel.ai', '_blank')}
              >
                github.com/LocalSentinel
                <Github className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-xs text-blue-200 mt-2">
                Python 3.11+ • ONNX Runtime
              </p>
            </CardContent>
          </Card>
        </div>

        {/* GitHub stats */}
        <div className="flex justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            <span className={isLoading ? "opacity-70" : ""}>
              {isLoading && !stats
                ? createLoadingPlaceholder("stars")
                : formatGitHubStat(displayStats.stars, "stars")
              }
            </span>
          </div>
          <div className="flex items-center gap-2">
            <GitFork className="w-4 h-4" />
            <span className={isLoading ? "opacity-70" : ""}>
              {isLoading && !stats
                ? createLoadingPlaceholder("forks")
                : formatGitHubStat(displayStats.forks, "forks")
              }
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span className={isLoading ? "opacity-70" : ""}>
              {isLoading && !stats
                ? createLoadingPlaceholder("downloads")
                : formatGitHubStat(displayStats.downloads, "downloads")
              }
            </span>
          </div>
        </div>

        {/* Status indicator */}
        {error && (
          <div className="mt-4 text-xs text-yellow-300/80">
            ⚠️ Using cached stats (API temporarily unavailable)
          </div>
        )}
        {stats && !error && (
          <div className="mt-4 text-xs text-blue-200/60">
            📊 Updated automatically every 5 minutes
          </div>
        )}

        <div className="mt-12 p-6 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
          <p className="text-yellow-100">
            <strong>System requirements:</strong> Windows 11 on Snapdragon X Elite.
            Intel/AMD support coming Q2 2025.
          </p>
        </div>
      </div>
    </section>
  );
}