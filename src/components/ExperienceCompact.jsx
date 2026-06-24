import "./css/ExperienceCompact.css";

const routeLabels = ["智慧城市", "医疗系统", "供应链产品"];

const phaseFocus = [
  { title: "动态表单", note: "把复杂政企流程拆成可配置、可复用、可维护的前端模块。" },
  { title: "医疗急救", note: "面向真实业务现场，处理多端协同、状态流转和高压场景交付。" },
  { title: "全栈闭环", note: "从前端体验、业务建模到部署运维，独立完成产品级交付。" },
];

const careerBackgrounds = {
  浙江同际智慧科技有限公司: {
    className: "career-card-city",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
  },
  杭州健景科技有限公司: {
    className: "career-card-medical",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
  },
  杭州久亨巨通商贸有限公司: {
    className: "career-card-supply",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
  },
};

export function ExperienceCompact({ experiences }) {
  const journeyExperiences = [...experiences].reverse();

  return (
    <section className="experience-section" id="experience">
      <div className="experience-shell">
        <div className="career-horizontal" aria-label="工作履历横向时间线">
          <div className="career-track">
            <article className="career-panel career-panel-intro" data-panel-index="00">
              <div className="career-panel-inner">
                <div className="experience-head career-panel-copy">
                  <span>02 / Journey</span>
                  <h2>从智慧城市到医疗系统，再到独立供应链产品。</h2>
                  <p>不是把经历摊开，而是按阶段看能力如何升级：动态表单、医疗急救、多端交付、再到全栈闭环。</p>
                </div>
                <div className="career-route" aria-label="能力升级路径">
                  {routeLabels.map((item, index) => (
                    <span key={item}>
                      <i>{String(index + 1).padStart(2, "0")}</i>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {journeyExperiences.map((item, index) => {
              const focus = phaseFocus[index] ?? phaseFocus[phaseFocus.length - 1];
              const background = careerBackgrounds[item.company];

              return (
                <article
                  key={item.company}
                  className="career-panel is-experience"
                  data-panel-index={String(index + 1).padStart(2, "0")}
                >
                  <div className="career-panel-inner">
                    <div className="career-phase career-panel-copy">
                      <span>PHASE {String(index + 1).padStart(2, "0")}</span>
                      <small>{item.period}</small>
                    </div>
                    <div
                      className={`career-card ${background?.className || ""}`}
                      data-flip-id={`career-card-${index}`}
                      style={{ "--career-bg": `url("${background?.image || ""}")` }}
                    >
                      <div className="career-copy">
                        <small>{focus.title}</small>
                        <h3>{item.company}</h3>
                        <b>{item.role}</b>
                        <p>{item.detail}</p>
                      </div>
                      <aside className="career-proof">
                        <span>ABILITY UPGRADE</span>
                        <strong>{focus.title}</strong>
                        <p>{focus.note}</p>
                      </aside>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
