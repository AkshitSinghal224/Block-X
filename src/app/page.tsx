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
  console.log(account);

  useEffect(() => {
    // Set a timeout for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0);

    // Cleanup the timer when the component is unmounted
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
    <main className={styles.main} style={{position:'relative'}}>
      <div>
        <img
          className={styles.authLogoHomePage}
          src="https://media.discordapp.net/attachments/1182683580225290311/1235326561041907732/block-x.png?ex=6633f703&is=6632a583&hm=b4e56ceefba48b3875d9094a3556c53b7ef44f2fb012708223417abd4e6b8a8e&=&format=webp&quality=lossless&width=700&height=700"
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
