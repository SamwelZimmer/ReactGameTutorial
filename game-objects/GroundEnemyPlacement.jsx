import { BodyPlacement } from "./BodyPlacement";
import Body from "../components/object-graphics/Body";
import { TILES } from "../helpers/tiles";
import { DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP } from "../helpers/consts";

export class GroundEnemyPlacement extends BodyPlacement {
  constructor(properties, level) {
      super(properties, level);
      this.tickBetweenMovesInterval = 28; // hpw many frame to wait between moves
      this.ticksUntilNextMove = this.tickBetweenMovesInterval;  // counts how many frames left
      this.turnsAroundAtWater = true;  // walking enemies cannot cross water
      this.movingPixelDirection = properties.initialDirection ?? DIRECTION_RIGHT;
      this.allowsAutoMovement = true;
  }

  tickAttemptAiMove() {
      this.checkForOverlapWithHero();

      if (this.ticksUntilNextMove > 0) {
          this.ticksUntilNextMove -= 1;
          return;
      }
      this.internalMoveRequested(this.movingPixelDirection);
  }

  checkForOverlapWithHero() {
    const [myX, myY] = this.displayXY();
    const [heroX, heroY] = this.level.heroRef.displayXY();
    const xDiff = Math.abs(myX - heroX);
    const yDiff = Math.abs(myY - heroY);
    if (xDiff <= 2 && yDiff <= 2) {
      this.level.setDeathOutcome(this.type);
    }
  }

  internalMoveRequested(direction) {
      // attempt to move
      if (this.movingPixelsRemaining > 0) {
          return;
      }

      if (this.isSolidAtNextPosition(direction)) {
          this.switchDirection();
          return;
      }

      // start moving
      this.ticksUntilNextMove = this.tickBetweenMovesInterval
      this.movingPixelsRemaining = 16;
      this.movingPixelDirection = direction;
      this.updateFaceingDirection();
      this.updateWalkFrame();
  }

  onAutoMovement(direction) {
    this.internalMoveRequested(direction);
  };

  switchDirection() {
      const currentDir = this.movingPixelDirection;

      // if body moving horizontally, switch between left and right
      if (currentDir === DIRECTION_LEFT || currentDir === DIRECTION_RIGHT) {
          this.movingPixelDirection = this.movingPixelDirection === DIRECTION_LEFT ? DIRECTION_RIGHT : DIRECTION_LEFT;
          return;
      }

      // else the body is moving vertically, switch between up and down
      this.movingPixelDirection = this.movingPixelDirection === DIRECTION_UP ? DIRECTION_DOWN : DIRECTION_UP;
  }

  renderComponent() {
    const frameCoord =
      this.spriteFacingDirection === DIRECTION_LEFT
        ? TILES.ENEMY_LEFT
        : TILES.ENEMY_RIGHT;
    return (
      <Body frameCoord={frameCoord} yTranslate={this.getYTranslate()} showShadow={true} />
    );
  }
}