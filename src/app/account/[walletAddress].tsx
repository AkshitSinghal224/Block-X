import { useContract, useContractEvents } from "@thirdweb-dev/react";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { CONTRACT_ADDRESS } from "../../constants/addresses";
import EventCard from "../../components/eventCard";
import { useEffect, useState } from "react";
import LoadingIcons from "react-loading-icons";

export default function AcountFeed() {
  const router = useRouter();
  const { walletAddress } = router.query;

  const [isLoading, setIsLoading] = useState(true);

  const { contract } = useContract(CONTRACT_ADDRESS);

  const { data: userEvents, isLoading: isUserEventsLoading } =
    useContractEvents(contract, "BlocUpdated", {
      subscribe: true,
      queryFilter: {
        filters: {
          user: walletAddress,
        },
      },
    });

  useEffect(() => {
    // Set a timeout for 2 seconds
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

  return (
    <div className={styles.container} style={{ maxWidth: "500px" }}>
      <button onClick={() => router.push("/")} className={styles.updateButton}>
        Back
      </button>
      <h1>Account Feed</h1>
      <p style={{ fontSize: "0.75rem" }}>{walletAddress}</p>
      <h3>Latest Updates:</h3>
      {!isUserEventsLoading &&
        userEvents &&
        userEvents
          .slice(0, 20)
          .map((event, index) => (
            <EventCard
              key={index}
              walletAddress={event.data.user}
              newBloc={event.data.Bloc}
              timeStamp={event.data.timestamp}
              uniqueId={event.data.uniqueId}
            />
          ))}
    </div>
  );
}
