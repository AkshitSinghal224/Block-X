"use client";
import { contract } from "@/app/utils/contract";
import styles from "../../page.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingIcons from "react-loading-icons";
import {useContractEvents, useReadContract } from "thirdweb/react";
import EventCard from "@/app/components/eventCard";

export default function AcountFeed({
  params,
}: {
  params: { walletaddress: string };
}) {
  const router = useRouter();
  const walletaddress = params.walletaddress;

  const [isLoading, setIsLoading] = useState(true);
  const [Blocs, setBlocs] = useState<any>([]);

  const { data: contactEvent, refetch: refetchContractEvent } =
    useContractEvents({ contract: contract });

    const { data: totalTipAmount } = useReadContract({
      contract: contract,
      method: "getBlocTip",
      params: [walletaddress],
    });

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

    const activeWalletblocs = filteredBlocUpdatedEvents?.filter(
      (item: any) => item.args.user === walletaddress
    );
    setBlocs(activeWalletblocs);
  }

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
      <h1>Account Address</h1>
      <p style={{ margin: "0.5rem", fontSize: "0.9rem" }}>{walletaddress}</p>
      <h1>
        {`Total Tips: `}
        {totalTipAmount ? parseFloat(totalTipAmount.toString()) / 1e18 : 0}
        <span style={{ color: "#c7992e" }}>{` BNB`}</span>
      </h1>
      <h1>All Blocs</h1>
      {Blocs &&
        Blocs.length > 0 &&
        Blocs.slice(0, 20).map((event: any, index: number) => (
          <EventCard
            key={index}
            walletAddress={event.args.user}
            newBloc={event.args.Bloc}
            timeStamp={event.args.timestamp}
            uniqueId={event.args.uniqueId}
            showTip={false}
          />
        ))}
    </div>
  );
}
