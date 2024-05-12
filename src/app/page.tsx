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
          src="https://i.postimg.cc/C5QvbFFL/block-x.png"
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
