import { LEVEL_THEMES, PLACEMENT_TYPE_FLOUR, PLACEMENT_TYPE_GOAL, PLACEMENT_TYPE_HERO, PLACEMENT_TYPE_WALL, PLACEMENT_TYPE_KEY, PLACEMENT_TYPE_LOCK, PLACEMENT_TYPE_WATER, PLACEMENT_TYPE_WATER_PICKUP, PLACEMENT_TYPE_GROUND_ENEMY, PLACEMENT_TYPE_FLYING_ENEMY, PLACEMENT_TYPE_ROAMING_ENEMY, PLACEMENT_TYPE_CONVEYOR, PLACEMENT_TYPE_ICE_PICKUP, PLACEMENT_TYPE_ICE, PLACEMENT_TYPE_FIRE, PLACEMENT_TYPE_FIRE_PICKUP, PLACEMENT_TYPE_SWITCH_DOOR, PLACEMENT_TYPE_SWITCH, PLACEMENT_TYPE_TELEPORT, PLACEMENT_TYPE_THIEF, PLACEMENT_TYPE_CIABATTA } from "../helpers/consts";

const level = {
    theme: LEVEL_THEMES.PINK,
    tilesWidth: 4,
    tilesHeight: 5,
    placements: [
        { x: 1, y: 4, type: PLACEMENT_TYPE_HERO },
        { x: 1, y: 2, type: PLACEMENT_TYPE_GOAL },
        { x: 4, y: 3, type: PLACEMENT_TYPE_FLOUR },

        { x: 2, y: 1, type: PLACEMENT_TYPE_WALL },
        { x: 2, y: 2, type: PLACEMENT_TYPE_WALL },
        { x: 2, y: 3, type: PLACEMENT_TYPE_WALL },
        { x: 1, y: 3, type: PLACEMENT_TYPE_WALL },
        { x: 2, y: 4, type: PLACEMENT_TYPE_WALL },
        { x: 2, y: 5, type: PLACEMENT_TYPE_WALL },

        { x: 1, y: 5, type: PLACEMENT_TYPE_TELEPORT },
        { x: 4, y: 1, type: PLACEMENT_TYPE_TELEPORT },
        { x: 4, y: 5, type: PLACEMENT_TYPE_TELEPORT },
        { x: 1, y: 1, type: PLACEMENT_TYPE_TELEPORT },
    ],
};

export default level;