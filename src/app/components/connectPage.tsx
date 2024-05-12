import React from "react";
import styles from "../page.module.css";
import { ConnectButton } from "thirdweb/react";
import { client } from "../utils/client";
import { createWallet } from "thirdweb/wallets";
import Image from "next/image";
// import { ConnectWallet } from "@thirdweb/react";

export default function ConnectPage() {

  const supportedWallets = [
    createWallet("io.metamask"),
    createWallet("com.binance"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("com.trustwallet.app"),
    createWallet("org.uniswap"),
  ];

  return (
    <main className={styles.horizontalMain}>
      <div className={styles.imgContainer} style={{ alignItems: "center" }}>
        <div>
          <img
            className={styles.authLogo}
            src="https://i.postimg.cc/C5QvbFFL/block-x.png"
          />
        </div>
      </div>
      <div className={styles.centerContainer}>
        <span>
          <h1 className={styles.mainHeading}>Happening now!</h1>
        </span>
        <span>
          <h3 className={styles.subHeading}>Join today.</h3>
        </span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              borderEndEndRadius: "40px",
              borderEndStartRadius: "40px",
              borderStartStartRadius: "40px",
              borderStartEndRadius: "40px",
              width: "20vw",
              marginBottom: "0.5rem",
            }}
          >
            <ConnectButton
              wallets={supportedWallets}
              autoConnect={{ timeout: 5000 }}
              client={client}
            />
          </div>
          <span style={{ fontSize: "0.6rem" }}>
            By signing up, you agree to the
            <span style={{ color: "#1C9BEF" }}>{` Terms of Service`}</span> and
            <span style={{ color: "#1C9BEF" }}>{` Privacy Policy`}</span>,
            <br /> including{" "}
            <span style={{ color: "#1C9BEF" }}>{`Cookie Use`}</span> .
          </span>
        </div>
      </div>
      <div className={styles.authFooter}>
        <h6 style={{ color: "#71767A" }}>About</h6>
        <h6 style={{ color: "#71767A" }}>Terms of Service</h6>
        <h6 style={{ color: "#71767A" }}>Privacy Policy</h6>
        <h6 style={{ color: "#71767A" }}>Cookie Policy</h6>
        <h6 style={{ color: "#71767A" }}>© 2024 Block-X Corp.</h6>
      </div>
    </main>
  );
}
