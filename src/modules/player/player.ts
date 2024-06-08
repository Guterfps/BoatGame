
import { Position2D, Rectangle } from "../utils/utils";

export class Player {
    private score: number = 0;
    private life_points: number = 3;
    private position: Position2D = {x:0 , y:0};
    private readonly width = 70;
    private readonly hieght = 10;

    constructor(pos: Position2D) {
        this.position = pos;

    }

    GetScore(): number {
        return this.score;
    }

    SetScore(new_score: number): void {
        this.score = new_score;
    }

    GetLifePoints(): number {
        return this.life_points;
    }

    SetLifePoints(new_life_points: number): void {
        this.life_points = new_life_points;
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