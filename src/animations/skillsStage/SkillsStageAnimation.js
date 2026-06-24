import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { AnimationBase } from "../core/AnimationBase.js";

/**
 * 技能矩阵卡片舞台动画
 *
 * 这个类只服务 SkillsStage：
 * 1. 整个技能屏进入视口时做一次“整屏切入”；
 * 2. 技能卡片以中心主卡 + 两侧倾斜副卡的方式排布；
 * 3. 鼠标或触摸拖动时切换当前技能卡。
 */
export class SkillsStageAnimation extends AnimationBase {
  build() {
    const { q, isDesktop } = this;
    const stage = q(".skills-stage")[0];
    const shell = q(".skills-stage-shell")[0];
    const headItems = q(".skills-stage-head > *");
    const carousel = q(".skills-carousel")[0];
    const cards = q("[data-skill-card]");
    const dragHandle = q(".skills-drag-handle")[0];
    const core = q(".skills-core")[0];
    const stackConsole = q(".stack-console")[0];
    const stackTags = q(".stack-tags")[0];

    if (!stage || !shell) {
      return;
    }

    this.buildScreenEntrance(stage, shell, headItems, core, stackConsole);
    this.buildStackTicker(stackTags);

    if (!carousel || !cards.length) {
      return;
    }

    if (!isDesktop) {
      this.buildMobileCardReveal(cards, carousel);
      return;
    }

    return this.buildDraggableDeck(carousel, cards, dragHandle);
  }

  /** 整个技能模块从视口底部切入，强调“整屏进来”的阶段变化 */
  buildScreenEntrance(stage, shell, headItems, core, stackConsole) {
    gsap.fromTo(
      shell,
      {
        autoAlpha: 0,
        y: 130,
        scale: 0.92,
        rotateX: 8,
        clipPath: "inset(18% 0% 0% 0%)",
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: {
          trigger: stage,
          start: "top 86%",
          end: "top 26%",
          scrub: 0.95,
          invalidateOnRefresh: true,
        },
      },
    );

    if (headItems.length) {
      gsap.from(headItems, {
        autoAlpha: 0,
        y: 42,
        duration: 0.92,
        stagger: 0.1,
        ease: "portfolioReveal",
        scrollTrigger: {
          trigger: stage,
          start: "top 66%",
          once: true,
        },
      });
    }

    if (core) {
      gsap.fromTo(
        core,
        { autoAlpha: 0, scale: 0.72, rotate: -18 },
        {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          duration: 1.15,
          ease: "portfolioPanel",
          scrollTrigger: {
            trigger: stage,
            start: "top 62%",
            once: true,
          },
        },
      );
    }

    if (stackConsole) {
      gsap.from(stackConsole, {
        autoAlpha: 0,
        y: 54,
        scale: 0.98,
        duration: 0.9,
        ease: "portfolioReveal",
        scrollTrigger: {
          trigger: stackConsole,
          start: "top 88%",
          once: true,
        },
      });
    }
  }

  /** 技术栈标签保持独立的横向流动，不参与卡片拖拽状态 */
  buildStackTicker(stackTags) {
    if (!stackTags) {
      return;
    }

    gsap.to(stackTags, {
      xPercent: -50,
      duration: 24,
      ease: "none",
      repeat: -1,
    });
  }

