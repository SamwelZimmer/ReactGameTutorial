import { CELL_SIZE } from "../../helpers/consts";
import Sprit from "../object-graphics/Sprite";

export default function MapCell({ x, y, frameCoord}) {
    return (
        <div style={{ position: "absolute", left: x * CELL_SIZE, top: y * CELL_SIZE }}>
            <Sprit frameCoord={frameCoord} />
        </div>
    );
}7