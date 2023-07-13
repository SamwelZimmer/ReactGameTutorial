import { LEVEL_THEMES, PLACEMENT_TYPE_FLOUR, PLACEMENT_TYPE_GOAL, PLACEMENT_TYPE_HERO, PLACEMENT_TYPE_WALL, PLACEMENT_TYPE_KEY, PLACEMENT_TYPE_LOCK, PLACEMENT_TYPE_WATER, PLACEMENT_TYPE_WATER_PICKUP, PLACEMENT_TYPE_GROUND_ENEMY, PLACEMENT_TYPE_FLYING_ENEMY, PLACEMENT_TYPE_ROAMING_ENEMY, PLACEMENT_TYPE_CONVEYOR, PLACEMENT_TYPE_ICE_PICKUP, PLACEMENT_TYPE_ICE, PLACEMENT_TYPE_FIRE, PLACEMENT_TYPE_FIRE_PICKUP, PLACEMENT_TYPE_SWITCH_DOOR, PLACEMENT_TYPE_SWITCH, PLACEMENT_TYPE_TELEPORT, PLACEMENT_TYPE_THIEF, PLACEMENT_TYPE_CIABATTA } from "../helpers/consts";

const level = {
  theme: LEVEL_THEMES.BLUE,
  tilesWidth: 7,
  tilesHeight: 5,
  placements: [
    { x: 1, y: 5, type: PLACEMENT_TYPE_HERO },
    { x: 3, y: 4, type: PLACEMENT_TYPE_FLOUR },
    { x: 6, y: 2, type: PLACEMENT_TYPE_FLOUR },
    { x: 2, y: 5, type: PLACEMENT_TYPE_GOAL },
    { x: 2, y: 2, type: PLACEMENT_TYPE_WALL },
    { x: 2, y: 4, type: PLACEMENT_TYPE_WALL },

    { x: 1, y: 4, type: PLACEMENT_TYPE_CONVEYOR, direction: "UP" },
    { x: 1, y: 3, type: PLACEMENT_TYPE_CONVEYOR, direction: "UP" },
    { x: 1, y: 2, type: PLACEMENT_TYPE_CONVEYOR, direction: "UP" },
    { x: 1, y: 1, type: PLACEMENT_TYPE_CONVEYOR, direction: "RIGHT" },
    { x: 2, y: 1, type: PLACEMENT_TYPE_CONVEYOR, direction: "RIGHT" },
    { x: 3, y: 1, type: PLACEMENT_TYPE_CONVEYOR, direction: "DOWN" },
    { x: 3, y: 3, type: PLACEMENT_TYPE_CONVEYOR, direction: "DOWN" },

    { x: 4, y: 1, type: PLACEMENT_TYPE_CONVEYOR, direction: "LEFT" },
    { x: 5, y: 1, type: PLACEMENT_TYPE_CONVEYOR, direction: "LEFT" },
    { x: 6, y: 1, type: PLACEMENT_TYPE_CONVEYOR, direction: "LEFT" },

    { x: 4, y: 2, type: PLACEMENT_TYPE_CONVEYOR, direction: "RIGHT" },
    { x: 5, y: 2, type: PLACEMENT_TYPE_CONVEYOR, direction: "RIGHT" },

    { x: 6, y: 3, type: PLACEMENT_TYPE_CONVEYOR, direction: "DOWN" },

    { x: 7, y: 1, type: PLACEMENT_TYPE_CONVEYOR, direction: "LEFT" },
    { x: 7, y: 2, type: PLACEMENT_TYPE_CONVEYOR, direction: "UP" },
    { x: 7, y: 3, type: PLACEMENT_TYPE_CONVEYOR, direction: "UP" },
    { x: 7, y: 4, type: PLACEMENT_TYPE_CONVEYOR, direction: "UP" },

    { x: 3, y: 5, type: PLACEMENT_TYPE_CONVEYOR, direction: "LEFT" },
    { x: 4, y: 5, type: PLACEMENT_TYPE_CONVEYOR, direction: "LEFT" },
    { x: 5, y: 5, type: PLACEMENT_TYPE_CONVEYOR, direction: "LEFT" },
    { x: 6, y: 5, type: PLACEMENT_TYPE_CONVEYOR, direction: "LEFT" },

    { x: 4, y: 4, type: PLACEMENT_TYPE_CONVEYOR, direction: "RIGHT" },
    { x: 5, y: 4, type: PLACEMENT_TYPE_CONVEYOR, direction: "RIGHT" },
],
};

export default level;