import { LEVEL_THEMES, PLACEMENT_TYPE_FLOUR, PLACEMENT_TYPE_GOAL, PLACEMENT_TYPE_HERO, PLACEMENT_TYPE_WALL, PLACEMENT_TYPE_KEY, PLACEMENT_TYPE_LOCK, PLACEMENT_TYPE_WATER, PLACEMENT_TYPE_WATER_PICKUP, PLACEMENT_TYPE_GROUND_ENEMY, PLACEMENT_TYPE_FLYING_ENEMY, PLACEMENT_TYPE_ROAMING_ENEMY, PLACEMENT_TYPE_CONVEYOR, PLACEMENT_TYPE_ICE_PICKUP, PLACEMENT_TYPE_ICE, PLACEMENT_TYPE_FIRE, PLACEMENT_TYPE_FIRE_PICKUP, PLACEMENT_TYPE_SWITCH_DOOR, PLACEMENT_TYPE_SWITCH, PLACEMENT_TYPE_TELEPORT, PLACEMENT_TYPE_THIEF, PLACEMENT_TYPE_CIABATTA } from "../helpers/consts";

const level = {
    theme: LEVEL_THEMES.PINK,
    tilesWidth: 8,
    tilesHeight: 9,
    placements: [
        { x: 2, y: 5, type: PLACEMENT_TYPE_HERO },
        { x: 7, y: 5, type: PLACEMENT_TYPE_GOAL },
        { x: 5, y: 3, type: PLACEMENT_TYPE_FLOUR },
        { x: 8, y: 9, type: PLACEMENT_TYPE_FLOUR },

        // conveyors
        { x: 2, y: 4, type: PLACEMENT_TYPE_CONVEYOR,  direction: "UP" },
        { x: 2, y: 6, type: PLACEMENT_TYPE_CONVEYOR,  direction: "DOWN" },
        { x: 1, y: 4, type: PLACEMENT_TYPE_CONVEYOR,  direction: "UP" },
        { x: 1, y: 5, type: PLACEMENT_TYPE_CONVEYOR,  direction: "UP" },
        { x: 1, y: 6, type: PLACEMENT_TYPE_CONVEYOR,  direction: "UP" },
        { x: 3, y: 4, type: PLACEMENT_TYPE_CONVEYOR,  direction: "RIGHT" },
        { x: 3, y: 6, type: PLACEMENT_TYPE_CONVEYOR,  direction: "RIGHT" },
        { x: 3, y: 7, type: PLACEMENT_TYPE_CONVEYOR,  direction: "RIGHT" },
        { x: 3, y: 8, type: PLACEMENT_TYPE_CONVEYOR,  direction: "RIGHT" },
        { x: 3, y: 2, type: PLACEMENT_TYPE_CONVEYOR,  direction: "RIGHT" },
        { x: 3, y: 3, type: PLACEMENT_TYPE_CONVEYOR,  direction: "RIGHT" },

        // walls
        { x: 3, y: 5, type: PLACEMENT_TYPE_WALL },
        { x: 4, y: 5, type: PLACEMENT_TYPE_WALL },
        { x: 5, y: 5, type: PLACEMENT_TYPE_WALL },
        { x: 6, y: 5, type: PLACEMENT_TYPE_WALL },
        { x: 7, y: 6, type: PLACEMENT_TYPE_WALL },
        { x: 7, y: 7, type: PLACEMENT_TYPE_WALL },
        { x: 7, y: 8, type: PLACEMENT_TYPE_WALL },
        { x: 7, y: 9, type: PLACEMENT_TYPE_WALL },
        { x: 6, y: 3, type: PLACEMENT_TYPE_WALL },
        { x: 1, y: 1, type: PLACEMENT_TYPE_WALL },
        { x: 2, y: 1, type: PLACEMENT_TYPE_WALL },
        { x: 3, y: 1, type: PLACEMENT_TYPE_WALL },
        { x: 6, y: 1, type: PLACEMENT_TYPE_WALL },
        { x: 7, y: 1, type: PLACEMENT_TYPE_WALL },
        { x: 8, y: 1, type: PLACEMENT_TYPE_WALL },

        // button
        { x: 3, y: 9, type: PLACEMENT_TYPE_SWITCH_DOOR, isRaised: true },
        { x: 6, y: 9, type: PLACEMENT_TYPE_SWITCH },

        // teleports
        { x: 6, y: 6, type: PLACEMENT_TYPE_TELEPORT },
        { x: 4, y: 8, type: PLACEMENT_TYPE_TELEPORT },

        // water
        { x: 3, y: 6, type: PLACEMENT_TYPE_WATER_PICKUP },
        { x: 4, y: 4, type: PLACEMENT_TYPE_WATER },
        { x: 4, y: 4, type: PLACEMENT_TYPE_WATER },
        { x: 5, y: 1, type: PLACEMENT_TYPE_WATER },

        // ice
        { x: 3, y: 4, type: PLACEMENT_TYPE_ICE_PICKUP },
        { x: 4, y: 3, type: PLACEMENT_TYPE_ICE },
        { x: 5, y: 3, type: PLACEMENT_TYPE_ICE },
        { x: 4, y: 2, type: PLACEMENT_TYPE_ICE },
        { x: 5, y: 2, type: PLACEMENT_TYPE_ICE },
        { x: 6, y: 2, type: PLACEMENT_TYPE_ICE },
        { x: 7, y: 2, type: PLACEMENT_TYPE_ICE, corner: "TOP_RIGHT" },
        { x: 7, y: 3, type: PLACEMENT_TYPE_ICE },
        { x: 7, y: 4, type: PLACEMENT_TYPE_ICE, corner: "BOTTOM_RIGHT" },
        { x: 6, y: 4, type: PLACEMENT_TYPE_ICE },
        { x: 5, y: 4, type: PLACEMENT_TYPE_ICE },
        { x: 4, y: 1, type: PLACEMENT_TYPE_ICE },

        // locks
        { x: 8, y: 3, type: PLACEMENT_TYPE_KEY, color: "GREEN" },
        { x: 8, y: 5, type: PLACEMENT_TYPE_LOCK, color: "GREEN" },

        //enemy
        { x: 4, y: 6, type: PLACEMENT_TYPE_GROUND_ENEMY, initialDirection: "UP" },
        { x: 4, y: 2, type: PLACEMENT_TYPE_GROUND_ENEMY, initialDirection: "UP" },
    ],
};

export default level;