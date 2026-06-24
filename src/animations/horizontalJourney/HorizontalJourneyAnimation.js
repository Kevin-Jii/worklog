import gsap from "gsap";
import { AnimationBase } from "../core/AnimationBase.js";

/**
 * 职业经历横向滚动旅程
 *
 * 桌面端：pin 住 career 区块，横向 scrub 推进各 career panel，
 * 配合 panel 入场、卡片激活与视差位移。
 * 移动端：各 panel 独立触发一次性入场动画。
 */
export class HorizontalJourneyAnimation extends AnimationBase {
  build() {
    const { q, isDesktop } = this;
    const careerSection = q(".career-horizontal")[0];
    const careerTrack = q(".career-track")[0];
    const panels = q(".career-panel");

    if (!careerSection || !careerTrack || !panels.length) {
      return;
    }

    gsap.set(panels, { transformOrigin: "center center" });
    gsap.set(q(".career-panel-inner"), { transformOrigin: "center center" });
    gsap.set(q(".career-card"), { autoAlpha: 1, y: 0, rotateX: 0, clipPath: "inset(0% 0% 0% 0%)" });

    gsap.from(q(".career-panel-intro .experience-head > *, .career-route span"), {
      autoAlpha: 0,
      y: 44,
      scale: 0.98,
      stagger: 0.065,
      duration: 0.78,
      ease: "portfolioReveal",
      scrollTrigger: {
        trigger: careerSection,
        start: "top 72%",
        once: true,
      },
    });

    if (!isDesktop) {
      this.buildNaturalPanels(panels);
      return;
    }

    this.buildDesktopJourney(careerSection, careerTrack, panels);
  }

  /** 自然滚动：每个 panel 进入视口时独立播放入场，移除 pin 后不会额外制造空白滚动距离 */
  buildNaturalPanels(panels) {
    panels.forEach((panel) => {
      gsap.from(panel.querySelectorAll(".career-panel-copy > *, .career-route span, .career-card"), {
        autoAlpha: 0,
        y: 36,
        duration: 0.78,
        stagger: 0.06,
        ease: "portfolioReveal",
        scrollTrigger: {
          trigger: panel,
          start: "top 72%",
          once: true,
        },
      });
    });
  }

  /** 桌面端：恢复第二屏横向左滑，pin 范围只服务履历区本身 */
  buildDesktopJourney(careerSection, careerTrack, panels) {
    const getDistance = () => Math.max(0, careerTrack.scrollWidth - window.innerWidth);
    const getScrollDistance = () => Math.max(getDistance(), window.innerHeight * 1.5);

    const careerTween = gsap.to(careerTrack, {
      x: () => -getDistance(),
      ease: "none",
      scrollTrigger: {
        id: "career-horizontal",
        trigger: careerSection,
        start: "top top",
        end: () => `+=${getScrollDistance()}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        refreshPriority: 10,
        invalidateOnRefresh: true,
        onRefresh: (self) => {
          gsap.set(careerTrack, { x: -getDistance() * self.progress });
          careerSection.style.setProperty("--career-progress-x", `${(self.progress * 100).toFixed(2)}%`);
        },
        onUpdate: (self) => {
          careerSection.style.setProperty("--career-progress-x", `${(self.progress * 100).toFixed(2)}%`);
        },
      },
    });

    panels.forEach((panel, index) => {
      this.buildPanelAnimations(panel, index, careerTween);
    });
  }

  /** 单个履历 panel 在横向轨道中的入场、视差与卡片激活 */
  buildPanelAnimations(panel, index, careerTween) {
    const inner = panel.querySelector(".career-panel-inner");
    const copy = panel.querySelectorAll(".career-phase > *, .career-copy > *, .career-proof > *");
    const card = panel.querySelector(".career-card");

    if (index > 0 && inner) {
      gsap.fromTo(
        inner,
        {
          autoAlpha: 0.18,
          y: 96,
          scale: 0.88,
          rotateX: 10,
          clipPath: "inset(24% 0% 18% 0%)",
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: careerTween,
            start: "left 78%",
            end: "center center",
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        },
      );

      gsap.fromTo(
        copy,
        { autoAlpha: 0, y: 54, scale: 0.985 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          stagger: 0.055,
          duration: 0.72,
          ease: "portfolioReveal",
          overwrite: "auto",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: careerTween,
            start: "left 62%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    if (inner) {
      gsap.to(inner, {
        yPercent: index % 2 === 0 ? -4 : 4,
        ease: "none",
        scrollTrigger: {
          trigger: panel,
          containerAnimation: careerTween,
          start: "left right",
          end: "right left",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }

    if (card) {
      gsap.fromTo(
        card,
        { autoAlpha: index === 0 ? 1 : 0.18, y: index === 0 ? 0 : 86, rotateX: 10, scale: 0.9 },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: careerTween,
            start: "left 78%",
            end: "center center",
            scrub: 0.7,
            toggleClass: { targets: card, className: "is-active" },
            invalidateOnRefresh: true,
          },
        },
      );
    }

    gsap.to(panel, {
      "--phase-shift": "-9vw",
      ease: "none",
      scrollTrigger: {
        trigger: panel,
        containerAnimation: careerTween,
        start: "left right",
        end: "right left",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  }
}
