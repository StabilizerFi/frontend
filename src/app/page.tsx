import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.info}>
        <div className={styles.header}>
      <p className={styles.headerText}>A decentralized&nbsp;</p>
      <p className={`${styles.headerText} ${styles.accentText}`}>stablecoin&nbsp;</p>
      <p className={styles.headerText}>protocol</p>
      </div>
      <p className={styles.description}>No banks, no freezing assets, no sketchy bridges, just stability.</p>
      <Link href="/dashboard">
      <div className={styles.button}>Join Us</div>
      </Link>
      <Link href="/whitepaper">
      <div className={styles.buttonNoBackground}>Read Whitepaper {"—>"}</div>
      </Link>
      </div>
      <div className={styles.info}>
        <div className={styles.header}>
      <p className={styles.headerText}>Redeem your coins&nbsp;</p>
      <p className={`${styles.headerText} ${styles.accentText}`}>anytime&nbsp;</p>
      <p className={styles.headerText}>for face value</p>
      </div>
      <p className={styles.description}>Don't worry about the price crashing. You'll always be able to sell for face value.</p>
      </div>
      <div className={styles.info}>
        <div className={styles.header}>
      <p className={styles.headerText}>Loan out&nbsp;</p>
      <p className={`${styles.headerText} ${styles.accentText}`}>stables&nbsp;</p>
      <p className={styles.headerText}>with low collateral</p>
      </div>
      <p className={styles.description}>Don't worry about the price going to high, you can always buy through a loan.</p>
      </div>
      <div className={styles.info}>
        <div className={styles.header}>
      <p className={styles.headerText}>Fixed&nbsp;</p>
      <p className={`${styles.headerText} ${styles.accentText}`}>low fees&nbsp;</p>
      <p className={styles.headerText}>on loans</p>
      </div>
      <p className={styles.description}>Once you take out a loan the closing fee will never change.</p>
      </div>
      <div className={styles.info}>
        <div className={styles.header}>
      <p className={styles.headerText}>Alway be able to&nbsp;</p>
      <p className={`${styles.headerText} ${styles.accentText}`}>pay back&nbsp;</p>
      <p className={styles.headerText}>your loan</p>
      </div>
      <p className={styles.description}>With no interest loan, the amount you need to pay back never changes and you always have a grace period to cancel before fees.</p>
      </div>
      <div className={styles.info}>
        <div className={styles.header}>
      <p className={styles.headerText}>No insane&nbsp;</p>
      <p className={`${styles.headerText} ${styles.accentText}`}>fees&nbsp;</p>
      <p className={styles.headerText}>at all</p>
      </div>
      <p className={styles.description}>No fees for redeeming, no fees for opening a loan, just gains.</p>
      </div>
    </main>
  );
}
