import gsap from "gsap";

/**
 * 平滑滚动到指定区块。
 * 当前默认使用原生窗口滚动；保留 smoother 参数只是为了兼容旧调用。
 *
 * @param {HTMLElement | null} target - 目标区块 DOM
 * @param {{ scrollTo?: Function } | null} smoother
 * @param {() => void} [onComplete] - 滚动完成回调
 */
export function scrollToSection(target, smoother, onComplete) {
  if (!target) {
    return;
  }

  if (smoother) {
    smoother.scrollTo(target, true, "top top");
    gsap.delayedCall(0.72, onComplete);
    return;
  }

  gsap.to(window, {
    scrollTo: {
      y: target,
      offsetY: 0,
    },
    duration: 0.72,
    ease: "portfolioReveal",
    overwrite: true,
    onComplete,
  });
}
