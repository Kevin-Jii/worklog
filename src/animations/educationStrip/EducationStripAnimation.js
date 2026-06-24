import gsap from "gsap";
import { AnimationBase } from "../core/AnimationBase.js";

/**
 * 教育经历条带动画
 *
 * 随滚动 scrub 展开 strip 容器，标题从左滑入，各 article 卡片依次浮现。
 */
export class EducationStripAnimation extends AnimationBase {
  build() {
    const { q } = this;
    const strip = q(".education-strip")[0];

    if (!strip) {
      return;
    }

    const header = strip.querySelector(":scope > div");
    const articles = strip.querySelectorAll("article");

    gsap.set(strip, { transformOrigin: "center top" });
    gsap.set(header, { opacity: 0.68, x: -28 });
    gsap.set(articles, {
      opacity: 0,
      y: 48,
      rotateX: 8,
      clipPath: "inset(18% 0 0 0)",
      transformOrigin: "center top",
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: strip,
        start: "top 86%",
        end: "top 48%",
        scrub: 0.7,
        invalidateOnRefresh: true,
      },
      defaults: { ease: "none" },
    })
      .fromTo(
        strip,
        {
          y: 46,
          scale: 0.97,
          clipPath: "inset(12% 0 0 0 round 16px)",
        },
        {
          y: 0,
          scale: 1,
          clipPath: "inset(0% 0 0 0 round 16px)",
          duration: 0.9,
        },
        0,
      )
      .to(header, { opacity: 1, x: 0, duration: 0.48 }, 0.08)
      .to(articles, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        clipPath: "inset(0% 0 0 0)",
        stagger: 0.12,
        duration: 0.62,
      }, 0.24);
  }
}
