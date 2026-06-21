import { motion } from "motion/react";
import { Reveal } from "./Reveal";
import { useParallax } from "./useParallax";
import { iconMap } from "./iconMap";
import "./IndustryCockpit.css";

export function IndustryCockpit({ industries }) {
  const y = useParallax(-46);

  return (
    <section className="industry-section" id="industries">
      <Reveal className="section-heading compact-heading">
        <h2>三类行业现场，我都做过硬交付。</h2>
        <p>重点放在医疗、智慧城市和零售供应链。每个方向都不是静态页面，而是设备、数据、权限和流程的组合。</p>
      </Reveal>
      <motion.div style={{ y }} className="industry-cockpit">
        {industries.map((item, index) => {
          const Icon = iconMap[item.icon];
          return (
            <Reveal key={item.key} className={`industry-panel ${item.key}`} delay={index * 0.08}>
              <div className="industry-visual" aria-hidden="true">
                <Icon size={56} weight="duotone" />
                <span />
                <span />
              </div>
              <div className="industry-copy">
                <b>{item.label}</b>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <code>{item.stack}</code>
              </div>
              <div className="signal-row">
                {item.signals.map((signal) => (
                  <span key={signal}>{signal}</span>
                ))}
              </div>
            </Reveal>
          );
        })}
      </motion.div>
    </section>
  );
}
