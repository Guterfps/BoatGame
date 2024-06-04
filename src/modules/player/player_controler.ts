
import { Actor, Direction } from "../boat_game";
import { Player } from "./player";
import { PlayerDisplay } from "./player_display";

export class PlayerController implements Actor {
    private player: Player;
    private display: PlayerDisplay;
    private move_direction = Direction.NONE;
    private move_speed = 10;
    private dx = 0;

    constructor(player: Player, display: PlayerDisplay) {
        this.player = player;
        this.display = display;

        document.addEventListener("keydown", this.HandleKeyDown);
        document.addEventListener("keyup", this.HandleKeyUp);
    }
    
    TakeInput(): void {
        this.dx = this.move_direction * this.move_speed;
    }
    
    Update(): void {
        let cur_pos = this.player.GetPosition();
        if ((this.display.GetRenderer().GetWidth() > 
            (cur_pos.x + this.dx)) && 
            ((cur_pos.x + this.dx) > 0)) {
                cur_pos.x += this.dx;  
        }

        this.player.SetPosition(cur_pos);
    }

    Draw(): void {
        this.display.DrawPlayer(this.player);
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
}