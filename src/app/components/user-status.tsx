"use client";
import { useState } from "react";
import styles from "../page.module.css";
import { truncateAddress } from "../utils/truncateAddress";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import {
  ConnectButton,
  TransactionButton,
  useActiveAccount,
} from "thirdweb/react";
import { client } from "../utils/client";
import { chain } from "../utils/chain";
import { prepareContractCall } from "thirdweb";
import { contract } from "../utils/contract";


export default function UserStatus() {
  const account = useActiveAccount();
  const [newBloc, setNewBloc] = useState("");
  const [isBlocModalOpen, setIsBlocModalOpen] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const characterDecoration =
    characterCount >= 140
      ? styles.characterCountOver
      : styles.characterCountUnder;

  return (
    <div className={styles.userContainer}>
      <div className={styles.statusHeader}>
        <ConnectButton client={client} chain={chain} />
        <Link href={`/account/${account?.address}`} style={{ color: "white" }}>
          <p className={styles.connectedAddress}>
            {truncateAddress(account?.address!)}
          </p>
        </Link>
      </div>

      <button
        className={styles.updateButton}
        onClick={() => setIsBlocModalOpen(true)}
      >
        Post Bloc
      </button>

      {isBlocModalOpen && (
        <div className={styles.statusModalContainer}>
          <div className={styles.statusModal}>
            <span
              style={{
                alignSelf: "flex-end",
                cursor: "pointer",
                marginBottom: "0.5rem",
              }}
              onClick={() => setIsBlocModalOpen(false)}
            >
              <IoClose />
            </span>
            <div className={styles.statusModalHeader}>
              <p>New Status:</p>
            </div>
            <textarea
              value={newBloc}
              onChange={(e) => {
                setNewBloc(e.target.value);
                setCharacterCount(e.target.value.length);
              }}
              placeholder="Enter your Bloc"
            />
            <div className={styles.characterCountContainer}>
              <p className={characterDecoration}>{characterCount}/140</p>
              {characterCount >= 140 && (
                <p className={characterDecoration}>{`Bloc is too long`}</p>
              )}
            </div>
            <TransactionButton
              className={styles.statusModalButton}
              transaction={() => {
                return prepareContractCall({
                  contract: contract,
                  method: "setBloc",
                  params: [newBloc],
                });
              }}
              onTransactionConfirmed={() => {
                setIsBlocModalOpen(false);
                setNewBloc("");
              }}
            >
              Post Bloc
            </TransactionButton>
          </div>
        </div>
      )}
    </div>
  );
}
