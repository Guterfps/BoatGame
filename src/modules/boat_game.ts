
import { Renderer } from "./renderer/renderer";
import { Player } from "./player/player";
import { PlayerDisplay } from "./player/player_display";
import { PlayerController } from "./player/player_controler";

export interface Actor {
    TakeInput(): void;
    Update(): void;
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
export enum Direction { LEFT = -1, RIGHT = 1, UP = 2, DOWN = -2, NONE = 0};

export class BoatGame {
    private state: GameState = GameState.PUSE;
    private renderer: Renderer = new Renderer();
    private actors: Array<Actor> = [];

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
        this.actors.forEach((act) => {act.Update()});
    }

    private Display() {
        this.actors.forEach((act) => {act.Draw()});
    }
}

 