(() => {
  const symbols = [
    {id:'bison',name:'Bison',weight:2,pay:[5,25,100]},
    {id:'golden-eagle',name:'Águila dorada',weight:4,pay:[4,15,60]},
    {id:'horse',name:'Caballo',weight:6,pay:[3,10,40]},
    {id:'warrior',name:'Guerrero',weight:7,pay:[2.5,8,30]},
    {id:'wolf',name:'Lobo',weight:8,pay:[2,6,24]},
    {id:'revolver',name:'Revólver',weight:9,pay:[1.5,5,20]},
    {id:'cowboy-hat',name:'Sombrero',weight:9,pay:[1.3,4,16]},
    {id:'boots',name:'Botas',weight:9,pay:[1.2,3.5,14]},
    {id:'lantern',name:'Farol',weight:8,pay:[1,3,12]},
    {id:'gold-horseshoe',name:'Herradura dorada',weight:8,pay:[1,3,12]},
    {id:'barrel',name:'Barril',weight:8,pay:[.8,2.5,10]},
    {id:'king',name:'K',weight:7,pay:[.7,2,8]},
    {id:'queen',name:'Q',weight:7,pay:[.7,2,8]},
    {id:'wild',name:'Wild',weight:3,pay:[2,10,40],special:true},
    {id:'scatter',name:'Scatter',weight:5,pay:null,special:true}
  ];
  const PAYOUT_SCALE = 33.407138443089984;
  const TURBO_REEL_DURATION = 450;
  const PAYLINES = [
    [2,2,2,2,2],[1,1,1,1,1],[3,3,3,3,3],[0,0,0,0,0],[4,4,4,4,4],
    [0,1,2,1,0],[4,3,2,3,4],[1,0,1,2,1],[3,4,3,2,3],[0,0,1,2,2],
    [4,4,3,2,2],[1,1,2,3,3],[3,3,2,1,1],[0,1,0,1,0],[4,3,4,3,4],
    [2,1,0,1,2],[2,3,4,3,2],[0,1,1,1,0],[4,3,3,3,4],[1,2,1,2,1]
  ];
  // Cleopatra's exact line palette, applied by the same payline number.
  const LINE_COLORS=['#f2c96b','#45d9e8','#f28d67','#9d74d8','#64ce98','#ffbc57','#27b7be','#ec82b4','#97c957','#e49e2a','#4bb8a5','#7775d7','#d76bd1','#df5c4d','#55bb78','#e7cb59','#38a9dc','#ad83e5','#7fc967','#df7c99'];
  const grid = document.getElementById('grid');
  const machine = document.querySelector('.machine');
  const spinButton = document.getElementById('spin');
  const message = document.getElementById('message');
  const winLabel = document.getElementById('win');
  const balanceLabel = document.getElementById('balance');
  const wagerLabel=document.getElementById('bet');
  const betButton=document.getElementById('betButton');
  const linesButton=document.getElementById('linesButton');
  const betLevelLabel=document.getElementById('betLevelValue');
  const linesValueLabel=document.getElementById('linesValue');
  const betDialog=document.getElementById('betDialog');
  const linesDialog=document.getElementById('linesDialog');
  const betOptionButtons=[...document.querySelectorAll('.bet-option')];
  const lineOptionButtons=[...document.querySelectorAll('.line-option')];
  const wagerTotalLabels=[...document.querySelectorAll('.wager-total-label')];
  const wagerBreakdownLabels=[...document.querySelectorAll('.wager-breakdown-label')];
  const payNote=document.getElementById('pay-note');
  let balance = 1000;
  let totalBet = 25;
  let activeLines = 20;
  let cells = [];
  let paylineClearTimer=null;
  const weightTotal = symbols.reduce((n,s) => n + s.weight, 0);
  const paytableBody=document.getElementById('paytable-body');
  const paylineBody=document.getElementById('payline-body');
  function currentWager(){return totalBet;}
  function currentLineBet(){return totalBet/activeLines;}
  function renderPaytable(){
    paytableBody.replaceChildren();
    for (const s of symbols) {
      const row=document.createElement('tr');
      const pays=s.pay ? s.pay.map(v=>(v*PAYOUT_SCALE*currentLineBet()).toFixed(2)) : ['—','—','—'];
      row.innerHTML=`<th scope="row">${s.name}</th><td>${s.weight}</td><td>${pays[0]}</td><td>${pays[1]}</td><td>${pays[2]}</td>`;
      paytableBody.appendChild(row);
    }
  }
  function updateWagerUI(){
    const total=currentWager(),lineAmount=currentLineBet();
    betLevelLabel.textContent=String(totalBet);
    linesValueLabel.textContent=String(activeLines);
    wagerLabel.textContent=total.toFixed(2);
    wagerTotalLabels.forEach(label=>label.textContent=total.toFixed(2));
    wagerBreakdownLabels.forEach(label=>label.textContent=`${lineAmount.toFixed(2)} por línea × ${activeLines}`);
    payNote.textContent=`Premios por línea ganadora; BET total ${total.toFixed(2)} (${lineAmount.toFixed(2)} por línea con ${activeLines} líneas activas).`;
    betOptionButtons.forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.betTotal)===totalBet)));
    lineOptionButtons.forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.lines)===activeLines)));
    renderPaytable();
    requestAnimationFrame(fitIndicators);
  }
  updateWagerUI();
  PAYLINES.forEach((path,index)=>{
    const row=document.createElement('tr');
    row.innerHTML=`<th scope="row">${index+1}</th>${path.map(rowIndex=>`<td>${rowIndex+1}</td>`).join('')}`;
    paylineBody.appendChild(row);
  });
  const infoDialog=document.getElementById('infoDialog');
  document.getElementById('infoButton').addEventListener('click',()=>infoDialog.showModal());
  document.getElementById('infoClose').addEventListener('click',()=>infoDialog.close());
  infoDialog.addEventListener('click',event=>{if(event.target===infoDialog)infoDialog.close();});
  document.querySelectorAll('.info-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      document.querySelectorAll('.info-tab').forEach(other=>{
        const active=other===tab;other.setAttribute('aria-selected',String(active));
        document.getElementById(other.getAttribute('aria-controls')).hidden=!active;
      });
    });
  });
  function bindChoiceMenu(trigger,dialog,closeButton){
    trigger.addEventListener('click',()=>{
      if(trigger.disabled)return;
      trigger.setAttribute('aria-expanded','true');
      dialog.showModal();
    });
    closeButton.addEventListener('click',()=>dialog.close());
    dialog.addEventListener('close',()=>{
      trigger.setAttribute('aria-expanded','false');
      trigger.focus();
    });
    dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  }
  bindChoiceMenu(betButton,betDialog,document.getElementById('betMenuClose'));
  bindChoiceMenu(linesButton,linesDialog,document.getElementById('linesMenuClose'));
  betOptionButtons.forEach(button=>button.addEventListener('click',()=>{
    totalBet=Number(button.dataset.betTotal);
    updateWagerUI();
    betDialog.close();
  }));
  lineOptionButtons.forEach(button=>button.addEventListener('click',()=>{
    activeLines=Number(button.dataset.lines);
    updateWagerUI();
    linesDialog.close();
  }));

  // The 20 paths are five straight lines plus fifteen zig-zag routes.
  PAYLINES.forEach((_, i) => { if (PAYLINES[i].length !== 5) throw new Error('Payline must traverse all five reels'); });
  const sparkPaths=[['5%','25%','-12px','-18px'],['84%','38%','14px','-10px'],['10%','66%','-15px','10px'],['80%','73%','13px','15px']];
  for (let i=0;i<25;i++) {
    const cell=document.createElement('div'); cell.className='cell'; cell.setAttribute('role','gridcell');
    const img=document.createElement('img'); img.className='symbol'; img.alt=''; img.draggable=false;
    const frame=document.createElement('span'); frame.className='win-frame'; frame.setAttribute('aria-hidden','true');
    const sparkLayer=document.createElement('span');sparkLayer.className='spark-layer';sparkLayer.setAttribute('aria-hidden','true');
    sparkPaths.forEach(([left,top,x,y],sparkIndex)=>{
      const spark=document.createElement('i');spark.className='spark';
      spark.style.left=left;spark.style.top=top;spark.style.setProperty('--spark-x',x);spark.style.setProperty('--spark-y',y);
      spark.style.animationDelay=`-${(sparkIndex*57+(i%5)*31)%310}ms`;
      spark.style.animationDuration=`${220+(sparkIndex%3)*32+(i%5)*14}ms`;
      sparkLayer.appendChild(spark);
    });
    cell.appendChild(img); cell.appendChild(frame); cell.appendChild(sparkLayer); grid.appendChild(cell); cells.push(cell);
  }
  const SVG_NS='http://www.w3.org/2000/svg';
  const paylineLayer=document.getElementById('paylinePaths');
  function pick() {
    let n=Math.random()*weightTotal;
    for (const s of symbols) { n-=s.weight; if (n<0) return s; }
    return symbols[symbols.length-1];
  }
  function makeGrid() { return Array.from({length:25},pick); }
  function setCellSymbol(index,s) {
    const cell=cells[index],img=cell.firstElementChild;
    img.src=`assets/symbols/${s.id}.webp?v=spin-art-4`;
    img.alt=s.name;
    cell.dataset.symbol=s.id;
  }
  function show(board) { board.forEach((s,i)=>setCellSymbol(i,s)); }
  function showReel(board,col) {
    for(let row=0;row<5;row++)setCellSymbol(row*5+col,board[row*5+col]);
  }
  function rollReel(col) {
    for(let row=0;row<5;row++)setCellSymbol(row*5+col,pick());
  }
  function reelHasBison(board,col) {
    for(let row=0;row<5;row++)if(board[row*5+col].id==='bison')return true;
    return false;
  }
  function animateReels(finalBoard) {
    return new Promise(resolve=>{
      const started=performance.now();
      const stopAt=[420,560,700,840,980];
      const stopped=Array(5).fill(false),lastRoll=Array(5).fill(started);
      let suspenseStarted=false,activeTurboCol=-1,turboStopAt=0;
      grid.classList.add('spinning');
      cells.forEach(cell=>cell.classList.add('reel-spinning'));
      function stopReel(col){
        stopped[col]=true;showReel(finalBoard,col);
        for(let row=0;row<5;row++)cells[row*5+col].classList.remove('reel-spinning','turbo-reel');
      }
      function activateTurboReel(col,now){
        activeTurboCol=col;turboStopAt=now+TURBO_REEL_DURATION;
        for(let row=0;row<5;row++)cells[row*5+col].classList.add('turbo-reel');
        machine.classList.add('suspense-active');
      }
      function tick(now){
        const elapsed=now-started;
        for(let col=0;col<5;col++){
          if(stopped[col])continue;
          const interval=col===activeTurboCol?24:82;
          if(now-lastRoll[col]>=interval){rollReel(col);lastRoll[col]=now;}
        }
        if(!suspenseStarted){
          const col=stopped.findIndex(value=>!value);
          if(col>=0&&elapsed>=stopAt[col]){
            stopReel(col);
            if(col<4&&reelHasBison(finalBoard,col)){
              suspenseStarted=true;
              activateTurboReel(col+1,now);
            }
          }
        }else if(activeTurboCol>=0&&elapsed>=turboStopAt){
          const justStopped=activeTurboCol;
          stopReel(justStopped);
          if(justStopped<4)activateTurboReel(justStopped+1,now);
          else{activeTurboCol=-1;machine.classList.remove('suspense-active');}
        }
        if(stopped.every(Boolean)){
          grid.classList.remove('spinning');
          machine.classList.remove('suspense-active');
          resolve();
          return;
        }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }
  function lineWin(board, rows) {
    let best={amount:0,symbol:null,count:0};
    for (const symbol of symbols) {
      if (!symbol.pay) continue;
      let count=0;
      for (let col=0; col<5; col++) {
        const got=board[rows[col]*5+col];
        const match=symbol.id==='wild' ? got.id==='wild' : (got.id===symbol.id || got.id==='wild');
        if (!match) break;
        count++;
      }
      if (count>=3) {
        const amount=symbol.pay[count-3]*PAYOUT_SCALE;
        if (amount>best.amount) best={amount,symbol:symbol.id,count};
      }
    }
    return best;
  }
  function clearMarks() {
    if(paylineClearTimer){clearTimeout(paylineClearTimer);paylineClearTimer=null;}
    cells.forEach(c=>c.classList.remove('win-cell','bison-hit'));
    paylineLayer.replaceChildren();
  }
  function fitTextValue(element,minSize=7){
    if(!element)return;
    element.style.fontSize='';
    const available=element.clientWidth;
    let size=parseFloat(getComputedStyle(element).fontSize)||10;
    if(!available)return;
    for(let i=0;i<24&&element.scrollWidth>available+1&&size>minSize;i++){
      size=Math.max(minSize,size-.5);
      element.style.fontSize=`${size}px`;
    }
  }
  function fitIndicators(){
    document.querySelectorAll('.hud-value').forEach(value=>fitTextValue(value));
    fitTextValue(winLabel);
  }
  window.addEventListener('resize',()=>requestAnimationFrame(fitIndicators),{passive:true});
  function drawWinningPayline(rows,lineNumber) {
    const points=rows.map((row,col)=>[10+col*20,10+row*20]);
    const d=`M${points.map(([x,y])=>`${x},${y}`).join(' L')}`;
    const route=document.createElementNS(SVG_NS,'g');
    route.classList.add('winning-route');
    route.setAttribute('aria-hidden','true');
    const color=document.createElementNS(SVG_NS,'path');
    color.setAttribute('d',d);
    color.setAttribute('stroke',LINE_COLORS[(lineNumber-1)%LINE_COLORS.length]);
    color.classList.add('winning-payline-color');
    route.appendChild(color);
    const core=document.createElementNS(SVG_NS,'path');
    core.setAttribute('d',d);
    core.classList.add('winning-payline-core');
    route.appendChild(core);
    paylineLayer.appendChild(route);
  }
  function settle(board) {
    show(board); clearMarks();
    let total=0, winningLines=0;
    PAYLINES.slice(0,activeLines).forEach((path,lineIndex)=>{
      const result=lineWin(board,path);
      if (result.amount>0) {
        total+=result.amount*currentLineBet();
        winningLines++;
        for(let col=0;col<result.count;col++) cells[path[col]*5+col].classList.add('win-cell');
        drawWinningPayline(path,lineIndex+1);
      }
    });
    if(winningLines>0) paylineClearTimer=window.setTimeout(()=>{paylineClearTimer=null;clearMarks();},2600);
    // Approved Bison appearance: brief restrained bounce/zoom, a single gold sheen,
    // and two small edge glints; no halo or extra particle effects.
    board.forEach((s,i)=>{
      if(s.id==='bison'){
        const c=cells[i]; c.classList.remove('bison-hit'); void c.offsetWidth; c.classList.add('bison-hit');
        setTimeout(()=>c.classList.remove('bison-hit'),650);
      }
    });
    balance += total;
    balanceLabel.textContent=balance.toFixed(2);
    if(total>0){ message.textContent=`${winningLines} LÍNEA${winningLines===1?'':'S'} CON PREMIO`; winLabel.textContent=`+${total.toFixed(2)}`; }
    else { message.textContent='SIN PREMIO — ¡OTRA!'; winLabel.textContent='0.00'; }
    requestAnimationFrame(fitIndicators);
  }
  // Visual-only test route; it never settles a win or changes the balance.
  function showPaylinePreview(){
    const board=makeGrid(),route=PAYLINES[17];
    const bison=symbols.find(s=>s.id==='bison'),scatter=symbols.find(s=>s.id==='scatter');
    route.forEach((row,col)=>{board[row*5+col]=col<4?bison:scatter;});
    show(board);clearMarks();
    route.slice(0,4).forEach((row,col)=>cells[row*5+col].classList.add('win-cell'));
    drawWinningPayline(route,18);
    message.textContent='PREVIA · L18';
    winLabel.textContent='';
    requestAnimationFrame(fitIndicators);
  }
  async function runBisonSuspensePreview(){
    const board=makeGrid(),bison=symbols.find(s=>s.id==='bison');
    board[10]=bison;
    spinButton.disabled=true;betButton.disabled=true;linesButton.disabled=true;
    message.textContent='PREVIA · BISONTE';winLabel.textContent='—';clearMarks();
    try{
      await animateReels(board);
      show(board);message.textContent='PREVIA · EFECTO BISONTE';winLabel.textContent='';
    }finally{spinButton.disabled=false;betButton.disabled=false;linesButton.disabled=false;}
  }
  function renderInitial(){ const b=makeGrid(); show(b); }
  async function spin(){
    if(spinButton.disabled) return;
    const wager=currentWager();
    if(balance<wager){message.textContent='SALDO INSUFICIENTE';return;}
    const finalBoard=makeGrid();
    balance-=wager; balanceLabel.textContent=balance.toFixed(2);
    spinButton.disabled=true;betButton.disabled=true;linesButton.disabled=true;
    message.textContent='GIRANDO…';winLabel.textContent='—';requestAnimationFrame(fitIndicators);clearMarks();
    try{await animateReels(finalBoard);settle(finalBoard);}
    finally{spinButton.disabled=false;betButton.disabled=false;linesButton.disabled=false;}
  }
  spinButton.addEventListener('click',spin);
  renderInitial();
  requestAnimationFrame(fitIndicators);
  function preloadAssets(){
    const screen=document.getElementById('loading');
    const fill=document.getElementById('loadingFill');
    const percent=document.getElementById('loadingPercent');
    const sources=['assets/frame/frame.webp','assets/loading/loading.webp','assets/buttons/spin-normal.webp','assets/buttons/spin-pressed.webp',...symbols.map(s=>`assets/symbols/${s.id}.webp?v=spin-art-4`)];
    let loaded=0;
    const tasks=sources.map(src=>new Promise(resolve=>{
      const image=new Image(); let finished=false;
      const done=()=>{if(finished)return;finished=true;loaded++;const value=Math.round(loaded/sources.length*100);if(fill)fill.style.width=`${value}%`;if(percent)percent.textContent=`${value}%`;resolve();};
      image.onload=done;image.onerror=done;image.src=src;if(image.complete)done();
    }));
    Promise.all(tasks).then(()=>setTimeout(()=>{
      spinButton.disabled=false;screen?.classList.add('is-hidden');
      setTimeout(()=>{
        screen?.remove();
        const params=new URLSearchParams(location.search);
        if(params.get('bison-suspense-preview')==='1')runBisonSuspensePreview();
        else if(params.get('payline-preview')==='1')showPaylinePreview();
      },500);
    },180));
  }
  preloadAssets();
})();
