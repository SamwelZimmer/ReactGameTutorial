import { Placement } from "./Placement";
import ElevatedSprite from "../components/object-graphics/ElevatedSprite";
import { TILES } from "../helpers/tiles";
import { PLACEMENT_TYPE_FLOUR, Z_INDEX_LAYER_SIZE } from "../helpers/consts";

export class FlourPlacement extends Placement {

    constructor(properties, level) {
        super(properties, level);
        this.canBeStolen = false;
    }
    addsItemToInventoryOnCollide() {
        return PLACEMENT_TYPE_FLOUR;
    }

    zIndex() {
        return this.y * Z_INDEX_LAYER_SIZE
    }

    renderComponent() {
        return <ElevatedSprite frameCoord={TILES.FLOUR} />;
    }
}