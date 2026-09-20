const SYMBOLS=['🎃','👻','🦇','💀','🕷️','🧛','🧟','🍬','🌙','🕸️'];
const PAYLINES=[[1,1,1,1,1],[0,0,0,0,0],[2,2,2,2,2],[0,1,2,1,0],[2,1,0,1,2],[0,0,1,2,2],[2,2,1,0,0],[1,0,0,0,1],[1,2,2,2,1],[1,0,1,0,1],[1,2,1,2,1],[0,1,1,1,0],[2,1,1,1,2],[0,1,0,1,0],[2,1,2,1,2],[1,1,0,1,1],[1,1,2,1,1],[0,0,2,0,0],[2,2,0,2,2],[0,2,0,2,0]];
const LINE_COLORS=['#eab308','#38bdf8','#f43f5e','#a855f7','#22c55e','#fb923c','#06b6d4','#ec4899','#84cc16','#f59e0b','#14b8a6','#6366f1','#d946ef','#e11d48','#10b981','#facc15','#38bdf8','#c084fc','#4ade80','#f472b6'];
const $=id=>document.getElementById(id); const reels=document.querySelector('#reels');
let balance=10000,bet=50,jackpot=75420,lines=25,spinning=false,scene;
function setText(){ $('balance').textContent=balance; $('bet').textContent=bet; $('lines').textContent=lines; $('jackpot').textContent=jackpot; }
function rand(){return Math.floor(Math.random()*SYMBOLS.length)}
class SlotScene extends Phaser.Scene{
 constructor(){super('SlotScene');this.symbols=[];this.grid=[];this.payline=null;this.spinId=0}
 create(){scene=this; this.makeGrid(); this.scale.on('resize',()=>this.layout()); this.layout(); this.events.on('shutdown',()=>{this.clearPayline()});}
 makeGrid(){for(let i=0;i<15;i++){const t=this.add.text(0,0,SYMBOLS[rand()],{fontFamily:'Arial',fontSize:'64px',color:'#f5ffcf',stroke:'#10151c',strokeThickness:6,shadow:{offsetX:0,offsetY:0,color:'#b7ff69',blur:10,stroke:true,fill:true}}).setOrigin(.5);this.symbols.push(t);this.grid.push(rand())}}
 layout(){const w=this.scale.width,h=this.scale.height; this.symbols.forEach((t,i)=>{t.x=((i%5)+.5)*w/5;t.y=(Math.floor(i/5)+.5)*h/3;t.setFontSize(Math.max(18,Math.min(w/5,h/3)*.58));});}
 clearPayline(){if(this.payline){this.payline.destroy();this.payline=null}}
 showPayline(n){this.clearPayline();const g=this.add.graphics();const color=Phaser.Display.Color.HexStringToColor(LINE_COLORS[n%20]).color;const p=PAYLINES[n%20],w=this.scale.width,h=this.scale.height;const pts=p.map((r,c)=>({x:(c+.5)*w/5,y:(r+.5)*h/3}));g.lineStyle(12,color,.32);g.beginPath();g.moveTo(pts[0].x,pts[0].y);pts.slice(1).forEach(q=>g.lineTo(q.x,q.y));g.strokePath();g.lineStyle(3.5,0xffffff,1);g.beginPath();g.moveTo(pts[0].x,pts[0].y);pts.slice(1).forEach(q=>g.lineTo(q.x,q.y));g.strokePath();pts.forEach(q=>{g.fillStyle(color,1);g.fillCircle(q.x,q.y,6);g.fillStyle(0xffffff,1);g.fillCircle(q.x,q.y,2.5)});this.payline=g;this.time.delayedCall(1900,()=>this.clearPayline());}
 spin(){if(spinning||balance<bet)return;spinning=true;balance-=bet;jackpot+=Math.max(1,Math.floor(bet*.1));setText();this.clearPayline();const id=++this.spinId,stopped=[false,false,false,false,false],values=Array(15).fill(0),started=performance.now();this.symbols.forEach(t=>t.setTint(0xffffff));const tick=()=>{if(id!==this.spinId)return;const elapsed=performance.now()-started;for(let c=0;c<5;c++){if(!stopped[c]&&elapsed>=900+c*280){stopped[c]=true;for(let r=0;r<3;r++)values[c+r*5]=rand();}}
 for(let c=0;c<5;c++)if(!stopped[c])for(let r=0;r<3;r++)values[c+r*5]=rand();this.symbols.forEach((t,i)=>t.setText(SYMBOLS[values[i]]));if(stopped.every(Boolean)){spinning=false;const win=Math.random()<.35?bet*(2+Math.floor(Math.random()*8)):0;if(win){balance+=win;$('win').textContent=win;const row=Math.floor(Math.random()*3);this.showPayline(Math.floor(Math.random()*20));for(let c=0;c<5;c++)this.symbols[c+row*5].setTint(0xc6ff50)}else $('win').textContent=0;setText();return;}this.time.delayedCall(55,tick);};tick();}
}
const config={type:Phaser.AUTO,parent:'reels',backgroundColor:'rgba(0,0,0,0)',transparent:true,render:{antialias:true,powerPreference:'high-performance'},scale:{mode:Phaser.Scale.RESIZE,width:'100%',height:'100%'},scene:SlotScene};
new Phaser.Game(config);
$('spin').onclick=()=>scene?.spin();
$('plus').onclick=()=>{bet=Math.min(500,bet+25);setText()};$('minus').onclick=()=>{bet=Math.max(25,bet-25);setText()};document.querySelector('.bet').onclick=()=>{bet=bet>=500?25:bet+25;setText()};
$('lineUp').onclick=()=>{lines=Math.min(25,lines+5);setText()};$('lineDown').onclick=()=>{lines=Math.max(20,lines-5);setText()};document.querySelector('.lines').onclick=()=>{lines=lines===25?20:25;setText()};$('menu').onclick=()=>alert(`Halloween Spins\nLíneas activas: ${lines}\nApuesta: $${bet}`);setText();
