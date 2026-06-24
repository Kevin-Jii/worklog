import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  registerPortfolioEases,
  SCROLL_ANIMATIONS,
} from "../animations/index.js";

registerPortfolioEases();

/** 需要 force3D 加速的公共选择器 */
const GPU_TARGETS =
  ".poster-stage, .poster-glyph, .poster-summary li, .career-track, .career-panel-inner, .career-card, .skills-stage-head, .skill-module, .skills-core, .stack-console, .project-card, .project-modal-panel, .ai-stage";

/** 无障碍模式下需清除内联样式的选择器 */
const REDUCED_MOTION_CLEAR =
  ".poster-topline, .poster-name > *, .poster-summary li, .career-panel-copy > *, .career-route span, .career-card, .skills-stage-head, .skill-module, .skills-core, .stack-console, .project-card, .project-modal-panel";

/**
 * 滚动编排入口组件
 *
 * 负责初始化 matchMedia 断点与动画实例化，
 * 具体动画逻辑见 src/animations/ 下各独立 class。
 */
export function ScrollChoreography({ scope }) {
  React.useLayoutEffect(() => {
    let ctx;
    let frame = 0;

    frame = window.requestAnimationFrame(() => {
      const root = scope?.current || document.querySelector(".scroll-page");

      if (!root) {
        return;
      }

      const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      delete window.__portfolioSmoother;
      document.querySelector("#smooth-wrapper")?.removeAttribute("style");
      document.querySelector("#smooth-content")?.removeAttribute("style");
      document.documentElement.style.removeProperty("scroll-behavior");
      document.documentElement.style.removeProperty("touch-action");
      document.body.style.removeProperty("height");
      document.body.style.removeProperty("touch-action");
      document.body.style.removeProperty("scroll-behavior");

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia(root);
        const q = gsap.utils.selector(root);

        mm.add(
          {
            isDesktop: "(min-width: 981px)",
            reduceMotion: "(prefers-reduced-motion: reduce)",
          },
          ({ conditions }) => {
            const { isDesktop, reduceMotion } = conditions;

            gsap.set(q(GPU_TARGETS), { force3D: true });

            if (reduceMotion) {
              gsap.set(q(REDUCED_MOTION_CLEAR), { clearProps: "all" });
              return;
            }

            const context = { q, isDesktop, smoother: null };
            const cleanups = SCROLL_ANIMATIONS.map((AnimationClass) => {
              const animation = new AnimationClass(context);
              return animation.build();
            }).filter(Boolean);

            window.requestAnimationFrame(() => {
              ScrollTrigger.refresh();
            });

            return () => {
              cleanups.forEach((cleanup) => cleanup());
            };
          },
        );

        return () => {
          mm.revert();
        };
      }, root);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      ctx?.revert();
      delete window.__portfolioSmoother;
    };
  }, [scope]);

  return null;
}
