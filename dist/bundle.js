(()=>{"use strict";var t,n,e=function(){function t(){this.canvas=document.getElementById("BoatGame"),this.canvas?this.context=this.canvas.getContext("2d"):console.log("canvas is null")}return t.prototype.RenderRect=function(t,n,e,o,i){this.context&&(this.context.beginPath(),this.context.fillStyle=i,this.context.fillRect(t,n,e,o),this.context.closePath())},t.prototype.Clear=function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)},t}(),o=function(){function t(){this.score=0,this.life_points=3,this.position={x:0,y:0}}return t.prototype.GetScore=function(){return this.score},t.prototype.SetScore=function(t){this.score=t},t.prototype.GetLifePoints=function(){return this.life_points},t.prototype.SetLifePoints=function(t){this.life_points=t},t.prototype.GetPosition=function(){return this.position},t.prototype.SetPosition=function(t){this.position=t},t}(),i=function(){function t(t){this.renderer=t}return t.prototype.DrawPlayer=function(t){var n=t.GetPosition();this.renderer.RenderRect(n.x,n.y,20,20,"rgb(200 0 0)")},t.prototype.SetRenderer=function(t){this.renderer=t},t.prototype.GetRenderer=function(){return this.renderer},t}(),r=function(){function t(t,n){this.player=t,this.display=n}return t.prototype.TakeInput=function(){},t.prototype.Update=function(){},t.prototype.Draw=function(){this.display.DrawPlayer(this.player)},t}();!function(t){t[t.RUN=0]="RUN",t[t.PUSE=1]="PUSE",t[t.GAME_OVER=2]="GAME_OVER",t[t.EXIT=3]="EXIT"}(t||(t={})),(n=new(function(){function n(){this.state=t.PUSE,this.renderer=new e,this.actors=[],this.Run=this.Run.bind(this)}return n.prototype.AddActor=function(t){this.actors.push(t)},n.prototype.RemoveActor=function(t){var n=this.actors.indexOf(t);-1!=n&&this.actors.splice(n,1)},n.prototype.Init=function(){this.state=t.RUN,this.AddActor(new r(new o,new i(this.renderer)))},n.prototype.Run=function(){this.state!==t.EXIT&&(this.HandleInput(),this.UpdateGame(),this.renderer.Clear(),this.Display(),requestAnimationFrame(this.Run))},n.prototype.GetState=function(){return this.state},n.prototype.ChangeState=function(t){this.state=t},n.prototype.HandleInput=function(){this.actors.forEach((function(t){t.TakeInput()}))},n.prototype.UpdateGame=function(){this.actors.forEach((function(t){t.Update()}))},n.prototype.Display=function(){this.actors.forEach((function(t){t.Draw()}))},n}())).Init(),n.Run()})();
//# sourceMappingURL=bundle.js.map