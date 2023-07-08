import MapCell from "./MapCell";
import { THEME_TILES_MAP } from "../../helpers/consts";

export default function LevelBackgroundTilesLayer({ level }) {
    
    const widthWithWalls = level.tilesWidth + 1;
    const heightWithWalls = level.tilesHeight + 1;
    const tiles = THEME_TILES_MAP[level.theme];

    function getBackgroundTile(x, y) {
        // use left wall graphic in first lateral position
        if (x === 0) return tiles.LEFT;
        
        // use right wall graphic in last lateral position
        if (x === widthWithWalls) return tiles.RIGHT;

        // use top wall graphic in first vertical position
        if (y === 0) return tiles.TOP;

        // use bottom wall graphic in last vertical position
        if (y === heightWithWalls) return tiles.BOTTOM;

        // else use the floor graphic
        return tiles.FLOOR;
    };

    let canvases = [];
    for (let y=0; y <= heightWithWalls; y++) {
        for (let x=0; x <= widthWithWalls; x++) {

            // skip bottom corner tiles (optional)
            if (y === heightWithWalls) {
                if (x === 0 || x === widthWithWalls) {
                    continue;
                };
            };

            // add cell to the map
            canvases.push(
                <MapCell 
                    key={`${x}_${y}`} 
                    x={x}
                    y={y}
                    frameCoord={getBackgroundTile(x, y)}
                />
            )
        };
    };
    
    return (
        <div>
            {canvases}
        </div>
    );
};