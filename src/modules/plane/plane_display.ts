
import { Renderer } from "../renderer/renderer";
import { Rectangle } from "../utils/utils";
import PlaneImg from '../../../assets/images/plane.png';

export class PlaneDisplay {
    private renderer: Renderer;
    private image = new Image();

    constructor(renderer: Renderer) {
        this.renderer = renderer;
        this.image.src = PlaneImg; 
    }

    DrawPlane(plane_shape: Rectangle): void {
        let {pos, w, h} = plane_shape;
        let {x, y} = pos;
        // this.renderer.RenderRect(pos.x, pos.y, 100 , 20, "rgb(0 0 200)");
        this.renderer.context.drawImage(this.image, x, y, w, h);
    }

    SetRenderer(renderer: Renderer) {
        this.renderer = renderer;
    }

    GetRenderer(): Renderer {
        return this.renderer;
    }
}