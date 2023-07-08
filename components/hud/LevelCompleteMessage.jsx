import { useRecoilState } from "recoil";
import { currentLevelIdAtom } from "../../atoms/currentLevelIdAtom";
import Levels from "../../levels/LevelsMap";

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

  return (
    <p style={{ position: "absolute", left: 0, top: 64, color: "lime" }}>
      LEVEL COMPLETE!
      <button onClick={handleClick}>
        Next Level
      </button>
    </p>
  );
}