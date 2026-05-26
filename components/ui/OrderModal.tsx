"use client";

import { useState } from "react";
import { Drink } from "@/types";
import styles from "./OrderModal.module.css";

type Step = "fulfillment" | "order" | "payment" | "receipt";

const SIZE_OPTIONS = ["Small", "Medium", "Large"] as const;
const SIZE_UPCHARGE: Record<string, number> = {
  Small: 0,
  Medium: 0.5,
  Large: 1,
};

const ADDONS = [
  { label: "Extra Shot", price: 1.0 },
  { label: "Oat Milk", price: 0.75 },
  { label: "Whipped Cream", price: 0.5 },
  { label: "Vanilla Syrup", price: 0.5 },
];

const DELIVERY_TIME_OPTIONS = [
  { label: "ASAP", sublabel: "25–35 min" },
  { label: "30 min", sublabel: "Scheduled" },
  { label: "1 hour", sublabel: "Scheduled" },
  { label: "Custom", sublabel: "Pick a time" },
];

function generateOrderId() {
  return "BB-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function parsePrice(price: string): number {
  return parseFloat(price.replace("$", ""));
}

interface Props {
  drink: Drink;
  onClose: () => void;
}

export default function OrderModal({ drink, onClose }: Props) {
  const [step, setStep] = useState<Step>("fulfillment");
  const [fulfillment, setFulfillment] = useState<"dine-in" | "delivery" | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("ASAP");
  const [customTime, setCustomTime] = useState("");

  const [size, setSize] = useState("Medium");
  const [qty, setQty] = useState(1);
  const [addons, setAddons] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [method, setMethod] = useState<"card" | "cash">("card");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [orderId] = useState(generateOrderId);
  const [orderTime] = useState(() =>
    new Date().toLocaleString("en-PH", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
  );

  const basePrice = parsePrice(drink.price);
  const sizeUpcharge = SIZE_UPCHARGE[size];
  const addonsTotal = addons.reduce((sum, a) => {
    const found = ADDONS.find((x) => x.label === a);
    return sum + (found?.price ?? 0);
  }, 0);
  const unitPrice = basePrice + sizeUpcharge + addonsTotal;
  const subtotal = unitPrice * qty;
  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  const isFulfillmentValid =
    fulfillment === "dine-in" ||
    (fulfillment === "delivery" &&
      deliveryAddress.trim().length > 0 &&
      (deliveryTime !== "Custom" || customTime.trim().length > 0));

  const displayDeliveryTime =
    deliveryTime === "Custom" ? customTime : deliveryTime;

  function toggleAddon(label: string) {
    setAddons((prev) =>
      prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label],
    );
  }

  function formatCard(val: string) {
    return val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  }

  function formatExpiry(val: string) {
    const clean = val.replace(/\D/g, "").slice(0, 4);
    return clean.length > 2 ? clean.slice(0, 2) + "/" + clean.slice(2) : clean;
  }

  function validatePayment() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.includes("@")) e.email = "Valid email required";
    if (method === "card") {
      if (card.replace(/\s/g, "").length < 16)
        e.card = "Enter a valid 16-digit card number";
      if (expiry.length < 5) e.expiry = "Enter expiry MM/YY";
      if (cvv.length < 3) e.cvv = "Enter 3-digit CVV";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handlePaySubmit() {
    if (validatePayment()) setStep("receipt");
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* ── Step: FULFILLMENT ── */}
        {step === "fulfillment" && (
          <>
            <div className={styles.header}>
              <div className={styles.headerText} style={{ paddingLeft: 0 }}>
                <p className={styles.eyebrow}>How are you having it?</p>
                <h2 className={styles.drinkName}>Choose order type</h2>
              </div>
              <button className={styles.close} onClick={onClose}>
                ✕
              </button>
            </div>

            <div className={styles.body}>
              <div className={styles.methodRow}>
                <button
                  className={`${styles.methodBtn} ${fulfillment === "dine-in" ? styles.methodActive : ""}`}
                  onClick={() => setFulfillment("dine-in")}
                >
                  🍽 Dine In
                </button>
                <button
                  className={`${styles.methodBtn} ${fulfillment === "delivery" ? styles.methodActive : ""}`}
                  onClick={() => setFulfillment("delivery")}
                >
                  🛵 Delivery
                </button>
              </div>

              {fulfillment === "dine-in" && (
                <p className={styles.gcashNote} style={{ marginTop: "1rem" }}>
                  Enjoy your order at the café. No wait time estimate needed. ☕
                </p>
              )}

              {fulfillment === "delivery" && (
                <>
                  {/* Address */}
                  <div className={styles.field} style={{ marginTop: "1rem" }}>
                    <label className={styles.label}>Delivery Address</label>
                    <input
                      className={styles.input}
                      placeholder="123 Kalayaan Ave, Quezon City"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                    />
                  </div>

                  {/* Delivery time */}
                  <div className={styles.field} style={{ marginTop: "1rem" }}>
                    <label className={styles.label}>Delivery Time</label>
                    <div className={styles.sizeRow}>
                      {DELIVERY_TIME_OPTIONS.map((opt) => (
                        <button
                          key={opt.label}
                          className={`${styles.sizeBtn} ${deliveryTime === opt.label ? styles.sizeBtnActive : ""}`}
                          onClick={() => setDeliveryTime(opt.label)}
                        >
                          {opt.label}
                          <span className={styles.upcharge}>{opt.sublabel}</span>
                        </button>
                      ))}
                    </div>

                    {deliveryTime === "Custom" && (
                      <input
                        className={styles.input}
                        style={{ marginTop: "0.75rem" }}
                        type="time"
                        value={customTime}
                        onChange={(e) => setCustomTime(e.target.value)}
                      />
                    )}

                    <p className={styles.gcashNote} style={{ marginTop: "0.5rem" }}>
                      {deliveryTime === "ASAP"
                        ? "Estimated delivery: 25–35 min. Delivery fee may apply. 🛵"
                        : deliveryTime === "Custom"
                        ? "We'll have your order ready at your chosen time. 🛵"
                        : `Your order will arrive in approximately ${deliveryTime}. 🛵`}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className={styles.footer}>
              <button
                className={styles.primaryBtn}
                disabled={!isFulfillmentValid}
                onClick={() => setStep("order")}
              >
                Continue to Order →
              </button>
            </div>
          </>
        )}

        {/* ── Step: ORDER ── */}
        {step === "order" && (
          <>
            <div className={styles.header}>
              <div className={styles.drinkThumb}>
                <img src={drink.image} alt={drink.name} />
              </div>
              <div className={styles.headerText}>
                <p className={styles.eyebrow}>Your Order</p>
                <h2 className={styles.drinkName}>{drink.name}</h2>
                <p className={styles.drinkBase}>{drink.price}</p>
              </div>
              <button className={styles.close} onClick={onClose}>
                ✕
              </button>
            </div>

            <div className={styles.body}>
              {/* Size */}
              <div className={styles.field}>
                <label className={styles.label}>Size</label>
                <div className={styles.sizeRow}>
                  {SIZE_OPTIONS.map((s) => (
                    <button
                      key={s}
                      className={`${styles.sizeBtn} ${size === s ? styles.sizeBtnActive : ""}`}
                      onClick={() => setSize(s)}
                    >
                      {s}
                      {SIZE_UPCHARGE[s] > 0 && (
                        <span className={styles.upcharge}>
                          +${SIZE_UPCHARGE[s].toFixed(2)}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Qty */}
              <div className={styles.field}>
                <label className={styles.label}>Quantity</label>
                <div className={styles.qtyRow}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    −
                  </button>
                  <span className={styles.qtyNum}>{qty}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => setQty((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add-ons */}
              <div className={styles.field}>
                <label className={styles.label}>Add-ons</label>
                <div className={styles.addonsGrid}>
                  {ADDONS.map((a) => (
                    <button
                      key={a.label}
                      className={`${styles.addonBtn} ${addons.includes(a.label) ? styles.addonActive : ""}`}
                      onClick={() => toggleAddon(a.label)}
                    >
                      <span>{a.label}</span>
                      <span className={styles.addonPrice}>
                        +${a.price.toFixed(2)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className={styles.field}>
                <label className={styles.label}>Special Instructions</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Less ice, extra hot, no sugar..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                />
              </div>
            </div>

            {/* Summary bar */}
            <div className={styles.footer}>
              <div className={styles.summaryLine}>
                <span>
                  {qty}x {size} {drink.name}
                </span>
                <span className={styles.totalAmt}>${total.toFixed(2)}</span>
              </div>
              <p className={styles.taxNote}>Incl. 12% VAT</p>
              <div className={styles.btnRow}>
                <button
                  className={styles.backBtn}
                  onClick={() => setStep("fulfillment")}
                >
                  ← Back
                </button>
                <button
                  className={styles.primaryBtn}
                  onClick={() => setStep("payment")}
                >
                  Proceed to Payment →
                </button>
              </div>
            </div>
          </>
        )}

        {/* ── Step: PAYMENT ── */}
        {step === "payment" && (
          <>
            <div className={styles.header}>
              <div className={styles.headerText} style={{ paddingLeft: 0 }}>
                <p className={styles.eyebrow}>Payment Details</p>
                <h2 className={styles.drinkName}>Complete your order</h2>
              </div>
              <button className={styles.close} onClick={onClose}>
                ✕
              </button>
            </div>

            <div className={styles.body}>
              {/* Order mini summary */}
              <div className={styles.miniSummary}>
                <img
                  src={drink.image}
                  alt={drink.name}
                  className={styles.miniThumb}
                />
                <div>
                  <p className={styles.miniName}>
                    {qty}× {size} {drink.name}
                  </p>
                  {addons.length > 0 && (
                    <p className={styles.miniAddons}>{addons.join(", ")}</p>
                  )}
                </div>
                <span className={styles.miniPrice}>${total.toFixed(2)}</span>
              </div>

              {/* Contact */}
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Full Name</label>
                  <input
                    className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                    placeholder="Juan dela Cruz"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && (
                    <span className={styles.errMsg}>{errors.name}</span>
                  )}
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Email</label>
                  <input
                    className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                    placeholder="juan@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <span className={styles.errMsg}>{errors.email}</span>
                  )}
                </div>
              </div>

              {/* Method */}
              <div className={styles.field}>
                <label className={styles.label}>Payment Method</label>
                <div className={styles.methodRow}>
                  {(["card", "cash"] as const).map((m) => (
                    <button
                      key={m}
                      className={`${styles.methodBtn} ${method === m ? styles.methodActive : ""}`}
                      onClick={() => setMethod(m)}
                    >
                      {m === "card" && "💳 Online Payment"}
                      {m === "cash" && "💵 Cash"}
                    </button>
                  ))}
                </div>
              </div>

              {method === "card" && (
                <>
                  <div className={styles.field}>
                    <label className={styles.label}>Card Number</label>
                    <input
                      className={`${styles.input} ${errors.card ? styles.inputError : ""}`}
                      placeholder="1234 5678 9012 3456"
                      value={card}
                      onChange={(e) => setCard(formatCard(e.target.value))}
                    />
                    {errors.card && (
                      <span className={styles.errMsg}>{errors.card}</span>
                    )}
                  </div>
                  <div className={styles.fieldRow}>
                    <div className={styles.field}>
                      <label className={styles.label}>Expiry</label>
                      <input
                        className={`${styles.input} ${errors.expiry ? styles.inputError : ""}`}
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) =>
                          setExpiry(formatExpiry(e.target.value))
                        }
                      />
                      {errors.expiry && (
                        <span className={styles.errMsg}>{errors.expiry}</span>
                      )}
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>CVV</label>
                      <input
                        className={`${styles.input} ${errors.cvv ? styles.inputError : ""}`}
                        placeholder="123"
                        maxLength={3}
                        value={cvv}
                        onChange={(e) =>
                          setCvv(e.target.value.replace(/\D/g, ""))
                        }
                      />
                      {errors.cvv && (
                        <span className={styles.errMsg}>{errors.cvv}</span>
                      )}
                    </div>
                  </div>
                </>
              )}

              {method === "cash" && (
                <div className={styles.gcashInfo}>
                  <p>
                    💵 Pay <strong>₱{(total * 58).toFixed(2)}</strong> at the
                    counter
                  </p>
                  <p className={styles.gcashNote}>
                    Show your receipt upon claiming. Please prepare exact change
                    if possible. ☕
                  </p>
                </div>
              )}
            </div>

            <div className={styles.footer}>
              <div className={styles.summaryLine}>
                <span>Total</span>
                <span className={styles.totalAmt}>${total.toFixed(2)}</span>
              </div>
              <div className={styles.btnRow}>
                <button
                  className={styles.backBtn}
                  onClick={() => setStep("order")}
                >
                  ← Back
                </button>
                <button className={styles.primaryBtn} onClick={handlePaySubmit}>
                  Place Order ☕
                </button>
              </div>
            </div>
          </>
        )}

        {/* ── Step: RECEIPT ── */}
        {step === "receipt" && (
          <>
            <div className={styles.receiptHeader}>
              <div className={styles.checkCircle}>✓</div>
              <h2 className={styles.receiptTitle}>Order Placed!</h2>
              <p className={styles.receiptSub}>
                Your brew is being prepared with love.
              </p>
            </div>

            <div className={styles.receipt}>
              <div className={styles.receiptTop}>
                <p className={styles.receiptBrand}>☕ Black Bean</p>
                <p className={styles.receiptId}>{orderId}</p>
                <p className={styles.receiptDate}>{orderTime}</p>
              </div>

              <div className={styles.receiptDivider} />

              <div className={styles.receiptItem}>
                <div className={styles.receiptItemLeft}>
                  <p className={styles.receiptItemName}>{drink.name}</p>
                  <p className={styles.receiptItemMeta}>
                    {size} · Qty {qty}
                    {addons.length > 0 && " · " + addons.join(", ")}
                  </p>
                  {notes && <p className={styles.receiptNote}>Note: {notes}</p>}
                </div>
                <p className={styles.receiptItemPrice}>
                  ${(unitPrice * qty).toFixed(2)}
                </p>
              </div>

              <div className={styles.receiptDivider} />

              <div className={styles.receiptRow}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.receiptRow}>
                <span>VAT (12%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className={`${styles.receiptRow} ${styles.receiptTotal}`}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className={styles.receiptDivider} />

              <div className={styles.receiptRow}>
                <span>Name</span>
                <span>{name}</span>
              </div>
              <div className={styles.receiptRow}>
                <span>Payment</span>
                <span style={{ textTransform: "capitalize" }}>{method}</span>
              </div>
              <div className={styles.receiptRow}>
                <span>Order type</span>
                <span>{fulfillment === "dine-in" ? "Dine In" : "Delivery"}</span>
              </div>
              {fulfillment === "delivery" && (
                <>
                  <div className={styles.receiptRow}>
                    <span>Address</span>
                    <span>{deliveryAddress}</span>
                  </div>
                  <div className={styles.receiptRow}>
                    <span>Deliver by</span>
                    <span>{displayDeliveryTime}</span>
                  </div>
                </>
              )}

              <div className={styles.receiptBarcode}>
                ▐██▌▐█▌▐▌▐██▐█▌▐██▌▐██▌
              </div>
              <p className={styles.receiptBarcodeLabel}>
                Scan at counter to claim
              </p>
            </div>

            <div className={styles.footer}>
              <button className={styles.primaryBtn} onClick={onClose}>
                Done
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}