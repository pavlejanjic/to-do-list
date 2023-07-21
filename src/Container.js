import React from "react";
import styles from "./Container.module.css";

function Container(props) {
  return (
    <div className={`${styles["container-general"]} ${props.className}`}>
      {props.children}
    </div>
  );
}

export default Container;
