import { ArrowSquareOut, GraduationCap } from "@phosphor-icons/react";
import "./css/ResumeDetails.css";

export function ResumeDetails({ projects = [], education = [] }) {
  return (
    <section className="resume-details project-field" id="industries" aria-label="精选项目经历">
      <div className="project-field-intro">
        <span>Selected project scenes</span>
        <h2>精选项目经历</h2>
        <p>每个项目单独成屏，按真实交付现场展开：项目背景、技术栈、职责动作和可验证的工程结果。</p>
      </div>

      <div className="project-scenes">
        <div className="project-scenes-viewport">
          <div className="project-scenes-stack">
            {projects.map((project, index) => {
              return (
                <article className="project-scene" key={project.title} style={{ "--scene-index": index }}>
                  <div className="project-scene-bg" aria-hidden="true">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <i />
                    <i />
                  </div>
                  <div className="project-scene-surface">
                    <div className="project-scene-panel">
                      <div className="project-scene-main">
                        <div className="project-kicker">
                          <span>{project.period}</span>
                          <span>{project.industry}</span>
                        </div>

                        <h3>{project.title}</h3>

                        <div className="project-meta-line">
                          <strong>{project.role}</strong>
                          {project.platforms ? <em>{project.platforms}</em> : null}
                        </div>

                        <p>{project.summary || project.description}</p>

                        {project.github ? (
                          <a className="project-github" href={project.github} target="_blank" rel="noreferrer">
                            <ArrowSquareOut size={20} weight="duotone" />
                            Github：{project.githubLabel || project.github}
                          </a>
                        ) : null}
                      </div>

                      <aside className="project-scene-side">
                        <div className="project-stack">
                          <span>技术栈</span>
                          <p>{project.stack}</p>
                        </div>

                        <div className="project-responsibilities">
                          {(project.responsibilities || project.highlights || []).slice(0, 8).map((item, itemIndex) => (
                            <div key={item.title || item} className="project-duty">
                              <small>{String(itemIndex + 1).padStart(2, "0")}</small>
                              <div>
                                {typeof item === "string" ? (
                                  <p>{item}</p>
                                ) : (
                                  <>
                                    <strong>{item.title}</strong>
                                    <p>{item.body}</p>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </aside>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="project-screen-curl" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>

      <div className="education-strip" aria-label="教育背景">
        <div>
          <GraduationCap size={28} weight="duotone" />
          <h3>教育背景</h3>
        </div>
        {education.map((item) => (
          <article key={item.school}>
            <span>{item.period}</span>
            <strong>{item.school}</strong>
            <p>{item.major} / {item.degree}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
