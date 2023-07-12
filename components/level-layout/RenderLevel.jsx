import styles from './RenderLevel.module.css';
import { THEME_BACKGROUNDS } from '../../helpers/consts';
import LevelBackgroundTilesLayer from './LevelBackgroundTilesLayer';
import { useRecoilValue } from 'recoil';
import LevelPlacementsLayer from './LevelPlacementsLayer';
import { useEffect, useState } from 'react';
import { LevelState } from '../../classes/LevelState';
import TopHud from '../hud/TopHud';
import LevelCompleteMessage from '../hud/LevelCompleteMessage';
import { currentLevelIdAtom } from '../../atoms/currentLevelIdAtom';
import DeathMessage from '../hud/DeathMessage';

export default function RenderLevel() {    
    const [level, setLevel] = useState(null);
    const currentLevelId = useRecoilValue(currentLevelIdAtom);

    useEffect(() => {

        // create and subscribe to state changes
        const levelState = new LevelState(currentLevelId, (newState) => {
            setLevel(newState);
        });

        // get initial state
        setLevel(levelState.getState());

        // destroy method when component unmounts
        return () => {
            levelState.destroy();
        };

    }, [currentLevelId]);

    if (!level) return null;

    const cameraTranslate = `translate3d(${level.cameraTransformX}, ${level.cameraTransformY}, 0)`; 

    return (
        <div className={styles.fullScreenContainer} style={{ background: THEME_BACKGROUNDS[level.theme] }}>
            <div className={styles.gameScreen}>
                <div style={{ transform: cameraTranslate }}>
                    <LevelBackgroundTilesLayer level={level} />
                    <LevelPlacementsLayer level={level} />
                </div>
                { level.isCompleted && <LevelCompleteMessage /> }
                { level.deathOutcome && <DeathMessage level={level} /> }
            </div>
            <TopHud level={level} />
        </div>
    );
};