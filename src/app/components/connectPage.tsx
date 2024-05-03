import React from "react";
import styles from "../page.module.css";
import { ConnectButton } from "thirdweb/react";
import { client } from "../utils/client";
import { createWallet } from "thirdweb/wallets";
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
            src="https://media.discordapp.net/attachments/1182683580225290311/1235326561041907732/block-x.png?ex=6635f143&is=66349fc3&hm=0ab9ad2a06c2d700ab79be62636310f69f603727b3d2bd12517c6a352bcb1eba&=&format=webp&quality=lossless&width=750&height=750"
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
              autoConnect={{ timeout: 10000 }}
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
