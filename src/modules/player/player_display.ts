
import { Player } from "./player";
import { Renderer } from "../renderer/renderer";

export class PlayerDisplay {
    private renderer: Renderer;

    constructor(renderer: Renderer) {
        this.renderer = renderer;
    }

    DrawPlayer(player: Player): void {
        
    }

    SetRenderer(renderer: Renderer) {
        this.renderer = renderer;
    }

    GetRenderer(): Renderer {
        return this.renderer;
    }
}