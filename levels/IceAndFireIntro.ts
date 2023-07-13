import { LEVEL_THEMES, PLACEMENT_TYPE_FIRE, PLACEMENT_TYPE_FLOUR, PLACEMENT_TYPE_GOAL, PLACEMENT_TYPE_HERO, PLACEMENT_TYPE_WALL, PLACEMENT_TYPE_WATER_PICKUP, PLACEMENT_TYPE_WATER, PLACEMENT_TYPE_FIRE_PICKUP } from "../helpers/consts";

const level = {
  theme: LEVEL_THEMES.YELLOW,
  tilesWidth: 7,
  tilesHeight: 5,
  placements: [
    { x: 1, y: 5, type: PLACEMENT_TYPE_HERO },
    { x: 7, y: 1, type: PLACEMENT_TYPE_GOAL },

    { x: 1, y: 1, type: PLACEMENT_TYPE_WATER_PICKUP },
    { x: 1, y: 2, type: PLACEMENT_TYPE_FIRE },
    { x: 2, y: 1, type: PLACEMENT_TYPE_FIRE },
    { x: 2, y: 2, type: PLACEMENT_TYPE_FIRE },

    { x: 7, y: 4, type: PLACEMENT_TYPE_WATER },
    { x: 6, y: 4, type: PLACEMENT_TYPE_WATER },
    { x: 6, y: 5, type: PLACEMENT_TYPE_WATER },
    { x: 7, y: 4, type: PLACEMENT_TYPE_WATER },
    { x: 7, y: 5, type: PLACEMENT_TYPE_FLOUR },

    { x: 3, y: 5, type: PLACEMENT_TYPE_FIRE_PICKUP },

    { x: 4, y: 5, type: PLACEMENT_TYPE_WALL },
  ],
};

export default level;