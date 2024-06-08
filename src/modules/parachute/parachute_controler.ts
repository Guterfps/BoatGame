
import { Actor, Direction } from "../utils/utils";
import { Parachute } from "./parachute";
import { ParachuteDisplay } from "./parachute_display";
import { Events } from "../events/events";
import { RectCollisionDetector } from "../collision_detector/rect_collision";

export class ParachuteController implements Actor {
    private Parachute: Parachute;
    private display: ParachuteDisplay;
    private direction = Direction.DOWN;
    private speed = 1;
    private dy = 0;
    private boat_detector: RectCollisionDetector;

    constructor(
        parachute: Parachute, 
        display: ParachuteDisplay,
        boat_detector: RectCollisionDetector
    ) {
        this.Parachute = parachute;
        this.display = display;
        this.boat_detector = boat_detector;
    }

    TakeInput(): void {
        this.dy = this.direction * this.speed;
    }

    Update(events: Events): void {
        let new_pos = this.Parachute.GetPosition();
        if (new_pos.y < this.display.GetRenderer().GetHeight()) {
            new_pos.y += this.dy;
            this.Parachute.SetPosition(new_pos);
        } else {
            events.EventNotify("parachute died", this);
        }

        if (this.boat_detector.IsColliding(this.Parachute.GetShape())) {
            events.EventNotify("boat collision", this);
        }
    }

    Draw(): void {
        this.display.DrawParachute(this.Parachute.GetShape());
    }
}