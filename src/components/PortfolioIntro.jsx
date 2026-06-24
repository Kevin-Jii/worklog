import { Reveal } from "./Reveal";
import "./css/PortfolioIntro.css";

export function PortfolioIntro({ profile }) {
  const summaryPoints = [
    "4 年前端与跨端开发经验，持续交付复杂业务界面。",
    "长期深耕医疗急救、智慧城市、零售供应链项目现场。",
    "能把前端工程化、硬件 SDK、第三方服务、后端接口和 AI 辅助研发组合成可落地系统。",
  ];

  return (
    <section className="portfolio-intro" id="home">
      <div className="poster-topline">
        <strong>{profile.initials}</strong>
        <span>{profile.role}</span>
      </div>
      <Reveal className="poster-stage">
        <div className="poster-outline" aria-hidden="true">
          {profile.name}
        </div>
        <div className="poster-name">
          <span>WEB FRONTEND ENGINEER</span>
          <h1 aria-label={profile.name}>
            {[...profile.name].map((char, index) => (
              <i className="poster-glyph" aria-hidden="true" key={`${char}-${index}`}>
                {char}
              </i>
            ))}
          </h1>
          <ul className="poster-summary">
            {summaryPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
