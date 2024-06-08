
import { Position2D, Rectangle } from "../utils/utils";

export class Plane {
    private position: Position2D;
    private readonly width = 120;
    private readonly hieght = 80;

    constructor(pos: Position2D) {
        this.position = pos;
    }

    GetPosition(): Position2D {
        return this.position;
    }

    SetPosition(new_pos: Position2D): void {
        this.position = new_pos;
    }

    GetShape(): Rectangle {
        return {pos: this.position, w: this.width, h: this.hieght};
    }
}