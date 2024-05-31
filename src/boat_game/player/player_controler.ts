
import { Actor } from "../boat_game";
import { Player } from "./player";
import { PlayerDisplay } from "./player_display";

class PlayerController implements Actor {
    private player: Player;
    private display: PlayerDisplay;

    constructor(player: Player, display: PlayerDisplay) {
        this.player = player;
        this.display = display;
    }
    
    TakeInput(): void {

    }

    Update(): void {

    }

    Draw(): void {

    }

}