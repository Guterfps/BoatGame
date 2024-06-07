
import { Actor, Direction } from "../boat_game";
import { Parachute } from "./parachute";
import { ParachuteDisplay } from "./parachute_display";
import { Events } from "../events/events";

export class ParachuteController implements Actor {
    private Parachute: Parachute;
    private display: ParachuteDisplay;
    private direction = Direction.DOWN;
    private speed = 1;
    private dy = 0;

    constructor(parachute: Parachute, display: ParachuteDisplay) {
        this.Parachute = parachute;
        this.display = display;
    }

    TakeInput(): void {
        this.dy = this.direction * this.speed;
    }

    Update(events: Events): void {
        let new_pos = this.Parachute.GetPosition();
        if (new_pos.y < this.display.GetRenderer().GetHeight()) {
            new_pos.y += this.direction * this.speed;
            this.Parachute.SetPosition(new_pos);
        } else {
            events.EventNotify("despawn parachute", this);
        }
    }

    Draw(): void {
        this.display.DrawParachute(this.Parachute);
    }
}