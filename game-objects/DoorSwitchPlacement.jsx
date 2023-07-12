import { Placement } from "./Placement";
import { TILES } from "../helpers/tiles";
import Sprite from "../components/object-graphics/Sprite";
import { BODY_SKINS, PLACEMENT_TYPE_HERO, PLACEMENT_TYPE_WATER_PICKUP } from "../helpers/consts";

export class DoorSwitchPlacement extends Placement {

    switchesDoorsOnCollide(body) {
        return body.allowsAutoMovement;
    };

    renderComponent() {
        return <Sprite frameCoord={TILES.PURPLE_BUTTON} />
    }
}