
import { Renderer } from "../renderer/renderer";
import { Plane } from "./plane";

export class PlaneDisplay {
    private renderer: Renderer;

    constructor(renderer: Renderer) {
        this.renderer = renderer;
    }

    DrawPlane(plane: Plane): void {
        let pos = plane.GetPosition();
        this.renderer.RenderRect(pos.x, pos.y, 100 , 20, "rgb(0 0 200)");
    }

    SetRenderer(renderer: Renderer) {
        this.renderer = renderer;
    }

    GetRenderer(): Renderer {
        return this.renderer;
    }
}