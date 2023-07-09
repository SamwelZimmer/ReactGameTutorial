import { GroundEnemyPlacement } from './GroundEnemyPlacement';
import Body from "../components/object-graphics/Body";
import { TILES } from "../helpers/tiles";
import { DIRECTION_LEFT } from "../helpers/consts";

export class FlyingEnemyPlacement extends GroundEnemyPlacement {
    constructor(properties, level) {
        super(properties, level);
        this.tickBetweenMovesInterval = 20; // hpw many frame to wait between moves
        this.ticksUntilNextMove = this.tickBetweenMovesInterval;  // counts how many frames left
        this.turnsAroundAtWater = false;  // flying enemies can cross water
    }

    renderComponent() {
        const frameCoord =
          this.spriteFacingDirection === DIRECTION_LEFT
            ? TILES.ENEMY_FLYING_LEFT
            : TILES.ENEMY_FLYING_RIGHT;
        return (
          <Body frameCoord={frameCoord} yTranslate={-3} showShadow={true} />
        );
    }
}