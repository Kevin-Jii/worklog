import { Stack } from "@phosphor-icons/react";
import "./css/ContactBand.css";

export function ContactBand({ profile }) {
  return (
    <footer className="contact-section" id="contact">
      <div>
        <Stack size={36} weight="duotone" />
        <h2>需要一个能把复杂现场落到界面的人，可以直接联系我。</h2>
      </div>
      <div className="contact-actions">
        <a className="button-primary" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <a className="button-ghost" href={`tel:${profile.phone}`}>
          {profile.phone}
        </a>
      </div>
      <p>© 2026 {profile.name}. Built with React, Tailwind CSS, Motion, GSAP and Cloudflare.</p>
    </footer>
  );
}
