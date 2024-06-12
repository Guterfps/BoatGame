
import { Actor, Direction, Position2D, Rectangle } from "../utils/utils";
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
        document.addEventListener("touchstart", this.HandleTouch);
        document.addEventListener("touchmove", this.HandleTouch);
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
        this.display.DrawPlayer(this.player.GetShape());
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
        this.player.SetPosition(this.LimitMoveX(event.clientX));
    }

    private HandleTouch = (event: TouchEvent) => {
        if (event.touches) {
            this.player.SetPosition(this.LimitMoveX(event.touches[0].pageX));
        }
    }

    private LimitMoveX(move: number): Position2D {
        const canvas = this.display.GetRenderer().canvas;
        const relative_x = move - canvas.offsetLeft; 
        const mid_shape = this.player.GetShape().w / 2;
        let new_pos = this.player.GetPosition();
        if (((relative_x - mid_shape) > 0) && 
            ((relative_x + mid_shape) < canvas.width)) {
            new_pos.x = relative_x - mid_shape;
        }

        return new_pos;
    }
}