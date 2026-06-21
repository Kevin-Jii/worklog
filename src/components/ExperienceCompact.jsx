import { Network } from "@phosphor-icons/react";
import { Reveal } from "./Reveal";
import "./ExperienceCompact.css";

export function ExperienceCompact({ experiences, stack }) {
  return (
    <section className="experience-section" id="experience">
      <Reveal className="experience-shell">
        <div className="experience-head">
          <h2>履历保持短，但信息密度更高。</h2>
          <p>我的优势不是只会写页面，而是能进入业务现场，把界面、接口、设备和流程一起落地。</p>
        </div>
        <div className="experience-board">
          {experiences.map((item) => (
            <article key={item.company} className="experience-item">
              <span>{item.period}</span>
              <h3>{item.company}</h3>
              <b>{item.role}</b>
              <p>{item.detail}</p>
            </article>
          ))}
          <article className="stack-panel">
            <Network size={28} weight="duotone" />
            <h3>技术栈覆盖</h3>
            <div>
              {stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        </div>
      </Reveal>
    </section>
  );
}
