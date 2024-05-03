'use client'
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import LoadingIcons from "react-loading-icons";
import UserStatus from "./components/user-status";
import BlocEvents from "./components/blocEvents";
import { useActiveAccount } from "thirdweb/react";
import ConnectPage from "./components/connectPage";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const account = useActiveAccount();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.pageLoading}>
        <div>
          <LoadingIcons.Puff />
        </div>
      </div>
    );
  }

  if (!account) {
    return <ConnectPage />;
  }

  return (
    <main className={styles.main} style={{ position: "relative" }}>
      <div>
        <img
          className={styles.authLogoHomePage}
          src="https://media.discordapp.net/attachments/1182683580225290311/1235326561041907732/block-x.png?ex=6635f143&is=66349fc3&hm=0ab9ad2a06c2d700ab79be62636310f69f603727b3d2bd12517c6a352bcb1eba&=&format=webp&quality=lossless&width=1250&height=1250"
        />
      </div>
      <div className={styles.container}>
        <div className={styles.statusContainer}>
          <UserStatus />
        </div>
        <h3>Bloc Feed:</h3>
        <BlocEvents />
      </div>
    </main>
  );
};
