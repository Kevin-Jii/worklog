import { motion } from "motion/react";
import { ArrowUpRight, At, MapPin, Phone } from "@phosphor-icons/react";
import { WebGLScene } from "./WebGLScene";
import { useParallax } from "./useParallax";
import "./Hero.css";

export function Hero({ profile }) {
  const y = useParallax(54);

  return (
    <section className="hero-section" id="home">
      <div className="hero-grid">
        <motion.div style={{ y }} className="hero-copy">
          <p className="hero-kicker">Frontend Engineer</p>
          <h1>
            {profile.name}
            <span>复杂现场的交付型前端。</span>
          </h1>
          <p className="hero-summary">{profile.summary}</p>
          <div className="hero-actions">
            <a className="button-primary" href="#industries">
              看项目
              <ArrowUpRight size={18} weight="bold" />
            </a>
            <a className="button-ghost" href={`mailto:${profile.email}`}>
              发邮件
            </a>
          </div>
        </motion.div>
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          <WebGLScene />
          <div className="hero-scan" aria-hidden="true" />
          <div className="orbital-card">
            <span>Current focus</span>
            <strong>React + AI Native + 行业系统</strong>
          </div>
        </motion.div>
      </div>
      <div className="contact-strip" aria-label="联系方式">
        <a href={`tel:${profile.phone}`}>
          <Phone size={17} weight="bold" />
          {profile.phone}
        </a>
        <a href={`mailto:${profile.email}`}>
          <At size={17} weight="bold" />
          {profile.email}
        </a>
        <span>
          <MapPin size={17} weight="bold" />
          {profile.location}
        </span>
      </div>
    </section>
  );
}
