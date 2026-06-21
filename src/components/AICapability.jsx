import { motion } from "motion/react";
import { OpenAiLogo } from "@phosphor-icons/react";
import { Reveal } from "./Reveal";
import { iconMap } from "./iconMap";
import "./AICapability.css";

export function AICapability({ aiFlow }) {
  return (
    <section className="ai-section" id="ai">
      <div className="ai-stage">
        <Reveal className="ai-mark-wrap">
          <div className="ai-mark" aria-hidden="true">
            <OpenAiLogo size={86} weight="duotone" />
            <i />
            <i />
            <i />
          </div>
        </Reveal>
        <Reveal className="ai-copy" delay={0.05}>
          <h2>AI 是我的日常工作流，不是页面标签。</h2>
          <p>我会把 AI 用在方案推演、代码重构、设备识别和调试排障里，让研发链路更快闭合。</p>
          <div className="ai-flow">
            {aiFlow.map((item, index) => {
              const Icon = iconMap[item.icon];
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.56, delay: 0.08 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Icon size={24} weight="duotone" />
                  <strong>{item.title}</strong>
                  <span>{item.body}</span>
                </motion.article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
