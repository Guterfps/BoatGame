
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

    Render() {
        if (this.context) {
            this.context.fillStyle = "rgb(200 0 0)";
            this.context.fillRect(10, 10, 50, 50);
    
            this.context.fillStyle = "rgb(0 0 200 / 50%)";
            this.context.fillRect(30, 30, 50, 50);
        }
    }
    
}