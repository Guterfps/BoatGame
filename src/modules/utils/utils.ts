
import { Events } from "../events/events";

export interface Actor {
    TakeInput(): void;
    Update(events: Events): void;
    Draw(): void;
}

export class Position2D {
    x: number;
    y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

export class Rectangle {
    pos: Position2D;
    w: number;
    h: number;

    constructor(pos: Position2D = {x:0, y:0}, w = 0, h = 0) {
        this.pos = pos;
        this.w = w;
        this.h = h;
    }
}

export enum GameState { RUN, PUSE, GAME_OVER, EXIT };
export enum Direction { LEFT = -1, RIGHT = 1, UP = -1, DOWN = 1, NONE = 0};

