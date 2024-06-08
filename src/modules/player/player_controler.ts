
import { Actor, Direction, Rectangle } from "../utils/utils";
import { Player } from "./player";
import { PlayerDisplay } from "./player_display";
import { Events } from "../events/events";

export class PlayerController implements Actor {
    private player: Player;
    private display: PlayerDisplay;
    private move_direction = Direction.NONE;
    private move_speed = 10;
    private dx = 0;

    constructor(player: Player, display: PlayerDisplay) {
        this.player = player;
        this.display = display;

        document.addEventListener("keydown", this.HandleKeyDown, false);
        document.addEventListener("keyup", this.HandleKeyUp, false);
        document.addEventListener("mousemove", this.HandleMouseMove, false);
    }
    
    TakeInput(): void {
        this.dx = this.move_direction * this.move_speed;
    }
    
    Update(events: Events): void {
        if (this.player.GetLifePoints() > 0) {    
            let new_pos = this.player.GetPosition();
            if ((this.display.GetRenderer().GetWidth() >= 
                (new_pos.x + this.dx + this.player.GetShape().w)) && 
                ((new_pos.x + this.dx) >= 0)) {
                new_pos.x += this.dx;  
            }
            
            this.player.SetPosition(new_pos);
        } else {
            events.EventNotify("player loss", this.player.GetScore());
        }
    }

    Draw(): void {
        this.display.DrawPlayer(this.player);
        this.display.DrawLifePoints(this.player.GetLifePoints());
        this.display.DrawScore(this.player.GetScore());
    }

    GetPlayerShape(): Rectangle {
        return this.player.GetShape();
    }

    IncreseScore(amount: number): void {
        this.player.SetScore(this.player.GetScore() + amount);
    }

    ChangeLifePoints(amount: number): void {
        this.player.SetLifePoints(this.player.GetLifePoints() + amount);
    }

    private HandleKeyDown = (event: KeyboardEvent) => {
        switch (event.code) {
            case "ArrowRight":
                this.move_direction = Direction.RIGHT;
                break;
            case "ArrowLeft":
                this.move_direction = Direction.LEFT;
                break;
            default:
                this.move_direction = Direction.NONE;
        }
    }

    private HandleKeyUp = (event: KeyboardEvent) => {
        switch (event.code) {
            case "ArrowRight":
                this.move_direction = Direction.NONE;
                break;
            case "ArrowLeft":
                this.move_direction = Direction.NONE;
                break;
        }
    }

    private HandleMouseMove = (event: MouseEvent) => {
        const canvas = this.display.GetRenderer().canvas;
        const relativeX = event.clientX - canvas.offsetLeft;
        const mid_shape = this.player.GetShape().w / 2;
        let new_pos = this.player.GetPosition();
        if (((relativeX - mid_shape) > 0) && 
            ((relativeX + mid_shape) < canvas.width)) {
            new_pos.x = relativeX - mid_shape;
        }

        this.player.SetPosition(new_pos);
    }
}