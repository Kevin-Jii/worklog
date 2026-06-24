import { Brain, Briefcase, EnvelopeSimple, GitBranch, House, StackSimple } from "@phosphor-icons/react";
import "./css/DockNav.css";

const navItems = [
  { href: "#home", label: "首页", icon: House },
  { href: "#experience", label: "履历", icon: GitBranch },
  { href: "#industries", label: "项目", icon: Briefcase },
  { href: "#ai", label: "AI", icon: Brain },
  { href: "#stack", label: "技能", icon: StackSimple },
  { href: "#contact", label: "联系", icon: EnvelopeSimple },
];

export function DockNav() {
  const handleNavClick = (event, href) => {
    const target = document.querySelector(href);
    const smoother = window.__portfolioSmoother;

    if (!target || !smoother) {
      return;
    }

    event.preventDefault();
    smoother.scrollTo(target, true, "top top");
    window.history.replaceState(null, "", href);
  };

  return (
    <nav className="dock-nav" aria-label="页面导航">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <a key={item.href} href={item.href} aria-label={item.label} onClick={(event) => handleNavClick(event, item.href)}>
            <Icon size={20} weight="duotone" />
            <span>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
