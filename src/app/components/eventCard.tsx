"use client";
import Link from "next/link";
import styles from "../page.module.css";
import { truncateAddress } from "../utils/truncateAddress";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { RiHandCoinFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import {
  TransactionButton,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import { prepareContractCall, toWei } from "thirdweb";
import { contract } from "../utils/contract";
import Alert from "./alert";

type EventCardProps = {
  walletAddress: string;
  newBloc: string;
  timeStamp: bigint;
  uniqueId: any;
  showTip: boolean;
};

export default function EventCard(props: EventCardProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTipModalOpen, setIsTipModalOpen] = useState(false);
  const [tip, setTip] = useState<number>(0);
  const account = useActiveAccount();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const convertDate = (timestamp: bigint) => {
    const timestampNumber = Number(timestamp);
    return new Date(timestampNumber * 1000).toLocaleString();
  };
  const { data: totalTipAmount } = useReadContract({
    contract: contract,
    method: "getBlocTip",
    params: [props.walletAddress],
  });

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
        <p style={{ fontSize: "0.75rem" }}>{convertDate(props.timeStamp)}</p>
      </div>
      <p
        style={{
          fontSize: "16px",
          marginLeft: "0.5rem",
          textTransform: "capitalize",
        }}
      >
        {props.newBloc}
      </p>
      <div className={styles.eventControlsContainer}>
        <p className={styles.tipText}>
          {" "}
          {totalTipAmount
            ? `${parseFloat(totalTipAmount.toString()) / 1e18} `
            : `0.00 `}
          <span style={{ color: "#c7992e" }}>BNB</span>
        </p>
        <div className={styles.eventControls}>
          {account?.address !== props.walletAddress && (
            <button
              onClick={() => setIsTipModalOpen(true)}
              className={styles.tipButton}
            >
              <RiHandCoinFill />
            </button>
          )}
          {account?.address === props.walletAddress && (
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className={styles.deleteButton}
            >
              <MdDelete />
            </button>
          )}
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
              className={styles.tipModalButton}
              transaction={() =>
                prepareContractCall({
                  contract: contract,
                  method: "tipBloc",
                  params: [props.walletAddress],
                  value: BigInt(toWei(tip.toString())),
                })
              }
              onTransactionConfirmed={() => {
                setIsTipModalOpen(false);
                setAlertMessage("Transaction Done");
                setShowAlert(true);
                setTip(0);
              }}
            >
              Send Tip
            </TransactionButton>
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
            <TransactionButton
              className={styles.deleteModalButton}
              transaction={() =>
                prepareContractCall({
                  contract: contract,
                  method: "deleteBloc",
                  params: [props.uniqueId],
                })
              }
              onTransactionConfirmed={() => {
                setIsDeleteModalOpen(false);
                setAlertMessage('Bloc Delete Successfully');
                setShowAlert(true);
              }}
            >
              Delete
            </TransactionButton>
          </div>
        </div>
      )}
      <Alert show={showAlert} text={alertMessage} onClose={handleAlertClose} />
    </div>
  );
}
