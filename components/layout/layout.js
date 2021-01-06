import styles from "./layout.module.css";

function layout({ children }) {
	return <div className={styles.container}>{children}</div>;
}

export default layout;
