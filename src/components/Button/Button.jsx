import styles from "./Button.module.css";

function Button({ children, type }) {
  return <div className={styles.btn}>{children}</div>;
}

export default Button;
