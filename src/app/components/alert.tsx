import React from "react";
import { IoClose } from "react-icons/io5";
import styles from "../page.module.css";

interface AlertProps {
  show: boolean;
  text: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ show, text, onClose }) => {
  if (!show) return null; // If show is false, don't render anything

  return (
    <div className={styles.statusModalContainer}>
      <div className={styles.statusModal}>
        <div className={styles.alertModalHeader}>
          <p>{text}</p>
        </div>
        <button className={styles.alertModalButton} onClick={onClose}>
          Ok
        </button>
      </div>
    </div>
  );
};

export default Alert;
