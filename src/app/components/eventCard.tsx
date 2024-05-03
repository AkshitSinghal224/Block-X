"use client";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { truncateAddress } from "../utils/truncateAddress";
import { MdDelete } from "react-icons/md";
import {
  Web3Button,
  useContract,
  useContractEvents,
} from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../constants/addresses";
import { useState } from "react";
import { RiHandCoinFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { TransactionButton } from "thirdweb/react";
import { prepareContractCall, toWei } from "thirdweb";
import { contract } from "../utils/contract";


type EventCardProps = {
  walletAddress: string;
  newBloc: string;
  timeStamp: number;
  uniqueId: string;
};

export default function EventCard(props: EventCardProps) {
  const date = new Date(props.timeStamp.toNumber() * 1000);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTipModalOpen, setIsTipModalOpen] = useState(false);
  const [tip, setTip] = useState<number>(0);

  const { contract } = useContract(CONTRACT_ADDRESS);

  const { data: TipEvents, isLoading: isTipEventsLoading } = useContractEvents(
    contract,
    "BlocTipped",
    { subscribe: true }
  );

  console.log("tip", TipEvents);
  console.log("tip", tip);

  return (
    <div className={styles.eventCard}>
      <div className={styles.eventHeader}>
        <Link
          href={`account/${props.walletAddress}`}
          style={{ color: "white" }}
        >
          <p className={styles.connectedAddress}>
            {truncateAddress(props.walletAddress)}
          </p>
        </Link>
        <p style={{ fontSize: "0.75rem" }}>{date.toLocaleString()}</p>
      </div>
      <p style={{ fontSize: "16px", marginLeft: "0.5rem" }}>{props.newBloc}</p>
      <div className={styles.eventControlsContainer}>
        <p className={styles.tipText}>2.0 bnb</p>
        <div className={styles.eventControls}>
          <button
            onClick={() => setIsTipModalOpen(true)}
            className={styles.tipButton}
          >
            <RiHandCoinFill />
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className={styles.deleteButton}
          >
            <MdDelete />
          </button>
        </div>
      </div>

      {isTipModalOpen && (
        <div className={styles.statusModalContainer}>
          <div className={styles.statusModal}>
            <span
              style={{
                alignSelf: "flex-end",
                cursor: "pointer",
                marginBottom: "0.5rem",
              }}
              onClick={() => setIsTipModalOpen(false)}
            >
              <IoClose />
            </span>
            <div className={styles.statusModalHeader}>
              <p>Set Tip Amount in BNB:</p>
              <input
                value={tip}
                type="number"
                step={0.01}
                onChange={(e) => {
                  setTip(Number(e.target.value));
                }}
                placeholder="Enter your Bloc"
              />
            </div>
            <TransactionButton
              transaction={() =>
                prepareContractCall({
                  contract: contract,
                  method: "tipBloc",
                  params: [props.walletAddress],
                  value: toWei(tip.toString()),
                })
              }
              onTransactionConfirmed={() => alert("Deposit Confirmed!")}
            >
              Deposit Funds
            </TransactionButton>
            {/* <Web3Button
              className={styles.tipModalButton}
              contractAddress={CONTRACT_ADDRESS}
              action={(contract) =>
                contract.call("tipBloc", [props.walletAddress])
              }
              onError={(error) => {
                console.error("Error:", error);
                alert(error.message || "An error occurred while posting Bloc");
              }}
            >
              Tip
            </Web3Button> */}
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className={styles.statusModalContainer}>
          <div className={styles.statusModal}>
            <span
              style={{
                alignSelf: "flex-end",
                cursor: "pointer",
                marginBottom: "0.5rem",
              }}
              onClick={() => setIsDeleteModalOpen(false)}
            >
              <IoClose />
            </span>
            <div className={styles.statusModalHeader}>
              <p>Are you sure?</p>
            </div>
            <Web3Button
              className={styles.deleteModalButton}
              style={{ color: "#ee6262 !important" }}
              contractAddress={CONTRACT_ADDRESS}
              action={(contract) =>
                contract.call("deleteBloc", [props.uniqueId])
              }
              onError={(error) => {
                console.error("Error:", error);
                alert(error.message || "An error occurred while posting Bloc");
              }}
            >
              Delete
            </Web3Button>
          </div>
        </div>
      )}
    </div>
  );
}
