import { TILES } from "../../helpers/tiles";
import Sprite from "./Sprite";
import styles from "./Hero.module.css";

interface HeroProps {
    frameCoord: string;
    yTranslate: number;
    showShadow: boolean;
}

export default function Hero({ frameCoord, yTranslate, showShadow }: HeroProps) {
    return (
        <div className={styles.hero}>
            <div>
                {showShadow && <Sprite frameCoord={TILES.SHADOW} />} 
            </div>
            <div className={styles.heroBody} style={{ transform: `translateY(${yTranslate}px)` }}>
                <Sprite frameCoord={frameCoord} size={32} />
            </div>
        </div>
    );
};

