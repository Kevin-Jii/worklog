import React from "react";
import { ArrowRight, ArrowSquareOut, GraduationCap, X } from "@phosphor-icons/react";
import "./css/ResumeDetails.css";

export function ResumeDetails({ projects = [], education = [] }) {
  const [selectedProject, setSelectedProject] = React.useState(null);

  React.useEffect(() => {
    if (!selectedProject) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.removeProperty("overflow");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject]);

  return (
    <section className="resume-details project-field" id="industries" aria-label="精选项目经历">
      <div className="project-field-intro">
        <span>Selected project works</span>
        <h2>精选项目经历</h2>
        <p>每个项目都有其挑战，我真实交付过包括医疗、供应链、智慧城市和工业场景的高标准工程成果。</p>
      </div>

      <div className="project-scenes">
        <div className="project-card-grid">
          {projects.map((project, index) => {
            const stackItems = project.stack?.split("/").map((item) => item.trim()).filter(Boolean) || [];

            return (
              <article
                className="project-card"
                key={project.title}
                data-card-index={String(index + 1).padStart(2, "0")}
                style={{ "--scene-index": index }}
              >
                <div className="project-card-top">
                  <strong>{String(index + 1).padStart(2, "0")}</strong>
                  <span>{project.industry || project.period}</span>
                </div>

                <div className="project-card-copy">
                  <h3>{project.title}</h3>
                  <p>{project.summary || project.description}</p>
                </div>

                <div className="project-card-stack" aria-label={`${project.title} 技术栈`}>
                  {stackItems.slice(0, 4).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <button className="project-detail-button" type="button" onClick={() => setSelectedProject(project)}>
                  查看详情
                  <ArrowRight size={18} weight="bold" />
                </button>
              </article>
            );
          })}
        </div>
      </div>

      {selectedProject ? (
        <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
          <button className="project-modal-backdrop" type="button" aria-label="关闭项目详情" onClick={() => setSelectedProject(null)} />
          <div className="project-modal-panel">
            <button className="project-modal-close" type="button" aria-label="关闭项目详情" onClick={() => setSelectedProject(null)}>
              <X size={22} weight="bold" />
            </button>

            <div className="project-modal-main">
              <div className="project-kicker">
                <span>{selectedProject.period}</span>
                <span>{selectedProject.industry}</span>
                {selectedProject.platforms ? <span>{selectedProject.platforms}</span> : null}
              </div>

              <h3 id="project-modal-title">{selectedProject.title}</h3>
              <p>{selectedProject.description || selectedProject.summary}</p>

              <div className="project-meta-line">
                <strong>{selectedProject.role}</strong>
                {selectedProject.github ? (
                  <a className="project-github" href={selectedProject.github} target="_blank" rel="noreferrer">
                    <ArrowSquareOut size={20} weight="duotone" />
                    Github：{selectedProject.githubLabel || selectedProject.github}
                  </a>
                ) : null}
              </div>
            </div>

            <aside className="project-modal-side">
              <div className="project-stack">
                <span>技术栈</span>
                <p>{selectedProject.stack}</p>
              </div>

              <div className="project-responsibilities">
                {(selectedProject.responsibilities || selectedProject.highlights || []).map((item, itemIndex) => (
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
      ) : null}

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
