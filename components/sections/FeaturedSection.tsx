"use client";

import DrinkCard from "@/components/ui/DrinkCard";
import { FEATURED_DRINKS } from "@/constants";
import styles from "./FeaturedSection.module.css";

export default function FeaturedSection() {
  return (
    <section id="menu" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Brews &amp; Bites</h2>
          <p className={styles.subtitle}>The flavors that define us.</p>
        </div>
        <div className={styles.grid}>
          {FEATURED_DRINKS.slice(0, 3).map((drink) => (
            <DrinkCard key={drink.id} drink={drink} />
          ))}
        </div>
      </div>
    </section>
  );
}