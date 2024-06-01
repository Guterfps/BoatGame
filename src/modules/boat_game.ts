
import { Renderer } from "./renderer/renderer";

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

export class BoatGame {
    private actors: Array<Actor> = [];
    private state: GameState = GameState.PUSE;
    private renderer = new Renderer(); 

    AddActor(actor : Actor) {
        this.actors.push(actor);
    }

    RemoveActor(actor : Actor) {
        let indx = this.actors.indexOf(actor);
        if (indx != -1) {
            this.actors.splice(indx, 1);
        }
    }

    Run() {
        this.state = GameState.RUN as GameState;

        while (this.state !== GameState.EXIT) {
            this.HandleInput();
            this.UpdateGame();
            this.Display();
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
        this.renderer.Render();
    }
}

 