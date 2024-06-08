
import { Rectangle } from "../utils/utils";

export class RectCollisionDetector {
    private rect: Rectangle;

    constructor(rect: Rectangle) {
        this.rect = rect;
    }

    IsColliding(rect: Rectangle): boolean {
        return (rect.pos.x < this.rect.pos.x + this.rect.w &&
            rect.pos.x + rect.w > this.rect.pos.x &&
            rect.pos.y < this.rect.pos.y + this.rect.h &&
            rect.pos.y + rect.h > this.rect.pos.y);
    }   
}