
import { Renderer } from "../renderer/renderer";
import { Parachute } from "./parachute";

export class ParachuteDisplay {
    private renderer: Renderer;

    constructor(renderer: Renderer) {
        this.renderer = renderer;
    }

    DrawParachute(parachute: Parachute): void {
        let pos = parachute.GetPosition();
        this.renderer.RenderRect(pos.x, pos.y, 20 , 30, "rgb(0 200 0)");
    }

    SetRenderer(renderer: Renderer) {
        this.renderer = renderer;
    }

    GetRenderer(): Renderer {
        return this.renderer;
    }
}