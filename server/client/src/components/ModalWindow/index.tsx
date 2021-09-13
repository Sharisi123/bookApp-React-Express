import React from "react";
import styles from "./styles.module.scss";
import ReactDOM from "react-dom";
const ModalWindow = (props: any) => {
  return (
    <>
      {props.visible ? (
        <>
          {ReactDOM.createPortal(
            <>
              <div className={styles.modalMask} onClick={props.onCancel}>
                <div
                  className={styles.modalWindow}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                      <h2>{props.title}</h2>
                      <span onClick={props.onCancel}>X</span>
                    </div>
                    {props.children}
                  </div>
                </div>
              </div>
            </>,
            // @ts-ignore
            document.getElementById("root")
          )}
        </>
      ) : null}
    </>
  );
};

export default ModalWindow;
