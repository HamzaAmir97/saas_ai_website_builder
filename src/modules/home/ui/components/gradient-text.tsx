'use client';

import { motion } from "framer-motion";

function GradientMarqueeText({
  text ="Let's Create Magic Togather",
  gradientColors = ["#ff0080", "#7928ca", "#ff0080"],
}: {
  text?: string;
  gradientColors?: string[];
}) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-900 overflow-hidden">
      <motion.div
        className="text-4xl font-bold whitespace-nowrap"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          backgroundImage: `linear-gradient(90deg, ${gradientColors.join(", ")})`,
          // backgroundSize: "200% 100%",
          backgroundClip: "text",
          // WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {text}
      </motion.div>
    </div>
  );
}

export default function AnimatedGradientText() {
  return <GradientMarqueeText />;
}
