import { DIRECTION_DOWN, DIRECTION_UP, DIRECTION_LEFT, DIRECTION_RIGHT, Direction } from "../helpers/consts";

export class TouchDirectionControls {
    constructor() {
        this.directionKeys = {
            ArrowDown: DIRECTION_DOWN,
            ArrowUp: DIRECTION_UP,
            ArrowLeft: DIRECTION_LEFT,
            ArrowRight: DIRECTION_RIGHT,
            s: DIRECTION_DOWN,
            w: DIRECTION_UP,
            a: DIRECTION_LEFT,
            d: DIRECTION_RIGHT,
        };

        this.touchDirections = {
            TouchDown: DIRECTION_DOWN,
            TouchUp: DIRECTION_UP,
            TouchLeft: DIRECTION_LEFT,
            TouchRight: DIRECTION_RIGHT,
        };

        this.heldDirections = [];

        this.directionKeyDownHandler = (event) => {
            const dir = this.directionKeys[event.key]
            if (dir && !this.heldDirections.includes(dir)) {
                this.heldDirections.unshift(dir);
            };
        };

        this.directionKeyUpHandler = (event) => {
            const dir = this.directionKeys[event.key];
            const index = this.heldDirections.indexOf(dir);
            if (index > -1) {
                this.heldDirections.splice(index, 1);
            };
        };

        this.touchStartHandler = (dir) => {
            if (dir && !this.heldDirections.includes(dir)) {
                this.heldDirections.unshift(dir);
            }
        };
        
        this.touchEndHandler = (dir) => {
            const index = this.heldDirections.indexOf(dir);
            if (index > -1) {
                this.heldDirections.splice(index, 1);
            }
        };

        document.addEventListener("keydown", this.directionKeyDownHandler);
        document.addEventListener("keyup", this.directionKeyUpHandler);
        document.addEventListener("touchstart", this.touchStartHandler);
        document.addEventListener("touchend", this.touchEndHandler);
    };

    get direction() {
        console.log("Current direction:", this.heldDirections[0]);

        return this.heldDirections[0]
    }

    unbind() {
        document.removeEventListener("keydown", this.directionKeyDownHandler);
        document.removeEventListener("keyup", this.directionKeyUpHandler);
        document.removeEventListener("touchstart", this.touchStartHandler);
        document.removeEventListener("touchend", this.touchEndHandler);
    }
};
