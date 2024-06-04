
export class Renderer {
    readonly canvas = <HTMLCanvasElement>document.getElementById("BoatGame");
    readonly context;
    
    constructor() {
        if (this.canvas) {
            this.context = this.canvas.getContext("2d");
        } else {
            console.log("canvas is null");
        }

    }

    RenderRect(
        x: number,
        y: number,
        w: number,
        h: number,
        color: string) 
    {
        if (this.context) {
            this.context.beginPath();
            this.context.fillStyle = color;
            this.context.fillRect(x, y, w, h);
            this.context.closePath();
        }
    }

    Clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    GetWidth(): number {
        return this.canvas.width;
    }

    GetHeight(): number {
        return this.canvas.height
    }
    
}