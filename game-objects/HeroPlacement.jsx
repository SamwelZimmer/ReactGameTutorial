import { Placement } from "./Placement";
import Hero from "../components/object-graphics/Hero";
import { DIRECTION_LEFT, DIRECTION_RIGHT, directionUpdateMap, BODY_SKINS, HERO_RUN_1, HERO_RUN_2, Z_INDEX_LAYER_SIZE, PLACEMENT_TYPE_CELEBRATION } from "../helpers/consts";
import { TILES } from "../helpers/tiles";
import { Collision } from "../classes/Collision";

const heroSkinMap = {
    [BODY_SKINS.NORMAL]: [TILES.HERO_LEFT, TILES.HERO_RIGHT],
    [BODY_SKINS.DEATH]: [TILES.HERO_DEATH_LEFT, TILES.HERO_DEATH_RIGHT],
    [BODY_SKINS.WATER]: [TILES.HERO_WATER_LEFT, TILES.HERO_WATER_RIGHT],
    [HERO_RUN_1]: [TILES.HERO_RUN_1_LEFT, TILES.HERO_RUN_1_RIGHT],
    [HERO_RUN_2]: [TILES.HERO_RUN_2_LEFT, TILES.HERO_RUN_2_RIGHT],
};
 
export class HeroPlacement extends Placement {

    controllerMoveRequested(direction) {

        // attempt to move
        if (this.movingPixelsRemaining > 0) {
            return;
        }

        // check for lock at next position
        const possibleLock = this.getLockAtNextPosition(direction);
        if (possibleLock) {
            possibleLock.unlock();
            return;
        }

        // make sure next space is valid
        if (this.isSolidAtNextPosition(direction)) {
            return;
        }

        // maybe hop out of non-normal skin
        const collision = this.getCollisionAtNextPosition(direction);
        if (!collision.withChangesHeroSkin()) {
            this.skin = BODY_SKINS.NORMAL;
        }

        // start moving
        this.movingPixelsRemaining = 16;
        this.movingPixelDirection = direction;
        this.updateFaceingDirection();
        this.updateWalkFrame();
    }

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
    }

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

    getFrame() {
        // which to side of sprite to show
        const index = this.spriteFacingDirection === DIRECTION_LEFT ? 0 : 1;

        // if dead show death skin
        if (this.level.deathOutcome) {
            return heroSkinMap[BODY_SKINS.DEATH][index];
        }

        // use correct walking frame for given direction if using standard skin
        if (this.movingPixelsRemaining > 0 && this.skin === BODY_SKINS.NORMAL) {
            const walkKey = this.spriteWalkFrame === 0 ? HERO_RUN_1 : HERO_RUN_2;
            return heroSkinMap[walkKey][index];
        }

        return heroSkinMap[this.skin][index];
    }

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
        return this.y * Z_INDEX_LAYER_SIZE + 1;
    }

    renderComponent() {
        const showShadow = this.skin != BODY_SKINS.WATER;
        return <Hero frameCoord={this.getFrame()} yTranslate={this.getYTranslate()} showShadow={showShadow} />;
    };
};