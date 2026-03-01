import Link from "next/link";
import {
  FOOTER_QUICK_LINKS,
  FOOTER_SUPPORT_LINKS,
  SITE_NAME,
} from "@/constants";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <CupIcon />
              <span>{SITE_NAME}</span>
            </div>
            <p className={styles.tagline}>Brewed for more than taste.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.list}>
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.listLink}>
                    · {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className={styles.colTitle}>Support</h4>
            <ul className={styles.list}>
              {FOOTER_SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.listLink}>
                    · {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className={styles.colTitle}>Follow the Aroma</h4>
            <div className={styles.socials}>
              <SocialIcon type="instagram" />
              <SocialIcon type="twitter" />
              <SocialIcon type="whatsapp" />
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2025 {SITE_NAME}. All rights reserved.</p>
          <p>Crafted with love, fueled by coffee. ☕</p>
        </div>
      </div>
    </footer>
  );
}

function CupIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <rect
        x="4"
        y="10"
        width="16"
        height="14"
        rx="2"
        stroke="#f5e6c8"
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M20 13h3a2 2 0 010 4h-3" stroke="#f5e6c8" strokeWidth="1.5" />
      <path
        d="M9 10V7a1 1 0 011-1h8a1 1 0 011 1v3"
        stroke="#f5e6c8"
        strokeWidth="1.5"
      />
      <path
        d="M8 24h8"
        stroke="#f5e6c8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SocialIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    instagram: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    twitter: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    whatsapp: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  };

  return (
    <a href="#" className={styles.socialBtn}>
      {icons[type]}
    </a>
  );
}
