import gsap from "gsap";
import { AnimationBase } from "../core/AnimationBase.js";

/**
 * 项目卡片区动画
 *
 * 只服务 ResumeDetails：
 * 1. 区块标题按文字顺序入场；
 * 2. 项目卡片按网格顺序批量浮现；
 * 3. 弹窗本身由 React 控制显示，CSS 负责即时层级，不再使用 pin 或书页翻动。
 */
export class ProjectScenesAnimation extends AnimationBase {
  build() {
    const { q } = this;

    this.buildFieldIntros(q);
    this.buildProjectCards(q);
  }

  /** 区块引导文案 — 简单一次性淡入 */
  buildFieldIntros(q) {
    q(".project-field-intro").forEach((intro) => {
      gsap.from(intro.children, {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.08,
        ease: "portfolioReveal",
        scrollTrigger: {
          trigger: intro,
          start: "top 72%",
          once: true,
        },
      });
    });
  }

  /** 项目卡片网格 — 鼠标 hover 交给 CSS，入场交给 GSAP */
  buildProjectCards(q) {
    const cards = q(".project-card");

    if (!cards.length) {
      return;
    }

    gsap.from(cards, {
      autoAlpha: 0,
      y: 58,
      scale: 0.965,
      duration: 0.82,
      stagger: {
        each: 0.08,
        grid: "auto",
        from: "start",
      },
      ease: "portfolioReveal",
      scrollTrigger: {
        trigger: q(".project-card-grid")[0] || cards[0],
        start: "top 78%",
        once: true,
      },
    });
  }
}
