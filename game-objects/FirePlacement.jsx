import { Placement } from "./Placement";
import { TILES } from "../helpers/tiles";
import Sprite from "../components/object-graphics/Sprite";
import { DIRECTION_UP, DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_DOWN, BODY_SKINS, ICE_CORNERS, PLACEMENT_TYPE_HERO, PLACEMENT_TYPE_ICE_PICKUP, PLACEMENT_TYPE_FIRE_PICKUP } from "../helpers/consts";
    

export class FirePlacement extends Placement {

    changesHeroSkinOnCollide() {
        return BODY_SKINS.FIRE;
    }

    // isSolidForBody(body) {
    //     // means that walking enemies treat water like a solid wall
    //     return body.turnsAroundAtWater ?? false;
    // }

    damagesBodyOnCollide(body) {
        const { inventory } = this.level;
        return body.type === PLACEMENT_TYPE_HERO && !inventory.has(PLACEMENT_TYPE_FIRE_PICKUP)
    }

    renderComponent() {
        const waterFrame = this.level.animatedFrames.fireFrame;
        return <Sprite frameCoord={waterFrame} />;
    };
}