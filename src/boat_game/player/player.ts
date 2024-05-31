
import { Position2D } from "../boat_game";

export class Player {
    private score: number = 0;
    private life_points: number = 3;
    private position: Position2D = {x:0 , y:0};

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
}