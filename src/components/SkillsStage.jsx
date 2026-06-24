import {
  BracketsCurly,
  Cube,
  Database,
  GitBranch,
  PlugsConnected,
  Stack,
} from "@phosphor-icons/react";
import "./css/SkillsStage.css";

const iconMap = [BracketsCurly, GitBranch, PlugsConnected, Stack, Database];
const skillMeta = [
  "FRONTEND",
  "DELIVERY",
  "INTEGRATION",
  "SECURITY",
  "BACKEND",
];

export function SkillsStage({ skills = [], stack = [] }) {
  const featuredStack = stack.slice(0, 18);

  return (
    <section className="skills-stage" id="stack" aria-label="技能矩阵全屏展示">
      <div className="skills-stage-bg" aria-hidden="true" />
      <div className="skills-stage-shell">
        <div className="skills-core" aria-hidden="true">
          <i />
          <i />
          <i />
          <strong>5</strong>
          <small>ABILITY DOMAINS</small>
        </div>

        <div className="skills-carousel" aria-label="可拖动技能卡片轮播">
          <div className="skills-orbit" aria-hidden="true" />
          {skills.slice(0, 5).map((item, index) => {
            const Icon = iconMap[index] || Cube;

            return (
              <article
                className="skill-module"
                key={item.title}
                style={{ "--skill-index": index }}
                data-skill-card
              >
                <div className="skill-module-top">
                  <small>
                    {skillMeta[index] ||
                      `SYS.${String(index + 1).padStart(2, "0")}`}
                  </small>
                  <Icon size={28} weight="duotone" />
                </div>
                <em>PART OF THE STACK</em>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
                <span>
                  <i />
                </span>
              </article>
            );
          })}
        </div>

        <aside className="stack-console">
          <div>
            <Stack size={30} weight="duotone" />
            <h3>技术栈覆盖</h3>
          </div>
          <div className="stack-marquee">
            <div className="stack-tags">
              {[...featuredStack, ...featuredStack].map((item, index) => (
                <span key={`${item}-${index}`}>{item}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
