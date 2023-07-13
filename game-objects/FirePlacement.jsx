import { Placement } from "./Placement";
import { TILES } from "../helpers/tiles";
import Sprite from "../components/object-graphics/Sprite";
import { DIRECTION_UP, DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_DOWN, BODY_SKINS, ICE_CORNERS, PLACEMENT_TYPE_HERO, PLACEMENT_TYPE_ICE_PICKUP, PLACEMENT_TYPE_FIRE_PICKUP, PLACEMENT_TYPE_CIABATTA } from "../helpers/consts";
    

export class FirePlacement extends Placement {

    changesHeroSkinOnCollide() {
        return BODY_SKINS.FIRE;
    }

    damagesBodyOnCollide(body) {
        const { inventory } = this.level;
        if (body.type === PLACEMENT_TYPE_HERO && !inventory.has(PLACEMENT_TYPE_FIRE_PICKUP)) {
            return this.type;
        };

        if (body.type === PLACEMENT_TYPE_CIABATTA) {
            return this.type;
        };
        
        return null;
    }

    renderComponent() {
        const waterFrame = this.level.animatedFrames.fireFrame;
        return <Sprite frameCoord={waterFrame} />;
    };
}