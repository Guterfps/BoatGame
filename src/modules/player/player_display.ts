
import { Player } from "./player";
import { Renderer } from "../renderer/renderer";

export class PlayerDisplay {
    private renderer: Renderer;

    constructor(renderer: Renderer) {
        this.renderer = renderer;
    }

    DrawPlayer(player: Player): void {
        let pos = player.GetPosition();
        this.renderer.RenderRect(pos.x, pos.y, 70 , 10, "rgb(200 0 0)");
    }

    SetRenderer(renderer: Renderer) {
        this.renderer = renderer;
    }

    GetRenderer(): Renderer {
        return this.renderer;
    }
}