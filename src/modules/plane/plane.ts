
import { Position2D } from "../boat_game";

export class Plane {
    private position: Position2D;

    constructor(x = 0, y = 0) {
        this.position = {x, y};
    }

    GetPosition(): Position2D {
        return this.position;
    }

    SetPosition(new_pos: Position2D): void {
        this.position = new_pos;
    }
}