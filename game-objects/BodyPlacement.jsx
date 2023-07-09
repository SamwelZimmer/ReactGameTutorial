import { Placement } from "./Placement";
import { DIRECTION_LEFT, DIRECTION_RIGHT, directionUpdateMap, BODY_SKINS, PLACEMENT_TYPE_CELEBRATION, Z_INDEX_LAYER_SIZE } from "../helpers/consts";
import { Collision } from "../classes/Collision";

export class BodyPlacement extends Placement {

    getCollisionAtNextPosition(direction) {
        const { x, y } = directionUpdateMap[direction];
        const nextX = this.x + x;
        const nextY = this.y + y;
        return new Collision(this, this.level, { x: nextX, y: nextY });
    }

    getLockAtNextPosition(direction) {
        const collision = this.getCollisionAtNextPosition(direction);
        return collision.withLock();
    }

    isSolidAtNextPosition(direction) {
        const collision = this.getCollisionAtNextPosition(direction);

        const isOutOfBounds = this.level.isPositionOutOfBounds(collision.x, collision.y);
        if (isOutOfBounds) {
            return true;
        };

        return Boolean(collision.withSolidPlacement());
    };

    updateFaceingDirection() {
        if (this.movingPixelDirection === DIRECTION_LEFT || this.movingPixelDirection === DIRECTION_RIGHT) {
            this.spriteFacingDirection = this.movingPixelDirection;
        }
    }

    updateWalkFrame() {
        this.spriteWalkFrame = this.spriteWalkFrame === 1 ? 0 : 1;
    }

    tick() {
        this.tickMovingPixelProgress();
        this.tickAttemptAiMove();
    };

    tickMovingPixelProgress() {

        if (this.movingPixelsRemaining === 0) {
            return;
        };

        this.movingPixelsRemaining -= this.travelPixelsPerFrame;
        if (this.movingPixelsRemaining <= 0) {
            this.movingPixelsRemaining = 0;
            this.onDoneMoving();
        };
    };

    onDoneMoving() {
        // update the hero's x / y position
        const {x, y} = directionUpdateMap[this.movingPixelDirection];
        this.x += x;
        this.y += y;
        this.handleCollisions();
        this.onPostMove();
    }

    onPostMove() {
        return null;
    };

    handleCollisions() {
        const collision = new Collision(this, this.level);

        // assume that we want to return to the standard skin at each position
        this.skin = BODY_SKINS.NORMAL;
        const changesHeroSkin = collision.withChangesHeroSkin();
        if (changesHeroSkin) {
            this.skin = changesHeroSkin.changesHeroSkinOnCollide();
        };

        const collideThatAddsToInventory = collision.withPlacementAddsToInventory();
        if (collideThatAddsToInventory) {
            collideThatAddsToInventory.collect();
            this.level.addPlacement({ type: PLACEMENT_TYPE_CELEBRATION, x: this.x, y: this.y });
        };

        const takesDamage = collision.withSelfGetsDamaged();
        if (takesDamage) {
            this.level.setDeathOutcome(takesDamage.type);
        }

        const completesLevel = collision.withCompletesLevel();
        if (completesLevel) {
            this.level.completeLevel();
        }
    };

    getYTranslate() {
        // stand on ground when not moving and don't jump when in water
        if (this.movingPixelsRemaining === 0 || this.skin !== BODY_SKINS.NORMAL) {
            return 0;
        }
        
        // elevate ramp up or down at beginning/end of movement
        const PIXELS_FROM_END = 2;
        if (this.movingPixelsRemaining < PIXELS_FROM_END || this.movingPixelsRemaining > 16 - PIXELS_FROM_END) {
            return -1;
        }
        
        // highest in the middle of the movement
        return -2;
    }
    
    zIndex() {
        return this.y * Z_INDEX_LAYER_SIZE;
    }
}