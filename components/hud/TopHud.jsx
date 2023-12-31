import styles from "./TopHud.module.css";
import FlourCount from "./FlourCount";
import ClockCount from "./ClockCount";
import InventoryList from "./InventoryList";

export default function TopHud({ level }) {
    return (
        <div className={styles.topHud}>
            <div className={styles.topHudLeft}>
                <FlourCount level={level} />
                <ClockCount level={level} />
                <InventoryList level={level} />
            </div>
            <div className={styles.topHudRight}>

            </div>
        </div>
    );
}