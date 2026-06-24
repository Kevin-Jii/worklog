import gsap from "gsap";
import { AnimationBase } from "../core/AnimationBase.js";

/**
 * AI 能力区块动画
 *
 * 随滚动 scrub 展开 stage、mark 旋转清晰化、文案与流程卡片依次入场，
 * 背景圆环持续旋转缩放视差。
 */
export class AiCapabilityAnimation extends AnimationBase {
  build() {
    const { q } = this;
    const section = q(".ai-section")[0];

    if (!section) {
      return;
    }

    const stage = section.querySelector(".ai-stage");
    const mark = section.querySelector(".ai-mark-wrap");
    const copy = section.querySelectorAll(".ai-copy > h2, .ai-copy > p");
    const flow = section.querySelectorAll(".ai-flow article");
    const rings = section.querySelectorAll(".ai-mark i");

    gsap.set(stage, { transformOrigin: "center center" });
    gsap.set(mark, {
      opacity: 0.28,
      scale: 0.72,
      rotate: -18,
      filter: "blur(8px)",
    });
    gsap.set(copy, {
      opacity: 0.42,
      y: 42,
      clipPath: "inset(0 0 30% 0)",
    });
    gsap.set(flow, {
      opacity: 0,
      x: 38,
      clipPath: "inset(0 0 0 18%)",
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 82%",
        end: "top 28%",
        scrub: 0.85,
        invalidateOnRefresh: true,
      },
      defaults: { ease: "none" },
    })
      .fromTo(
        stage,
        {
          y: 72,
          scale: 0.94,
          clipPath: "inset(10% 0 0 0)",
        },
        {
          y: 0,
          scale: 1,
          clipPath: "inset(0% 0 0 0)",
          duration: 0.95,
        },
        0,
      )
      .to(mark, {
        opacity: 1,
        scale: 1,
        rotate: 0,
        filter: "blur(0px)",
        duration: 0.52,
      }, 0.06)
      .to(copy, {
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0 0% 0)",
        stagger: 0.08,
        duration: 0.52,
      }, 0.18)
      .to(flow, {
        opacity: 1,
        x: 0,
        clipPath: "inset(0 0 0 0%)",
        stagger: 0.09,
        duration: 0.58,
      }, 0.34);

    this.buildRingParallax(section, rings);
  }

  /** 背景圆环交替旋转与缩放的滚动视差 */
  buildRingParallax(section, rings) {
    rings.forEach((ring, index) => {
      gsap.to(ring, {
        rotation: index % 2 ? "-=46" : "+=46",
        scale: index % 2 ? 0.94 : 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }
}
