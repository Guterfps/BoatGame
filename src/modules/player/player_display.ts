
import { Player } from "./player";
import { Renderer } from "../renderer/renderer";

export class PlayerDisplay {
    private renderer: Renderer;
    private ui_font = "16px Arial";
    private ui_fillStyle = "#0095DD";

    constructor(renderer: Renderer) {
        this.renderer = renderer;
    }

    DrawPlayer(player: Player): void {
        let {pos, w, h} = player.GetShape();
        let {x, y} = pos;
        this.renderer.RenderRect(x, y, w, h, "rgb(200 0 0)");
    }

    DrawScore(score: number): void {
        let ctx = this.renderer.context;
        ctx.font = this.ui_font;
        ctx.fillStyle = this.ui_fillStyle;
        ctx.fillText(`Score: ${score}`, 10, 20);
    }

    DrawLifePoints(life_points: number): void {
        let ctx = this.renderer.context;
        ctx.font = this.ui_font;
        ctx.fillStyle = this.ui_fillStyle;
        ctx.fillText(`Lives: ${life_points}`, 10, 40);
    }

    SetRenderer(renderer: Renderer): void {
        this.renderer = renderer;
    }

    GetRenderer(): Renderer {
        return this.renderer;
    }
}