  /** 桌面端技能卡片拖拽：右拖回上一张，左拖进入下一张 */
  buildDraggableDeck(carousel, cards, dragHandle) {
    let activeIndex = 0;
    const wrapIndex = gsap.utils.wrap(0, cards.length);
    const cardArray = Array.from(cards);

    const goToCard = (nextIndex) => {
      activeIndex = wrapIndex(nextIndex);
      this.renderDeck(carousel, cardArray, activeIndex, false);
    };

    carousel.setAttribute("tabindex", "0");
    carousel.setAttribute("role", "group");
    this.renderDeck(carousel, cardArray, activeIndex, true);

    const dragInstances = Draggable.create(carousel, {
      type: "x",
      trigger: carousel,
      bounds: { minX: -140, maxX: 140 },
      edgeResistance: 0.72,
      minimumMovement: 4,
      cursor: "grab",
      activeCursor: "grabbing",
      onDragStart: () => {
        carousel.classList.add("is-dragging");
      },
      onDragEnd() {
        const delta = this.x;

        gsap.to(carousel, {
          x: 0,
          duration: 0.42,
          ease: "portfolioReveal",
          onComplete: () => carousel.classList.remove("is-dragging"),
        });

        if (delta < -58) {
          goToCard(activeIndex + 1);
        }

        if (delta > 58) {
          goToCard(activeIndex - 1);
        }
      },
    });

    const handleClick = () => goToCard(activeIndex + 1);
    const keyboardSwitch = (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToCard(activeIndex + 1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToCard(activeIndex - 1);
      }
    };

    dragHandle?.addEventListener("click", handleClick);
    carousel.addEventListener("keydown", keyboardSwitch);

    return () => {
      dragInstances.forEach((instance) => instance.kill());
      dragHandle?.removeEventListener("click", handleClick);
      carousel.removeEventListener("keydown", keyboardSwitch);
    };
  }

  /** 根据当前 activeIndex 重新绘制中心卡、左右副卡和远端暗卡 */
  renderDeck(carousel, cards, activeIndex, immediate = false) {
    const carouselWidth = Math.max(carousel.offsetWidth, 640);
    const sideX = Math.min(carouselWidth * 0.39, 560);
    const farX = Math.min(carouselWidth * 0.6, 820);
    const duration = immediate ? 0 : 0.76;

    cards.forEach((card, index) => {
      let offset = index - activeIndex;
      const half = cards.length / 2;

      if (offset > half) {
        offset -= cards.length;
      }

      if (offset < -half) {
        offset += cards.length;
      }

      const state = this.getDeckState(offset, sideX, farX);
      card.classList.toggle("is-active", offset === 0);

      gsap.set(card, {
        xPercent: -50,
        yPercent: -50,
        zIndex: state.zIndex,
        pointerEvents: Math.abs(offset) <= 1 ? "auto" : "none",
      });
      gsap.to(card, {
        x: state.x,
        y: state.y,
        xPercent: -50,
        yPercent: -50,
        scale: state.scale,
        rotate: state.rotate,
        autoAlpha: state.autoAlpha,
        filter: state.filter,
        duration,
        ease: "portfolioPanel",
        overwrite: true,
      });
    });
  }

  /** 卡片相对中心位置对应的视觉状态 */
  getDeckState(offset, sideX, farX) {
    if (offset === 0) {
      return {
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        autoAlpha: 1,
        zIndex: 40,
        filter: "blur(0px) saturate(1)",
      };
    }

    if (Math.abs(offset) === 1) {
      const direction = Math.sign(offset);

      return {
        x: direction * sideX,
        y: 28,
        scale: 0.82,
        rotate: direction * 13,
        autoAlpha: 0.86,
        zIndex: 24,
        filter: "blur(0px) saturate(0.86)",
      };
    }

    const direction = Math.sign(offset);

    return {
      x: direction * farX,
      y: 70,
      scale: 0.64,
      rotate: direction * 22,
      autoAlpha: 0.28,
      zIndex: 8,
      filter: "blur(2px) saturate(0.72)",
    };
  }

  /** 移动端不使用拖拽舞台，改为自然卡片逐张出现，避免横向溢出 */
  buildMobileCardReveal(cards, carousel) {
    carousel.removeAttribute("tabindex");
    cards.forEach((card) => {
      gsap.from(card, {
        autoAlpha: 0,
        y: 42,
        duration: 0.78,
        ease: "portfolioReveal",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          once: true,
        },
      });
    });
  }
}
