import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { OpenAiLogo } from "@phosphor-icons/react";
import "./LoadingOverlay.css";

export function LoadingOverlay() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), reduceMotion ? 480 : 1750);
    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="loading-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(18px)" }}
          transition={{ duration: reduceMotion ? 0.18 : 0.72, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          aria-label="正在加载简历项目"
        >
          <motion.div
            className="loader-core"
            initial={reduceMotion ? false : { scale: 0.86, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="loader-orbit" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <OpenAiLogo size={68} weight="duotone" />
          </motion.div>
          <motion.div
            className="loader-copy"
            initial={reduceMotion ? false : { y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>JKW RESUME SYSTEM</span>
            <strong>医疗 / 智慧城市 / 零售 项目载入中</strong>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
