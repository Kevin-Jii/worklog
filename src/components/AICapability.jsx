import { OpenAiLogo } from "@phosphor-icons/react";
import { iconMap } from "./iconMap";
import "./css/AICapability.css";

export function AICapability({ aiFlow }) {
  return (
    <section className="ai-section" id="ai">
      <div className="ai-stage">
        <div className="ai-mark-wrap">
          <div className="ai-mark" aria-hidden="true">
            <OpenAiLogo size={86} weight="duotone" />
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="ai-copy">
          <h2>AI 是我的日常工作流，不是页面标签。</h2>
          <p>我会把 AI 用在方案推演、代码重构、设备识别和调试排障里，让研发链路更快闭合。</p>
          <div className="ai-flow">
            {aiFlow.map((item, index) => {
              const Icon = iconMap[item.icon];
              return (
                <article key={item.title} style={{ "--ai-flow-index": index }}>
                  <Icon size={24} weight="duotone" />
                  <strong>{item.title}</strong>
                  <span>{item.body}</span>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
