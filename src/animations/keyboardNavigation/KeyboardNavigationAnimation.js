import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimationBase } from "../core/AnimationBase.js";
import { scrollToSection } from "../core/scrollToSection.js";

/**
 * 键盘分屏导航
 *
 * 监听方向键 / PageUp / PageDown / 空格，在各主区块间顺序跳转。
 * 返回清理函数，用于移除 keydown 监听。
 */
export class KeyboardNavigationAnimation extends AnimationBase {
  build() {
    const { q, smoother } = this;

    const sections = [
      q(".portfolio-intro")[0],
      q(".experience-section")[0],
      q(".skills-stage")[0],
      q(".project-field-intro")[0] || q(".resume-details")[0],
      q(".project-scenes")[0],
      q(".ai-section")[0],
      q(".contact-section")[0],
    ].filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    let isKeyboardScrolling = false;
    const editableSelector = "input, textarea, select, [contenteditable='true']";

    const getCurrentIndex = () => {
      const viewportAnchor = window.scrollY + window.innerHeight * 0.45;
      let currentIndex = 0;

      sections.forEach((section, index) => {
        if (section.offsetTop <= viewportAnchor) {
          currentIndex = index;
        }
      });

      return currentIndex;
    };

    const moveTo = (direction) => {
      if (isKeyboardScrolling) {
        return;
      }

      const careerTrigger = ScrollTrigger.getById("career-horizontal");

      if (careerTrigger?.isActive) {
        const nextScroll = direction > 0 ? careerTrigger.end + 2 : careerTrigger.start - 2;

        isKeyboardScrolling = true;
        gsap.to(window, {
          scrollTo: { y: nextScroll, autoKill: false },
          duration: 0.78,
          ease: "portfolioReveal",
          overwrite: true,
          onComplete: () => {
            isKeyboardScrolling = false;
          },
        });
        return;
      }

      const currentIndex = getCurrentIndex();
      const nextIndex = gsap.utils.clamp(0, sections.length - 1, currentIndex + direction);

      if (nextIndex === currentIndex) {
        return;
      }

      isKeyboardScrolling = true;
      scrollToSection(sections[nextIndex], smoother, () => {
        isKeyboardScrolling = false;
      });
    };

    const onKeyDown = (event) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey || event.target?.closest?.(editableSelector)) {
        return;
      }

      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        moveTo(1);
        return;
      }

      if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        moveTo(-1);
      }
    };

    window.addEventListener("keydown", onKeyDown, { passive: false });

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }
}
