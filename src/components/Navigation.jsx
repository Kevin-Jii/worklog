import { EnvelopeSimple } from "@phosphor-icons/react";
import "./css/Navigation.css";

export function Navigation({ profile }) {
  const links = [
    ["项目", "#industries"],
    ["AI", "#ai"],
    ["履历", "#experience"],
    ["联系", "#contact"],
  ];

  return (
    <header className="site-nav">
      <a className="brand-mark" href="#home" aria-label="返回首页">
        <span>{profile.initials}</span>
      </a>
      <nav aria-label="页面导航">
        {links.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <a className="nav-contact" href={`mailto:${profile.email}`}>
        <EnvelopeSimple size={18} weight="bold" />
        <span>联系</span>
      </a>
    </header>
  );
}
