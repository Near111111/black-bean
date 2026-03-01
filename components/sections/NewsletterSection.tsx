"use client";

import { useState } from "react";
import styles from "./NewsletterSection.module.css";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <img src="/beans-no-bg/beans2.png" alt="" className={styles.beanTL} />
      <img src="/beans-no-bg/beans2.png" alt="" className={styles.beanTR} />

      <div className={styles.inner}>
        <h2 className={styles.title}>Join the Circle of coffee lovers</h2>
        <p className={styles.subtitle}>
          Join us for open mic nights, latte art workshops, and Sunday book
          clubs. Coffee tastes better when shared.
        </p>

        {subscribed ? (
          <p className={styles.thanks}>☕ Thank you! Welcome to the circle.</p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              placeholder="jane@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
            <button type="submit" className={styles.submitBtn}>
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
