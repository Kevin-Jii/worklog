import gsap from "gsap";
import { AnimationBase } from "../core/AnimationBase.js";

/**
 * 项目场景动画 — 自然分屏入场
 *
 * 当前版本先移除吸顶/pin，避免额外滚动距离造成空白页。
 * 每个项目仍保持一屏展示，并在进入视口时播放独立过渡。
 */
export class ProjectScenesAnimation extends AnimationBase {
  build() {
    const { q, isDesktop } = this;

    this.buildFieldIntros(q);

    if (isDesktop) {
      return this.buildDesktopSceneReveals(q);
    }

    return this.buildMobileSlides(q);
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

  /** 桌面端：自然文档流中的一屏一项目入场 */
  buildDesktopSceneReveals(q) {
    const stage = q(".project-scenes")[0];
    const viewport = q(".project-scenes-viewport")[0];
    const scenes = q(".project-scene");
    const curl = q(".project-screen-curl")[0];

    if (!stage || !viewport || !scenes.length) {
      return;
    }

    gsap.set(curl, {
      autoAlpha: 0,
    });
    scenes.forEach((scene) => {
      gsap.set(scene, {
        position: "relative",
        inset: "auto",
        autoAlpha: 1,
        zIndex: "auto",
        scale: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        "--page-dim": 0,
      });

      const sceneContent = this.getSceneContent(scene);
      gsap.set(sceneContent, {
        autoAlpha: 1,
        y: 0,
        clipPath: "inset(0% 0% 0% 0%)",
      });

      gsap.fromTo(
        scene,
        {
          autoAlpha: 0,
          y: 72,
          scale: 0.975,
          clipPath: "inset(10% 0% 0% 0%)",
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.9,
          ease: "portfolioReveal",
          scrollTrigger: {
            trigger: scene,
            start: "top 82%",
            once: true,
            invalidateOnRefresh: true,
          },
        },
      );
    });
  }

  /** 只服务于项目经历模块的 DOM 目标集合，避免把动画封装成跨模块通用函数 */
  getSceneContent(scene) {
    return Array.from(scene.querySelectorAll([
      ".project-kicker",
      ".project-scene h3",
      ".project-meta-line",
      ".project-scene-main > p",
      ".project-github",
      ".project-stack",
      ".project-duty",
    ].join(",")));
  }

  /** 移动端：自然滚动 + 进入视口时整屏淡入 */
  buildMobileSlides(q) {
    q(".project-scene").forEach((scene) => {
      gsap.from(scene, {
        autoAlpha: 0,
        y: 56,
        duration: 0.85,
        ease: "portfolioReveal",
        scrollTrigger: {
          trigger: scene,
          start: "top 88%",
          once: true,
        },
      });
    });
  }
}
