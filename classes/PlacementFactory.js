import { CelebrationPlacement } from "../game-objects/CelebrationPlacement";
import { FlourPlacement } from "../game-objects/FlourPlacement";
import { LockPlacement } from "../game-objects/LockPlacements";
import { KeyPlacement } from "../game-objects/KeyPlacements";
import { GoalPlacement } from "../game-objects/GoalPlacement";
import { HeroPlacement } from "../game-objects/HeroPlacement";
import { WallPlacement } from "../game-objects/WallPlacement";
import { WaterPlacement } from "../game-objects/WaterPlacement";
import { WaterPickupPlacement } from "../game-objects/WaterPickupPlacement";
import { GroundEnemyPlacement } from "../game-objects/GroundEnemyPlacement";
import { FlyingEnemyPlacement } from "../game-objects/FlyingEnemyPlacement";
import { RoamingEnemyPlacement } from "../game-objects/RoamingEnemyPlacement";
import { ConveyorPlacement } from "../game-objects/ConveyorPlacement";
import { IcePlacement } from "../game-objects/IcePlacement";
import { IcePickupPlacement } from "../game-objects/IcePickupPlacement";
import { FirePlacement } from "../game-objects/FirePlacement";
import { FirePickupPlacement } from "../game-objects/FirePickupPlacement";
import { DoorSwitchPlacement } from "../game-objects/DoorSwitchPlacement";
import { SwitchableDoorPlacement } from "../game-objects/SwitchableDoorPlacement";
import { TeleportPlacement } from "../game-objects/TeleportPlacement";
import { ThiefPlacement } from "../game-objects/ThiefPlacement";
import { CiabattaPlacement } from "../game-objects/CiabattaPlacement";
import { PLACEMENT_TYPE_CELEBRATION, PLACEMENT_TYPE_FLOUR, PLACEMENT_TYPE_GOAL, PLACEMENT_TYPE_HERO, PLACEMENT_TYPE_WALL, PLACEMENT_TYPE_KEY, PLACEMENT_TYPE_LOCK, PLACEMENT_TYPE_WATER, PLACEMENT_TYPE_WATER_PICKUP, PLACEMENT_TYPE_GROUND_ENEMY, PLACEMENT_TYPE_FLYING_ENEMY, PLACEMENT_TYPE_ROAMING_ENEMY, PLACEMENT_TYPE_CONVEYOR, PLACEMENT_TYPE_ICE, PLACEMENT_TYPE_ICE_PICKUP, PLACEMENT_TYPE_FIRE, PLACEMENT_TYPE_FIRE_PICKUP, PLACEMENT_TYPE_SWITCH, PLACEMENT_TYPE_SWITCH_DOOR, PLACEMENT_TYPE_TELEPORT, PLACEMENT_TYPE_THIEF, PLACEMENT_TYPE_CIABATTA } from "../helpers/consts";

const placementTypeClassMap = {
    [PLACEMENT_TYPE_HERO]: HeroPlacement,
    [PLACEMENT_TYPE_GOAL]: GoalPlacement,
    [PLACEMENT_TYPE_WALL]: WallPlacement,
    [PLACEMENT_TYPE_FLOUR]: FlourPlacement,
    [PLACEMENT_TYPE_CELEBRATION]: CelebrationPlacement,
    [PLACEMENT_TYPE_KEY]: KeyPlacement,
    [PLACEMENT_TYPE_LOCK]: LockPlacement,
    [PLACEMENT_TYPE_WATER]: WaterPlacement,
    [PLACEMENT_TYPE_WATER_PICKUP]: WaterPickupPlacement,
    [PLACEMENT_TYPE_GROUND_ENEMY]: GroundEnemyPlacement,
    [PLACEMENT_TYPE_FLYING_ENEMY]: FlyingEnemyPlacement,
    [PLACEMENT_TYPE_ROAMING_ENEMY]: RoamingEnemyPlacement,
    [PLACEMENT_TYPE_CONVEYOR]: ConveyorPlacement,
    [PLACEMENT_TYPE_ICE]: IcePlacement,
    [PLACEMENT_TYPE_ICE_PICKUP]: IcePickupPlacement,
    [PLACEMENT_TYPE_FIRE]: FirePlacement,
    [PLACEMENT_TYPE_FIRE_PICKUP]: FirePickupPlacement,
    [PLACEMENT_TYPE_SWITCH]: DoorSwitchPlacement,
    [PLACEMENT_TYPE_SWITCH_DOOR]: SwitchableDoorPlacement,
    [PLACEMENT_TYPE_TELEPORT]: TeleportPlacement,
    [PLACEMENT_TYPE_THIEF]: ThiefPlacement,
    [PLACEMENT_TYPE_CIABATTA]: CiabattaPlacement
};

class PlacementFactory {
    createPlacement(config, level) {
        const placementClass = placementTypeClassMap[config.type];
        if (!placementClass) {
            console.warn("NO TYPE FOUND", config.type);
        };
        const instance = new placementClass(config, level);
        // make ID here
        instance.id = Math.floor(Math.random() * 999999) + 1;
        return instance;
    }
}

export const placementFactory = new PlacementFactory();