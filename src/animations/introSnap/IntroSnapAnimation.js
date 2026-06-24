import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimationBase } from "../core/AnimationBase.js";
import { scrollToSection } from "../core/scrollToSection.js";

/**
 * 首屏吸附滚动
 *
 * 在 intro 区域内滚动时，根据进度与速度自动吸附到 intro 顶部或 experience 区块，
 * 避免用户停留在中间过渡态。
 */
export class IntroSnapAnimation extends AnimationBase {
  build() {
    const { q, smoother } = this;
    const intro = q(".portfolio-intro")[0];
    const experience = q(".experience-section")[0];
    let isSnapping = false;
    const settleSnap = gsap.delayedCall(0.18, () => {}).pause();

    if (!intro || !experience) {
      return;
    }

    const scrollToTarget = (target) => {
      isSnapping = true;
      scrollToSection(target, smoother, () => {
        isSnapping = false;
      });
    };

    ScrollTrigger.create({
      trigger: intro,
      start: "top top",
      end: "bottom top",
      onLeave: () => {
        if (!isSnapping) {
          scrollToTarget(experience);
        }
      },
      onUpdate: (self) => {
        if (isSnapping || Math.abs(self.getVelocity()) > 120) {
          return;
        }

        if (self.progress > 0.06 && self.progress < 0.94) {
          settleSnap
            .eventCallback("onComplete", () => {
              scrollToTarget(self.progress >= 0.5 ? experience : intro);
            })
            .restart(true);
        }
      },
    });
  }
}
