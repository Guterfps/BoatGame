
import { Renderer } from "../renderer/renderer";
import { Rectangle } from "../utils/utils";
import BouatImg from '../../../assets/images/boat.png';

export class PlayerDisplay {
    private renderer: Renderer;
    private ui_font = "24px Arial";
    private ui_fillStyle = "#0095DD";
    private image = new Image();

    constructor(renderer: Renderer) {
        this.renderer = renderer;
        this.image.src = BouatImg;
    }

    DrawPlayer(player_shape: Rectangle): void {
        let {pos, w, h} = player_shape;
        let {x, y} = pos;
        // this.renderer.RenderRect(x, y, w, h, "rgb(200 0 0)");
        this.renderer.context.drawImage(this.image, x, y, w, h);
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