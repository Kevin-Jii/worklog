import gsap from "gsap";
import { AnimationBase } from "../core/AnimationBase.js";

/**
 * 首屏海报入场动画
 *
 * 页面加载完成后，依次揭示顶栏、轮廓、姓名、字形装饰与摘要列表。
 * 不依赖 ScrollTrigger，在 matchMedia 初始化时立即播放。
 */
export class IntroLoadAnimation extends AnimationBase {
  build() {
    const { q } = this;

    const tl = gsap.timeline({
      defaults: { duration: 1.35, ease: "portfolioReveal" },
    });

    tl.from(q(".poster-topline > *"), { autoAlpha: 0, y: -18, stagger: 0.12, duration: 1.05 })
      .from(q(".poster-outline"), { autoAlpha: 0, scale: 0.82, y: 42, duration: 1.65 }, 0.12)
      .from(q(".poster-name > span"), { autoAlpha: 0, y: 34, letterSpacing: "0.3em", duration: 1.25 }, 0.28)
      .from(
        q(".poster-glyph"),
        {
          autoAlpha: 0,
          yPercent: 72,
          rotateX: -26,
          scaleY: 0.78,
          filter: "blur(14px)",
          stagger: 0.16,
          duration: 1.55,
        },
        0.48,
      )
      .from(
        q(".poster-summary li"),
        {
          autoAlpha: 0,
          y: 34,
          x: -22,
          clipPath: "inset(0 100% 0 0)",
          stagger: 0.18,
          duration: 1.12,
        },
        1.18,
      );
  }
}
