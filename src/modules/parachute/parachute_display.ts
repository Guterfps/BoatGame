
import { Renderer } from "../renderer/renderer";
import { Parachute } from "./parachute";

export class ParachuteDisplay {
    private renderer: Renderer;

    constructor(renderer: Renderer) {
        this.renderer = renderer;
    }

    DrawParachute(parachute: Parachute): void {
        let {pos, w, h} = parachute.GetShape();
        let {x, y} = pos;
        this.renderer.RenderRect(x, y, w, h, "rgb(0 200 0)");
    }

    SetRenderer(renderer: Renderer) {
        this.renderer = renderer;
    }

    GetRenderer(): Renderer {
        return this.renderer;
    }
}