import { PLACEMENT_TYPE_HERO } from "../helpers/consts";
import { GameLoop } from "./GameLoop";
import { placementFactory } from "./PlacementFactory";
import { DirectionControls } from "./DirectionControls";
import { LevelAnimatedFrames } from "./LevelAnimatedFrames";
import { Inventory } from "./Inventory";
import Levels from "../levels/LevelsMap";
   
export class LevelState {

  constructor(levelId, onEmit) {
    this.id = levelId;
    this.onEmit = onEmit;
    this.theme = "";
    this.tilesWidth = 0;
    this.tilesHeight = 0;
    this.placements = [];
    this.gameLoop = null;
    

    this.directionControls = new DirectionControls();
    this.start();
  }

  start() {
    this.isCompleted = false;
    this.deathOutcome = null;

    const levelData = Levels[this.id];

    this.theme = levelData.theme;
    this.tilesWidth = levelData.tilesWidth;
    this.tilesHeight = levelData.tilesHeight;
    this.placements = levelData.placements.map((config) => {
      return placementFactory.createPlacement(config, this);
    });

    // create fresh inventory
    this.inventory = new Inventory();

    // create a frame animation manager
    this.animatedFrames = new LevelAnimatedFrames();

    // cache reference to the hero
    this.heroRef = this.placements.find((p) => p?.type === PLACEMENT_TYPE_HERO);

    this.startGameLoop();
  }

  startGameLoop() {
      this.gameLoop?.stop();
      this.gameLoop = new GameLoop(() => {
          this.tick();
      })
  }

  addPlacement(config) {
    this.placements.push(placementFactory.createPlacement(config, this));
  }

  deletePlacement(placementToRemove) {
    this.placements = this.placements.filter((p) => {
      return p?.id !== placementToRemove.id;
    });
  }

  tick() {
      // check for movement
      if (this.directionControls.direction) {
        this.heroRef.controllerMoveRequested(this.directionControls.direction);
      }

      // call 'tick' on any placement that wants to update
      this.placements.forEach((placement) => {
          if (placement) {
              placement.tick();
          }
      });

      // work on animation frames
      this.animatedFrames.tick();

      // exit any changes to React
      this.onEmit(this.getState());
  }

  isPositionOutOfBounds(x, y) {
    return (
      x === 0 ||
      y === 0 ||
      x >= this.tilesWidth + 1 ||
      y >= this.tilesHeight + 1
    );
  };

  setDeathOutcome(causeOfDeath) {
    this.deathOutcome = causeOfDeath;
    this.gameLoop.stop();
  }

  completeLevel() {
    this.isCompleted = true;
    this.gameLoop?.stop();
  }

  getState() {
    return {
      theme: this.theme,
      tilesWidth: this.tilesWidth,
      tilesHeight: this.tilesHeight,
      placements: this.placements,
      deathOutcome: this.deathOutcome,
      isCompleted: this.isCompleted,
    };
  }

  destroy() {
    // tear down the level
    this.gameLoop?.stop();
    this.directionControls.unbind();
  }
}
  