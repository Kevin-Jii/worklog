import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

let registered = false;

/**
 * 注册 GSAP 插件与站点自定义缓动曲线。
 * 多次调用安全，仅首次生效。
 */
export function registerPortfolioEases() {
  if (registered) {
    return;
  }

  gsap.registerPlugin(CustomEase, Draggable, ScrollTrigger, ScrollToPlugin);

  CustomEase.create("portfolioPanel", "M0,0 C0.16,0.84 0.31,1 1,1");
  CustomEase.create("portfolioReveal", "M0,0 C0.22,0.94 0.34,1 1,1");
  CustomEase.create("portfolioExit", "M0,0 C0.7,0 0.84,0.18 1,1");

  registered = true;
}
