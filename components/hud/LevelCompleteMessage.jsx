import { useRecoilState } from "recoil";
import { currentLevelIdAtom } from "../../atoms/currentLevelIdAtom";
import Levels from "../../levels/LevelsMap";
import styles from "./PopupMessage.module.css";
import LevelCompleteSvg from "../object-graphics/LevelCompletedSvg";
import { useKeyPress } from "../../hooks/useKeyPress";

export default function LevelCompleteMessage() {
  const [currentLevelId, setCurrentLevelId] = useRecoilState(currentLevelIdAtom);

  const handleClick = () => {
    const levelsArray = Object.keys(Levels);
    const currentIndex = levelsArray.findIndex((id) => {
      return id === currentLevelId;
    });
    const nextLevelId = levelsArray[currentIndex + 1] ?? levelsArray[0];

    setCurrentLevelId(nextLevelId);
  }

  useKeyPress("Enter", () => {
    handleClick();
  });

  return (
    <div className={styles.outerContainer}>
      <div className={styles.popupContainer}>
        <button className={styles.quietButton} onClick={handleClick}>
          <LevelCompleteSvg />
        </button>
      </div>
    </div>
  );
}