import Link from "next/link";
import { NAV_LINKS, SITE_NAME } from "@/constants";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <CupIcon />
        <span>{SITE_NAME}</span>
      </Link>

      <div className={styles.links}>
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className={styles.navLink}>
            {link.label}
          </Link>
        ))}
      </div>

      <div className={styles.auth}>
        <button className={styles.loginBtn}>Login</button>
        <button className={styles.signupBtn}>Sign up</button>
      </div>
    </nav>
  );
}

function CupIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
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