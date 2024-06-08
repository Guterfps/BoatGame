
import { Renderer } from "../renderer/renderer";
import { Rectangle } from "../utils/utils";
import ParachuteImg from '../../../assets/images/parachutist.png';

export class ParachuteDisplay {
    private renderer: Renderer;
    private image = new Image();

    constructor(renderer: Renderer) {
        this.renderer = renderer;
        this.image.src = ParachuteImg;
    }

    DrawParachute(parachute_shape: Rectangle): void {
        let {pos, w, h} = parachute_shape;
        let {x, y} = pos;
        // this.renderer.RenderRect(x, y, w, h, "rgb(0 200 0)");
        this.renderer.context.drawImage(this.image, x, y, w, h);
    }

    SetRenderer(renderer: Renderer) {
        this.renderer = renderer;
    }

    GetRenderer(): Renderer {
        return this.renderer;
    }
}