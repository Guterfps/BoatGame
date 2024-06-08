
import { Renderer } from "./renderer/renderer";
import { PlayerController, Player, PlayerDisplay } from "./player/modules";
import { PlaneController, Plane, PlaneDisplay } from "./plane/modules" ;
import { ParachuteController, Parachute, ParachuteDisplay } from "./parachute/modules";
import { Events } from "./events/events";
import { GameState, Actor, Position2D } from "./utils/utils";
import { RectCollisionDetector } from "./collision_detector/rect_collision";
import BackGroundImg from "../../assets/images/background.png";
import SeaImg from "../../assets/images/sea.png";

export class BoatGame {
    private state = GameState.PUSE;
    private renderer = new Renderer();
    private actors = new Array<Actor>;
    private events = new Events;
    private final_score = 0;
    private background_image = new Image();
    private sea_image = new Image();
    private sea_lvl = 200;

    constructor() {
        this.Run = this.Run.bind(this);
        this.background_image.src = BackGroundImg;
        this.sea_image.src = SeaImg;
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
        let player_ctrl = new PlayerController(
                        new Player(new Position2D(
                            this.renderer.GetWidth() / 2, 
                            this.renderer.GetHeight() * 0.65)), 
                        new PlayerDisplay(this.renderer));
        
        this.AddActor(player_ctrl);
        this.AddActor(new PlaneController(
                        new Plane(new Position2D(this.renderer.GetWidth(), 50)),
                        new PlaneDisplay(this.renderer)));
        
        this.events.AddEventNotify("spawn parachute", 
        (pos: Position2D) => {
            this.AddActor(new ParachuteController(
                new Parachute(new Position2D(pos.x, pos.y)),
                new ParachuteDisplay(this.renderer),
                new RectCollisionDetector(player_ctrl.GetPlayerShape())));
        });
        this.events.AddEventNotify("parachute died", 
        (parachute: Actor) => {
            player_ctrl.ChangeLifePoints(-1);
            this.RemoveActor(parachute);
        });
        this.events.AddEventNotify("boat collision", 
        (parachute: Actor) => {
            player_ctrl.IncreseScore(1);
            this.RemoveActor(parachute);
        });
        this.events.AddEventNotify("player loss", (score: number) => {
            this.state = GameState.GAME_OVER;
            this.final_score = score;
        });
    }

    Run() {
        if (this.state !== GameState.EXIT) {
            switch (this.state) {
                case GameState.RUN:
                    this.HandleInput();
                    this.UpdateGame();
                    
                    this.renderer.Clear();
                    this.Display();
                    break;
                case GameState.GAME_OVER:
                    this.DisplayGameOver();
                    document.addEventListener("click", this.ResetGame);
                    break;
            };

            requestAnimationFrame(this.Run);
        }
    }

    GetState(): GameState {
        return this.state;
    }

    ChangeState(new_state: GameState) {
        this.state = new_state;
    }

    private HandleInput(): void {
        this.actors.forEach((act) => {act.TakeInput()});
    }

    private UpdateGame(): void {
        this.actors.forEach((act) => {act.Update(this.events)});
    }

    private Display(): void {
        const canv_w = this.renderer.GetWidth();
        const canv_h = this.renderer.GetHeight();
        this.renderer.context.drawImage(this.background_image, 
                                        0, 0, canv_w, canv_h);
        this.renderer.context.drawImage(this.sea_image, 
            0, canv_h - this.sea_lvl, canv_w, this.sea_lvl);

        this.actors.forEach((act) => {act.Draw()});
    }

    private DisplayGameOver(): void {
        let ctx = this.renderer.context;
        ctx.font = "32px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText(`Game Over Final Score: ${this.final_score}`, 
                    this.renderer.GetWidth() / 2 - 200, 
                    this.renderer.GetHeight() / 2 - 50);
        ctx.fillText(`Click to restart`, 
                    this.renderer.GetWidth() / 2 - 100, 
                    this.renderer.GetHeight() / 2);
    }

    private ResetGame = (): void => {
        this.actors = new Array<Actor>;
        this.events.Clear();
        this.final_score = 0;
        
        this.Init();

        document.removeEventListener("click", this.ResetGame);
    }
}

 