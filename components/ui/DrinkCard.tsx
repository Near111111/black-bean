"use client";

import { useState } from "react";
import { Drink } from "@/types";
import styles from "./DrinkCard.module.css";
import OrderModal from "./OrderModal";

export default function DrinkCard({ drink }: { drink: Drink }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img src={drink.image} alt={drink.name} className={styles.image} />
          <div className={styles.imageOverlay} />
        </div>
        <div className={styles.body}>
          <h3 className={styles.name}>{drink.name}</h3>
          <p className={styles.description}>{drink.description}</p>
          <div className={styles.footer}>
            <span className={styles.price}>{drink.price}</span>
            <button className={styles.orderBtn} onClick={() => setOpen(true)}>
              Order
            </button>
          </div>
        </div>
      </div>

      {open && <OrderModal drink={drink} onClose={() => setOpen(false)} />}
    </>
  );
}
