import { GroundEnemyPlacement } from './GroundEnemyPlacement';
import Body from "../components/object-graphics/Body";
import { TILES } from "../helpers/tiles";
import { CELL_SIZE, PLACEMENT_TYPE_ROAMING_ENEMY } from "../helpers/consts";
import CiabattaBody from '../components/object-graphics/CiabattaBody';

const ATTACKS = {
    TACKLE: "TACKLE",
    SPAWN: "SPAWN",
};

const PAIN_FRAMES_LENGTH = 20;
const DEATH_FRAMES_LENGTH = 140;

export class CiabattaPlacement extends GroundEnemyPlacement {
    constructor(properties, level) {
        super(properties, level);
        this.tickBetweenMovesInterval = 40;
        this.ticksUntilNextMove = this.tickBetweenMovesInterval;
        this.turnsAroundAtWater = true;
        this.interactsWithGround = true;
        this.normalMovesRemaining = 4;
        this.hp = 3;
        this.painFramesRemaining = 0;
        this.currentAttack = null;
        this.deathFramesUntilDisappear = 0;
    };

    tickAttemptAiMove() {
        // check if hit the hero
        this.checkForOverlapWithHero();

        // counters
        if (this.deathFramesUntilDisappear > 0) {
            this.deathFramesUntilDisappear -= 1;
            if (this.deathFramesUntilDisappear === 0) {
                this.level.deletePlacement(this);
            };
            return;
        };

        if (this.painFramesRemaining > 0) {
            this.painFramesRemaining -= 1;
            return;
        };

        if (this.ticksUntilNextMove > 0) {
            this.ticksUntilNextMove -= 1;
            return;
        }

        // work on behaviours

        if (this.currentAttack) {
            this.workOnAttackFrame();
            return;
        }
        // turn if hit wall
        const direction = this.movingPixelDirection;
        if (this.isSolidAtNextPosition(direction)) {
            this.switchDirection();
            return;
        };

        if (this.movingPixelsRemaining === 0) {
            this.ticksUntilNextMove = this.tickBetweenMovesInterval;
            this.movingPixelsRemaining = CELL_SIZE;
            this.movingPixelDirection = direction;
            // this.updateFacingDirection();
            this.updateWalkFrame();
        };

    }

    onPostMove() {
        // launch new attack
        if (this.normalMovesRemaining === 0) {
            this.normalMovesRemaining = 4;
            this.startAttack();
            return;
        };

        // keep moving
        this.normalMovesRemaining -= 1;
    };

    startAttack() {
        // choose a random next attack
        const possibleNextAttacks = [ATTACKS.SPAWN, ATTACKS.TACKLE];
        const next =
            possibleNextAttacks[
            Math.floor(Math.random() * possibleNextAttacks.length)
            ];
        // populate current attack slot
        if (next === ATTACKS.TACKLE) {
            this.currentAttack = {
                type: ATTACKS.TACKLE,
                framesRemaining: 120,
                returnToY: this.y,
            };
        }
        if (next === ATTACKS.SPAWN) {
            this.currentAttack = {
                type: ATTACKS.SPAWN,
                framesRemaining: 220,
            };
        }
    }

    workOnAttackFrame() {
        this.currentAttack.framesRemaining -= 1;
        if (this.currentAttack.framesRemaining === 0) {
            this.currentAttack = null;
            return;
        };
        
        if (this.currentAttack.type === ATTACKS.TACKLE) {
            this.handleTackleAttackFrame();
        }
        if (this.currentAttack.type === ATTACKS.SPAWN) {
            this.handleSpawnAttackFrame();
        }
    };

    handleTackleAttackFrame () {
        const { framesRemaining, returnToY } = this.currentAttack;
        if (framesRemaining === 119) {
            this.x = this.level.heroRef.x;
            this.y = this.level.heroRef.y - 1;
            if (this.y < 1) {
                this.y = 1;
            };
        };

        // lunge at hero
        if (framesRemaining === 90) {
            this.y = this.y + 1;
        };

        // return to previous row
        if (framesRemaining === 50) {
            this.y = returnToY;
        };
    };

    handleSpawnAttackFrame() {
        const { framesRemaining } = this.currentAttack;
        if (framesRemaining === 210) {
            // configure three roaming enemies around the hero
            [
            {
                type: PLACEMENT_TYPE_ROAMING_ENEMY,
                x: this.level.heroRef.x,
                y: this.level.heroRef.y + 2,
            },
            {
                type: PLACEMENT_TYPE_ROAMING_ENEMY,
                x: this.level.heroRef.x + 2,
                y: this.level.heroRef.y,
            },
            {
                type: PLACEMENT_TYPE_ROAMING_ENEMY,
                x: this.level.heroRef.x - 2,
                y: this.level.heroRef.y,
            },
            ]
            .filter((p) => {
                // remove placements that are out of bounds
                return (
                p.x > 0 &&
                p.x <= this.level.tilesWidth &&
                p.y < this.level.tilesHeight
                );
            })
            .forEach((enemyConfig) => {
                // add to level
                this.level.addPlacement(enemyConfig);
            });
        }
        // remove all roaming enemies when the attack is ending
        if (framesRemaining === 1) {
            this.level.placements.forEach((p) => {
            if (p.type === PLACEMENT_TYPE_ROAMING_ENEMY) {
                this.level.deletePlacement(p);
            }
            });
        }
    }

    takesDamage(deathType) {
        this.painFramesRemaining = PAIN_FRAMES_LENGTH;
        this.hp -= 1;

        if (this.hp <= 0) {
            // start counting death frames
            this.deathFramesUntilDisappear = DEATH_FRAMES_LENGTH;
        }
    };

    getFrame() {

        // death skin
        if (this.hp <= 0) {
            return TILES.CIABATTA_DEAD;
        };

        // flash in pain
        if (this.painFramesRemaining > 0) {
            return TILES.CIABATTA_PAIN;
        };

        // purple lunge frame
        if (this.currentAttack?.type === ATTACKS.TACKLE) {
            return TILES.CIABATTA_TELEPORT;
        };

        // raise arms when moving/spawning
        if (this.currentAttack?.type === ATTACKS.SPAWN || this.movingPixelsRemaining > 0) {
            return TILES.CIABATTA1;
        }

        return TILES.CIABATTA2;
    };

    renderComponent() {
        return <CiabattaBody frameCoord={this.getFrame()} />
    }
};