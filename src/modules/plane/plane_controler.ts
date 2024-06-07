
import { Actor, Direction } from "../boat_game";
import { Plane } from "./plane";
import { PlaneDisplay } from "./plane_display";
import { Events } from "../events/events";

export class PlaneController implements Actor {
    private plane: Plane;
    private display: PlaneDisplay;
    private direction: Direction = Direction.LEFT;
    private speed = 2;
    private dx = 0;

    constructor(plane: Plane, display: PlaneDisplay) {
        this.plane = plane;
        this.display = display;
    }

    TakeInput(): void {
        this.dx = this.direction * this.speed;
    }

    Update(events: Events): void {
        let new_pos = this.plane.GetPosition();
        if ((new_pos.x + this.dx) > 0) {
            new_pos.x += this.dx;
        } else {
            new_pos.x += this.display.GetRenderer().GetWidth();  
        }

        this.plane.SetPosition(new_pos);
        this.SpawnParachute(events);
    }

    Draw(): void {
        this.display.DrawPlane(this.plane);
    }

    SpawnParachute(events: Events): void {
        let is_spawn = (Math.random() > 0.99);

        if (is_spawn) {
            events.EventNotify("spawn parachute", this.plane.GetPosition());
        }
    }

}