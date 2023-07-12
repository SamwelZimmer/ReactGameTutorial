import { Placement } from "./Placement";
import { TILES } from "../helpers/tiles";
import Sprite from "../components/object-graphics/Sprite";
import { BODY_SKINS, PLACEMENT_TYPE_TELEPORT } from "../helpers/consts";

export class TeleportPlacement extends Placement {

    constructor(properties, level) {
        super(properties, level);
        this.isRaised = properties.isRaised ?? false;
    };

    changesHeroSkinOnCollide() {
        return  BODY_SKINS.TELEPORT;
    };

    teleportsToPositionOnCollide(body) {
        if (body.allowsAutoMovement) {

            // get all teleports
            const allTeleports = this.level.placements.filter((p) => {
                return p.type === PLACEMENT_TYPE_TELEPORT;
            });

            // find the next teleport
            if (allTeleports.length > 1) {
                const myIndex = allTeleports.findIndex((p) => p.id === this.id);
                const next = allTeleports[myIndex + 1] ?? allTeleports[0];
                return {
                    x: next.x,
                    y: next.y,
                };
            }
        }
      return null;
    }

    renderComponent() {
        return <Sprite frameCoord={TILES.TELEPORT1} />
    };
};