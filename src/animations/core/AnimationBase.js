/**
 * 滚动动画基类
 *
 * 所有页面区块动画都应继承此类，统一接收 GSAP 作用域选择器与运行时上下文，
 * 便于 ScrollChoreography 以相同方式实例化并调用 build()。
 */
export class AnimationBase {
  /**
 * @param {object} context - 动画运行时上下文
 * @param {Function} context.q - gsap.utils.selector(root) 返回的作用域选择器
 * @param {boolean} [context.isDesktop=true] - 是否为桌面断点 (≥981px)
 * @param {{ scrollTo?: Function } | null} [context.smoother=null] - 可选平滑滚动实例
 */
  constructor({ q, isDesktop = true, smoother = null }) {
    this.q = q;
    this.isDesktop = isDesktop;
    this.smoother = smoother;
  }

  /**
   * 构建并注册动画。子类必须实现。
   *
   * @returns {(() => void) | void} 可选的清理函数（如事件监听），在 matchMedia revert 时调用
   */
  build() {
    throw new Error(`${this.constructor.name}.build() 尚未实现`);
  }
}
