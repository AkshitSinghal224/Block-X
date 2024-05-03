import { useContract, useContractEvents } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../constants/addresses";
import EventCard from "./eventCard";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import LoadingIcons from "react-loading-icons";

export default function BlocEvents() {
  const [isLoading, setIsLoading] = useState(true);
  const [deletedBlocs, setDeletedBlocs] = useState<any>([]);
  const { contract } = useContract(CONTRACT_ADDRESS);

  const { data: blocUpdatedEvents, isLoading: isBlocUpdatedEventsLoading } =
    useContractEvents(contract, "BlocUpdated", { subscribe: true });

  const { data: blocDeletedEvents, isLoading: isBlocDeletedEventsLoading } =
    useContractEvents(contract, "BlocDeleted", { subscribe: true });

  useEffect(() => {
    // Set a timeout for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0);

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Extract deleted blocs from blocDeletedEvents
    if (blocDeletedEvents && !isBlocDeletedEventsLoading) {
      const deletedIds = blocDeletedEvents.map((event) => event.data.uniqueId);
      setDeletedBlocs(deletedIds);
    }
  }, [blocDeletedEvents, isBlocDeletedEventsLoading]);

  if (isLoading) {
    return (
      <div className={styles.sectionLoading}>
        <LoadingIcons.Puff />
      </div>
    );
  }

  const filteredBlocs = blocUpdatedEvents?.filter(
    (event) => !deletedBlocs.includes(event.data.uniqueId)
  );

  return (
    <div>
      {!isBlocUpdatedEventsLoading &&
        filteredBlocs &&
        filteredBlocs
          .slice(0, 30)
          .map((event, index) => (
            <EventCard
              key={index}
              walletAddress={event.data.user}
              newBloc={event.data.Bloc}
              uniqueId={event.data.uniqueId}
              timeStamp={event.data.timestamp}
            />
          ))}
    </div>
  );
}
