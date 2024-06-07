
import { Renderer } from "./renderer/renderer";
import { PlayerController, Player, PlayerDisplay } from "./player/modules";
import { PlaneController, Plane, PlaneDisplay } from "./plane/modules" ;
import { ParachuteController, Parachute, ParachuteDisplay } from "./parachute/modules";
import { Events } from "./events/events";

export interface Actor {
    TakeInput(): void;
    Update(events: Events): void;
    Draw(): void;
}

export class Position2D {
    x: number;
    y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

export enum GameState { RUN, PUSE, GAME_OVER, EXIT };
export enum Direction { LEFT = -1, RIGHT = 1, UP = -1, DOWN = 1, NONE = 0};

export class BoatGame {
    private state = GameState.PUSE;
    private renderer = new Renderer();
    private actors = new Array<Actor>;
    private events = new Events;

    constructor() {
        this.Run = this.Run.bind(this);
    }

    AddActor(actor : Actor) {
        this.actors.push(actor);
    }

    RemoveActor(actor : Actor) {
        let indx = this.actors.indexOf(actor);
        if (indx != -1) {
            this.actors.splice(indx, 1);
        }
    }

    Init() {
        this.state = GameState.RUN;
        this.AddActor(new PlayerController(
                        new Player(new Position2D(400, 400)), 
                        new PlayerDisplay(this.renderer)));
        this.AddActor(new PlaneController(
                        new Plane(this.renderer.GetWidth(), 50),
                        new PlaneDisplay(this.renderer)));
        
        this.events.AddEventNotify("spawn parachute", 
                                (pos: Position2D) => {
                        this.AddActor(new ParachuteController(
                            new Parachute(pos.x, pos.y),
                            new ParachuteDisplay(this.renderer)));
                    });
        this.events.AddEventNotify("despawn parachute", 
                        (actor: Actor) => {
                            this.RemoveActor(actor);
                        });
    }

    Run() {
        if (this.state !== GameState.EXIT) {
            this.HandleInput();
            this.UpdateGame();
            
            this.renderer.Clear();
            this.Display();
            requestAnimationFrame(this.Run);
        }
    }

    GetState(): GameState {
        return this.state;
    }

    ChangeState(new_state: GameState) {
        this.state = new_state;
    }

    private HandleInput() {
        this.actors.forEach((act) => {act.TakeInput()});
    }

    private UpdateGame() {
        this.actors.forEach((act) => {act.Update(this.events)});
    }

    private Display() {
        this.actors.forEach((act) => {act.Draw()});
    }
}

 