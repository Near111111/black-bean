import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>About us</h2>

        {/* Row 1 — image left (L-shape: left + bottom), text right */}
        <div className={styles.row}>
          <div className={styles.imageFrame}>
            {/* SVG L-shape line: vertical left + horizontal bottom */}
            <svg
              className={styles.frameLine}
              viewBox="0 0 276 216"
              preserveAspectRatio="none"
            >
              <path
                d="M 16 8 L 16 200 L 260 200"
                fill="none"
                stroke="rgba(100,70,40,0.5)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80"
              alt="Coffee brewing"
              className={styles.image}
            />
          </div>

          <div className={styles.textBlock}>
            <p className={styles.body}>
              At <strong>Black Bean</strong>, every cup begins with carefully
              selected beans, roasted to bring out their richest flavors. But
              coffee here isn&apos;t just about taste — it&apos;s about slowing
              down, finding connection, and creating moments worth savoring.
            </p>
            <p className={styles.body}>
              From our signature lattes to our small-batch pastries, everything
              we serve is crafted with intention.
            </p>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Row 2 — text + button left, image right (L-shape: right + bottom) */}
        <div className={styles.rowReverse}>
          <div className={styles.textBlock}>
            <p className={styles.body}>
              We believe in sustainability, in supporting local suppliers, and
              in making our space a place where everyone feels welcome.
            </p>
            <p className={styles.body}>
              Whether you&apos;re here for your morning ritual, an afternoon
              recharge, or a late-night conversation, we pour more than coffee —
              we pour care, creativity, and community into every cup.
            </p>
            <button className={styles.exploreBtn}>Explore our menu</button>
          </div>

          <div className={styles.imageFrameRight}>
            {/* SVG L-shape line: horizontal bottom + vertical right */}
            <svg
              className={styles.frameLine}
              viewBox="0 0 276 216"
              preserveAspectRatio="none"
            >
              <path
                d="M 16 200 L 260 200 L 260 8"
                fill="none"
                stroke="rgba(100,70,40,0.5)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <img
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80"
              alt="Latte art"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
