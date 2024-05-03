import EventCard from "./eventCard";
import styles from "../page.module.css";
import { useEffect, useState } from "react";
import LoadingIcons from "react-loading-icons";
import { useContractEvents, useReadContract } from "thirdweb/react";
import { contract } from "../utils/contract";

export default function BlocEvents() {
  const [isLoading, setIsLoading] = useState(true);
  const [UpdatedEvent, setUpdatedEvent] = useState<any>([]);

  const { data: contactEvent, refetch: refetchContractEvent } =
    useContractEvents({ contract: contract });

  useEffect(() => {
    setIsLoading(true);
    refetchContractEvent();
    filterData();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [contactEvent]);

  async function filterData() {
    const blocDeletedEvents = contactEvent?.filter(
      (event: any) => event.eventName === "BlocDeleted"
    );

    const deletedUniqueIdSet = new Set(
      blocDeletedEvents?.map((event: any) => event.args.uniqueId)
    );

    const blocUpdatedEvents = contactEvent?.filter(
      (event: any) => event.eventName === "BlocUpdated"
    );

    const filteredBlocUpdatedEvents = blocUpdatedEvents?.filter(
      (event: any) => !deletedUniqueIdSet.has(event.args.uniqueId)
    );

    setUpdatedEvent(filteredBlocUpdatedEvents);
  }

  // if (isLoading) {
  //   return (
  //     <div className={styles.sectionLoading}>
  //       <LoadingIcons.Puff />
  //     </div>
  //   );
  // }

  if (UpdatedEvent && UpdatedEvent.length == 0) {
    return <div className={styles.NoBloc}>No Bloc yet</div>;
  }

  return (
    <div>
      {UpdatedEvent &&
        [...UpdatedEvent]
          .reverse()
          .slice(0, 30)
          .map((event: any, index: number) => (
            <EventCard
              key={index}
              walletAddress={event.args?.user}
              newBloc={event.args?.Bloc}
              uniqueId={event.args?.uniqueId}
              timeStamp={event.args?.timestamp}
              showTip={true}
            />
          ))}
    </div>
  );
}
