import { CelebrationPlacement } from "../game-objects/CelebrationPlacement";
import { FlourPlacement } from "../game-objects/FlourPlacement";
import { LockPlacement } from "../game-objects/LockPlacements";
import { KeyPlacement } from "../game-objects/KeyPlacements";
import { GoalPlacement } from "../game-objects/GoalPlacement";
import { HeroPlacement } from "../game-objects/HeroPlacement";
import { WallPlacement } from "../game-objects/WallPlacement";
import { PLACEMENT_TYPE_CELEBRATION, PLACEMENT_TYPE_FLOUR, PLACEMENT_TYPE_GOAL, PLACEMENT_TYPE_HERO, PLACEMENT_TYPE_WALL, PLACEMENT_TYPE_KEY, PLACEMENT_TYPE_LOCK } from "../helpers/consts";

const placementTypeClassMap = {
    [PLACEMENT_TYPE_HERO]: HeroPlacement,
    [PLACEMENT_TYPE_GOAL]: GoalPlacement,
    [PLACEMENT_TYPE_WALL]: WallPlacement,
    [PLACEMENT_TYPE_FLOUR]: FlourPlacement,
    [PLACEMENT_TYPE_CELEBRATION]: CelebrationPlacement,
    [PLACEMENT_TYPE_KEY]: KeyPlacement,
    [PLACEMENT_TYPE_LOCK]: LockPlacement,
};

class PlacementFactory {
    createPlacement(config, level) {
        const placementClass = placementTypeClassMap[config.type];
        if (!placementClass) {
            console.warn("NO TYPE FOUND", config.type);
        };
        const instance = new placementClass(config, level);
        // make ID here
        instance.id = Math.floor(Math.random() * 999999) + 1;
        return instance;
    }
}

export const placementFactory = new PlacementFactory();