import { GroundEnemyPlacement } from './GroundEnemyPlacement';
import Body from "../components/object-graphics/Body";
import { TILES } from "../helpers/tiles";
import { DIRECTION_LEFT, DIRECTION_UP, DIRECTION_RIGHT, DIRECTION_DOWN } from "../helpers/consts";
import { Collision } from '../classes/Collision';

export class RoamingEnemyPlacement extends GroundEnemyPlacement {

    constructor(properties, level) {
        super(properties, level);
        this.tickBetweenMovesInterval = 48;
        this.ticksUntilNextMove = this.tickBetweenMovesInterval;
        this.turnsAroundAtWater = true;
        this.allowsAutoMovement = true;
    };

    onPostMove() {

      // do not choose next move if on an automoving tile
      const collision = new Collision(this, this.level);
      if (collision.withPlacementMovesBody()) {
        return;
      };

      // randomly choose a new direction
      const directions = [
        DIRECTION_UP,
        DIRECTION_DOWN,
        DIRECTION_LEFT,
        DIRECTION_RIGHT,
      ].filter((direction) => {
        return !this.isSolidAtNextPosition(direction);
      });

      if (directions.length) {
        this.movingPixelDirection =
          directions[Math.floor(Math.random() * directions.length)];
      }
    }

    renderComponent() {
        return <Body frameCoord={TILES.ENEMY_ROAMING} yTranslate={0} />;
    };
};