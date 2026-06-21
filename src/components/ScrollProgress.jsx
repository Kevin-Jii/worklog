import { motion, useScroll, useSpring, useTransform } from "motion/react";
import "./ScrollProgress.css";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 28, mass: 0.22 });
  const progress = useTransform(scrollYProgress, (value) => `${Math.round(value * 100)}`);

  return (
    <div className="scroll-progress" aria-label="页面滚动进度">
      <span>进度</span>
      <div>
        <motion.i style={{ scaleY }} />
      </div>
      <motion.b>{progress}</motion.b>
    </div>
  );
}
