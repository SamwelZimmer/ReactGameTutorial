import { TILES } from "../../helpers/tiles";
import Sprite from "./Sprite";
import styles from "./Hero.module.css";

interface HeroProps {
    frameCoord: string;
    yTranslate: number;
}

export default function Hero({ frameCoord, yTranslate }: HeroProps) {
    return (
        <div className={styles.hero}>
            <div>
                <Sprite frameCoord={TILES.SHADOW}></Sprite>
            </div>
            <div className={styles.heroBody} style={{ transform: `translateY(${yTranslate}px)` }}>
                <Sprite frameCoord={frameCoord} size={32} ></Sprite>
            </div>
        </div>
    );
};

