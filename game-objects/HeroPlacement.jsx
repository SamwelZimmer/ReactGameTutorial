import { BodyPlacement } from "./BodyPlacement";
import Body from "../components/object-graphics/Body";
import { DIRECTION_LEFT, BODY_SKINS, HERO_RUN_1, HERO_RUN_2, Z_INDEX_LAYER_SIZE } from "../helpers/consts";
import { TILES } from "../helpers/tiles";

const heroSkinMap = {
    [BODY_SKINS.NORMAL]: [TILES.HERO_LEFT, TILES.HERO_RIGHT],
    [BODY_SKINS.DEATH]: [TILES.HERO_DEATH_LEFT, TILES.HERO_DEATH_RIGHT],
    [BODY_SKINS.SCARED]: [TILES.HERO_DEATH_LEFT, TILES.HERO_DEATH_RIGHT],
    [BODY_SKINS.ICE]: [TILES.HERO_ICE_LEFT, TILES.HERO_ICE_RIGHT],
    [BODY_SKINS.CONVEYOR]: [TILES.HERO_CONVEYOR_LEFT, TILES.HERO_CONVEYOR_RIGHT],
    [BODY_SKINS.WATER]: [TILES.HERO_WATER_LEFT, TILES.HERO_WATER_RIGHT],
    [BODY_SKINS.FIRE]: [TILES.HERO_FIRE_LEFT, TILES.HERO_FIRE_RIGHT],
    [BODY_SKINS.TELEPORT]: [TILES.HERO_TELEPORT_LEFT, TILES.HERO_TELEPORT_RIGHT],
    [HERO_RUN_1]: [TILES.HERO_RUN_1_LEFT, TILES.HERO_RUN_1_RIGHT],
    [HERO_RUN_2]: [TILES.HERO_RUN_2_LEFT, TILES.HERO_RUN_2_RIGHT],
};
 
export class HeroPlacement extends BodyPlacement {
    constructor(properties, level) {
      super(properties, level);
      this.canCollectItems = true;
      this.canCompleteLevel = true;
      this.allowsAutoMovement = true;
    }

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

        // maybe hop out of non-normal skin if in water
        if (this.skin === BODY_SKINS.WATER) {
            const collision = this.getCollisionAtNextPosition(direction);
            if (!collision.withChangesHeroSkin()) {
              this.skin = BODY_SKINS.NORMAL;
            }
        }
        
        // start moving
        this.movingPixelsRemaining = 16;
        this.movingPixelDirection = direction;
        this.updateFaceingDirection();
        this.updateWalkFrame();
    }

    onAutoMovement(direction) {
        this.controllerMoveRequested(direction);
    };

    takesDamage(deathType) {
        this.level.setDeathOutcome(deathType);
    };

    zIndex() {
        return this.y * Z_INDEX_LAYER_SIZE + 1;
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

    renderComponent() {
        const showShadow = this.skin != BODY_SKINS.WATER;
        return <Body frameCoord={this.getFrame()} yTranslate={this.getYTranslate()} showShadow={showShadow} />;
    };
};