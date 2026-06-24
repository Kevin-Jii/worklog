import gsap from "gsap";
import { AnimationBase } from "../core/AnimationBase.js";

/**
 * 首屏离开视口时的退场动画
 *
 * 随滚动 scrub 推进：姓名上移缩小、轮廓淡出、摘要列表渐隐、舞台裁剪收缩。
 */
export class IntroExitAnimation extends AnimationBase {
  build() {
    const { q } = this;
    const intro = q(".portfolio-intro")[0];
    const stage = q(".poster-stage")[0];

    if (!intro || !stage) {
      return;
    }

    gsap.timeline({
      scrollTrigger: {
        trigger: intro,
        start: "55% center",
        end: "bottom top",
        scrub: 0.85,
      },
    })
      .to(q(".poster-name"), { yPercent: -16, scale: 0.94, ease: "none" }, 0)
      .to(q(".poster-outline"), { yPercent: -10, scale: 1.08, autoAlpha: 0.2, ease: "none" }, 0)
      .to(q(".poster-summary li"), { yPercent: -18, autoAlpha: 0.42, stagger: 0.015, ease: "none" }, 0)
      .to(stage, { clipPath: "inset(0 0 26% 0)", ease: "none" }, 0.05);
  }
}
