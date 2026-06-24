import gsap from "gsap";
import { AnimationBase } from "../core/AnimationBase.js";

/**
 * 联系区块动画
 *
 * 随滚动 scrub 展开 section 容器，标题、操作按钮与备注依次浮现。
 */
export class ContactBandAnimation extends AnimationBase {
  build() {
    const { q } = this;
    const section = q(".contact-section")[0];

    if (!section) {
      return;
    }

    const titleBlock = section.querySelector(":scope > div:first-child");
    const actions = section.querySelector(".contact-actions");
    const note = section.querySelector(":scope > p");

    gsap.set(section, { transformOrigin: "center bottom" });
    gsap.set([titleBlock, actions, note], {
      opacity: 0,
      y: 36,
      clipPath: "inset(0 0 26% 0)",
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 88%",
        end: "top 48%",
        scrub: 0.72,
        invalidateOnRefresh: true,
      },
      defaults: { ease: "none" },
    })
      .fromTo(
        section,
        {
          y: 70,
          scale: 0.965,
          clipPath: "inset(12% 0% 0% 0%)",
        },
        {
          y: 0,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.78,
        },
        0,
      )
      .to(titleBlock, {
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0 0% 0)",
        duration: 0.42,
      }, 0.12)
      .to(actions, {
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0 0% 0)",
        duration: 0.44,
      }, 0.32)
      .to(note, {
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0 0% 0)",
        duration: 0.38,
      }, 0.5);
  }
}
