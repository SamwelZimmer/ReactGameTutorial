import { LEVEL_THEMES, PLACEMENT_TYPE_FLOUR, PLACEMENT_TYPE_GOAL, PLACEMENT_TYPE_HERO, PLACEMENT_TYPE_WALL, PLACEMENT_TYPE_KEY, PLACEMENT_TYPE_LOCK, PLACEMENT_TYPE_WATER, PLACEMENT_TYPE_WATER_PICKUP, PLACEMENT_TYPE_GROUND_ENEMY, PLACEMENT_TYPE_FLYING_ENEMY, PLACEMENT_TYPE_ROAMING_ENEMY, PLACEMENT_TYPE_CONVEYOR, PLACEMENT_TYPE_ICE_PICKUP, PLACEMENT_TYPE_ICE, PLACEMENT_TYPE_FIRE, PLACEMENT_TYPE_FIRE_PICKUP, PLACEMENT_TYPE_SWITCH_DOOR, PLACEMENT_TYPE_SWITCH, PLACEMENT_TYPE_TELEPORT, PLACEMENT_TYPE_THIEF, PLACEMENT_TYPE_CIABATTA } from "../helpers/consts";

const level = {
    theme: LEVEL_THEMES.BLUE,
    tilesWidth: 7,
    tilesHeight: 7,
    placements: [
        { x: 4, y: 4, type: PLACEMENT_TYPE_HERO },
        { x: 2, y: 6, type: PLACEMENT_TYPE_GOAL },
        { x: 7, y: 3, type: PLACEMENT_TYPE_FLOUR },

        // walls
        { x: 7, y: 2, type: PLACEMENT_TYPE_WALL },
        { x: 1, y: 6, type: PLACEMENT_TYPE_WALL },
        { x: 2, y: 7, type: PLACEMENT_TYPE_WALL },

        // fire
        { x: 6, y: 2, type: PLACEMENT_TYPE_FIRE_PICKUP },
        { x: 3, y: 2, type: PLACEMENT_TYPE_FIRE },
        { x: 4, y: 2, type: PLACEMENT_TYPE_FIRE },
        { x: 5, y: 2, type: PLACEMENT_TYPE_FIRE },
        { x: 2, y: 3, type: PLACEMENT_TYPE_FIRE },
        { x: 2, y: 4, type: PLACEMENT_TYPE_FIRE },
        { x: 2, y: 5, type: PLACEMENT_TYPE_FIRE },
        { x: 3, y: 6, type: PLACEMENT_TYPE_FIRE },
        { x: 4, y: 6, type: PLACEMENT_TYPE_FIRE },
        { x: 5, y: 6, type: PLACEMENT_TYPE_FIRE },
        { x: 6, y: 3, type: PLACEMENT_TYPE_FIRE },
        { x: 6, y: 4, type: PLACEMENT_TYPE_FIRE },
        { x: 6, y: 5, type: PLACEMENT_TYPE_FIRE },

        // teleports
        { x: 3, y: 3, type: PLACEMENT_TYPE_TELEPORT },
        { x: 2, y: 2, type: PLACEMENT_TYPE_TELEPORT },
        { x: 5, y: 5, type: PLACEMENT_TYPE_TELEPORT },
        { x: 6, y: 6, type: PLACEMENT_TYPE_TELEPORT },

        // locks
        { x: 3, y: 7, type: PLACEMENT_TYPE_KEY, color: "BLUE" },
        { x: 6, y: 1, type: PLACEMENT_TYPE_LOCK, color: "BLUE" },

        // buttons
        { x: 1, y: 5, type: PLACEMENT_TYPE_SWITCH, color: "BLUE" },
        { x: 4, y: 7, type: PLACEMENT_TYPE_SWITCH_DOOR, isRaised: false },
        { x: 7, y: 4, type: PLACEMENT_TYPE_SWITCH_DOOR, isRaised: true },

        // //enemy
        { x: 1, y: 3, type: PLACEMENT_TYPE_FLYING_ENEMY, initialDirection: "RIGHT" },
        { x: 3, y: 1, type: PLACEMENT_TYPE_FLYING_ENEMY, initialDirection: "UP" },
    ],
};

export default level;