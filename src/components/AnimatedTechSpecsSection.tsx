import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Cpu, HardDrive, Zap, Code } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCountUp } from "../hooks/useCountUp";

export function AnimatedTechSpecsSection() {

  const { count: fileCount, ref: fileRef } = useCountUp(8000, 2000);
  const { count: speedCount, ref: speedRef } = useCountUp(10, 1500);
  const { count: vulnCount, ref: vulnRef } = useCountUp(200, 2000);

  const specs = [
    {
      icon: Cpu,
      title: "AI Engine",
      value: "8B",
      suffix: " params",
      description: "IBM Granite-3.1-8B-Instruct via ONNX Runtime with Qualcomm QNN EP",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/50"
    },
    {
      icon: HardDrive,
      title: "Storage",
      value: fileCount.toString(),
      suffix: " MB",
      description: "~8GB for model + 500MB for application",
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/50",
      ref: fileRef
    },
    {
      icon: Zap,
      title: "Performance",
      value: speedCount.toString(),
      suffix: "x faster",
      description: "Optimized NPU utilization for sub-3s analysis",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/50",
      ref: speedRef
    },
    {
      icon: Code,
      title: "Coverage",
      value: vulnCount.toString(),
      suffix: "+ patterns",
      description: "JavaScript, Python, Java, C#, Go, Rust, and more",
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/50",
      ref: vulnRef
    }
  ];

  const requirements = [
    {
      title: "Required",
      items: ["Snapdragon X Elite Copilot+ PC", "Windows 11 (latest)", "16GB+ RAM", "10GB free storage"]
    },
    {
      title: "Recommended",
      items: ["32GB+ RAM for large projects", "SSD storage", "Terminal/Command Prompt"]
    },
    {
      title: "Development",
      items: ["Python 3.9+", "Git for source control", "Any code editor/IDE"]
    }
  ];

  return (
    <section id="tech-specs" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl mb-6">
              Built for Snapdragon Excellence
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              LocalSentinel is optimized from the ground up for Snapdragon X Elite processors,
              leveraging the NPU for lightning-fast AI inference while maintaining complete privacy.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {specs.map((spec, index) => (
                <motion.div
                  key={spec.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  ref={spec.ref}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className={`p-1.5 rounded-lg ${spec.bgColor}`}
                        >
                          <spec.icon className={`w-5 h-5 ${spec.color}`} />
                        </motion.div>
                        <CardTitle className="text-base">{spec.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-2">
                        <span className="text-2xl font-bold">{spec.value}</span>
                        <span className="text-sm text-slate-500">{spec.suffix}</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {spec.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1686195165991-74af7c2918d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFsY29tbSUyMHNuYXBkcmFnb24lMjBwcm9jZXNzb3IlMjBjaGlwfGVufDF8fHx8MTc1Nzc4NjYxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Snapdragon processor chip"
                className="w-full h-80 object-cover rounded-lg"
              />

              {/* Animated overlay */}
              <motion.div
                animate={{
                  background: [
                    "linear-gradient(to top, rgba(15, 23, 42, 0.9), transparent)",
                    "linear-gradient(to top, rgba(15, 23, 42, 0.7), transparent)",
                    "linear-gradient(to top, rgba(15, 23, 42, 0.9), transparent)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-lg"
              />

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-xl mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {["ONNX Runtime", "Qualcomm QNN EP", "IBM Granite", "Python"].map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Badge
                        variant="secondary"
                        className={`
                          ${index === 0 ? "bg-blue-900/80 text-blue-100" : ""}
                          ${index === 1 ? "bg-green-900/80 text-green-100" : ""}
                          ${index === 2 ? "bg-purple-900/80 text-purple-100" : ""}
                          ${index === 3 ? "bg-yellow-900/80 text-yellow-100" : ""}
                        `}
                      >
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Requirements Section - Always Visible */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5" />
                System Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {requirements.map((req, index) => (
                  <motion.div
                    key={req.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="mb-2 font-semibold">{req.title}</h4>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      {req.items.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + itemIndex * 0.05 }}
                          viewport={{ once: true }}
                        >
                          • {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}