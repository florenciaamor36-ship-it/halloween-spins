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
  const PAYLINES = [
    [2,2,2,2,2],[1,1,1,1,1],[3,3,3,3,3],[0,0,0,0,0],[4,4,4,4,4],
    [0,1,2,1,0],[4,3,2,3,4],[1,0,1,2,1],[3,4,3,2,3],[0,0,1,2,2],
    [4,4,3,2,2],[1,1,2,3,3],[3,3,2,1,1],[0,1,0,1,0],[4,3,4,3,4],
    [2,1,0,1,2],[2,3,4,3,2],[0,1,1,1,0],[4,3,3,3,4],[1,2,1,2,1]
  ];
  const grid = document.getElementById('grid');
  const svgNS='http://www.w3.org/2000/svg';
  const paylineOverlay=document.createElementNS(svgNS,'svg');
  paylineOverlay.classList.add('payline-overlay');
  paylineOverlay.setAttribute('viewBox','0 0 5 5');
  paylineOverlay.setAttribute('preserveAspectRatio','none');
  paylineOverlay.setAttribute('aria-hidden','true');
  grid.appendChild(paylineOverlay);
  const spinButton = document.getElementById('spin');
  const message = document.getElementById('message');
  const winLabel = document.getElementById('win');
  const balanceLabel = document.getElementById('balance');
  const bet = 1;
  let balance = 1000;
  let cells = [];
  const weightTotal = symbols.reduce((n,s) => n + s.weight, 0);
  const paytableBody=document.getElementById('paytable-body');
  const paylineBody=document.getElementById('payline-body');
  const lineStake=bet/PAYLINES.length;
  document.getElementById('pay-note').textContent=`Pago en créditos por una línea ganadora; apuesta total ${bet.toFixed(2)} (${lineStake.toFixed(2)} por línea).`;
  for (const s of symbols) {
    const row=document.createElement('tr');
    const pays=s.pay ? s.pay.map(v=>(v*PAYOUT_SCALE*lineStake).toFixed(2)) : ['—','—','—'];
    row.innerHTML=`<th scope="row">${s.name}</th><td>${s.weight}</td><td>${pays[0]}</td><td>${pays[1]}</td><td>${pays[2]}</td>`;
    paytableBody.appendChild(row);
  }
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

  // The 20 paths are five straight lines plus fifteen zig-zag routes.
  PAYLINES.forEach((_, i) => { if (PAYLINES[i].length !== 5) throw new Error('Payline must traverse all five reels'); });
  for (let i=0;i<25;i++) {
    const cell=document.createElement('div'); cell.className='cell'; cell.setAttribute('role','gridcell');
    const img=document.createElement('img'); img.className='symbol'; img.alt=''; img.draggable=false;
    cell.appendChild(img); grid.appendChild(cell); cells.push(cell);
  }
  function pick() {
    let n=Math.random()*weightTotal;
    for (const s of symbols) { n-=s.weight; if (n<0) return s; }
    return symbols[symbols.length-1];
  }
  function makeGrid() { return Array.from({length:25},pick); }
  function show(board) {
    board.forEach((s,i) => {
      const img=cells[i].firstElementChild;
      img.src=`../immortal-ways-buffalo-draft/assets/symbols/${s.id}.webp?v=spin-art-4`;
      img.alt=s.name;
      cells[i].dataset.symbol=s.id;
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
  function clearPaylineTrace() { paylineOverlay.querySelectorAll('.payline-segment').forEach(el=>el.remove()); }
  function clearMarks() { cells.forEach(c=>c.classList.remove('win-cell','win-final','bison-hit')); clearPaylineTrace(); grid.classList.remove('win-showing','win-summary'); document.querySelector('.meter').classList.remove('is-winning'); }
  function clearCurrentLine() { cells.forEach(c=>c.classList.remove('win-cell')); clearPaylineTrace(); }
  function drawPayline(path,count,totalMs) {
    const coords=Array.from({length:count},(_,col)=>({x:col+.5,y:path[col]+.5}));
    const points=coords.map(p=>`${p.x.toFixed(3)},${p.y.toFixed(3)}`).join(' ');
    const length=coords.slice(1).reduce((sum,p,i)=>sum+Math.hypot(p.x-coords[i].x,p.y-coords[i].y),0);
    for(const cls of ['payline-outline','payline-glow','payline-core']) {
      const line=document.createElementNS(svgNS,'polyline');
      line.setAttribute('points',points);line.setAttribute('stroke-dasharray',length.toFixed(3));line.setAttribute('stroke-dashoffset',length.toFixed(3));line.classList.add('payline-segment',cls);
      line.style.animationDuration=`${Math.round(totalMs)}ms`;
      paylineOverlay.appendChild(line);
    }
  }
  const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  async function showWinningLines(wins,winningCells,total,preview=false) {
    grid.classList.add('win-showing');
    document.querySelector('.meter').classList.add('is-winning');
    for(const win of wins) {
      clearCurrentLine();
      for(let col=0;col<win.result.count;col++) cells[win.path[col]*5+col].classList.add('win-cell');
      const symbolName=symbols.find(s=>s.id===win.result.symbol)?.name||'SÍMBOLO';
      message.textContent=`LÍNEA ${String(win.index+1).padStart(2,'0')} · ${symbolName.toUpperCase()} ×${win.result.count}`;
      winLabel.textContent=`+${win.amount.toFixed(2)}`;
      const lineTime=preview?2200:Math.max(220,Math.min(700,4500/wins.length));
      drawPayline(win.path,win.result.count,Math.round(lineTime*.72));
      await pause(lineTime);
    }
    cells.forEach(c=>c.classList.remove('win-cell'));
    for(const i of winningCells) cells[i].classList.add('win-final');
    grid.classList.remove('win-showing');
    grid.classList.add('win-summary');
    message.textContent=`${wins.length} LÍNEA${wins.length===1?'':'S'} CON PREMIO`;
    winLabel.textContent=`+${total.toFixed(2)}`;
    await pause(preview?1200:850);
  }
  async function settle(board,preview=false) {
    show(board); clearMarks();
    let total=0;
    const wins=[];const winningCells=new Set();
    PAYLINES.forEach((path,index)=>{
      const result=lineWin(board,path);
      if(result.amount>0){
        const amount=result.amount*lineStake;total+=amount;wins.push({index,path,result,amount});
        for(let col=0;col<result.count;col++) winningCells.add(path[col]*5+col);
      }
    });
    // Existing Bison accent remains unchanged; prize lines are a separate overlay.
    board.forEach((s,i)=>{
      if(s.id==='bison'){
        const c=cells[i]; c.classList.remove('bison-hit'); void c.offsetWidth; c.classList.add('bison-hit');
        setTimeout(()=>c.classList.remove('bison-hit'),650);
      }
    });
    balance += total;
    balanceLabel.textContent=balance.toFixed(2);
    if(total>0) await showWinningLines(wins,winningCells,total,preview);
    else { message.textContent='SIN PREMIO — ¡OTRA!'; winLabel.textContent='0.00'; }
  }
  function renderInitial(){ const b=makeGrid(); show(b); }
  async function spin(){
    if(spinButton.disabled) return;
    if(balance<bet){message.textContent='SALDO INSUFICIENTE';return;}
    balance-=bet; balanceLabel.textContent=balance.toFixed(2);
    spinButton.disabled=true; message.textContent='GIRANDO…'; winLabel.textContent='—'; clearMarks(); grid.classList.add('spinning');
    const timer=setInterval(()=>show(makeGrid()),85);
    await new Promise(resolve=>setTimeout(resolve,1050));
    clearInterval(timer); grid.classList.remove('spinning');
    const board=makeGrid(); await settle(board); spinButton.disabled=false;
  }
  spinButton.addEventListener('click',spin);
  const previewWin=document.getElementById('previewWin');
  if(previewWin) previewWin.addEventListener('click',async()=>{
    if(spinButton.disabled)return;
    spinButton.disabled=true;previewWin.disabled=true;
    const savedBalance=balance;
    const targetIndex=5;const target=PAYLINES[targetIndex];
    const bison=symbols.find(s=>s.id==='bison');const scatter=symbols.find(s=>s.id==='scatter');
    let board=null;
    for(let attempt=0;attempt<1200;attempt++){
      const candidate=makeGrid();
      for(let col=0;col<3;col++)candidate[target[col]*5+col]=bison;
      for(let col=3;col<5;col++)candidate[target[col]*5+col]=scatter;
      const wins=PAYLINES.map((path,index)=>({index,result:lineWin(candidate,path)})).filter(w=>w.result.amount>0);
      if(wins.length===1&&wins[0].index===targetIndex&&wins[0].result.count===3){board=candidate;break;}
    }
    if(!board){board=Array.from({length:25},()=>scatter);for(let col=0;col<3;col++)board[target[col]*5+col]=bison;}
    balance-=bet;balanceLabel.textContent=balance.toFixed(2);
    await settle(board,true);
    balance=savedBalance;balanceLabel.textContent=balance.toFixed(2);
    spinButton.disabled=false;previewWin.disabled=false;
  });
  renderInitial();
  function preloadAssets(){
    const screen=document.getElementById('loading');
    const fill=document.getElementById('loadingFill');
    const percent=document.getElementById('loadingPercent');
    const sources=['../immortal-ways-buffalo-draft/assets/frame/frame.webp','../immortal-ways-buffalo-draft/assets/loading/loading.webp','../immortal-ways-buffalo-draft/assets/buttons/spin-normal.webp','../immortal-ways-buffalo-draft/assets/buttons/spin-pressed.webp',...symbols.map(s=>`../immortal-ways-buffalo-draft/assets/symbols/${s.id}.webp?v=spin-art-4`)];
    let loaded=0;
    const tasks=sources.map(src=>new Promise(resolve=>{
      const image=new Image(); let finished=false;
      const done=()=>{if(finished)return;finished=true;loaded++;const value=Math.round(loaded/sources.length*100);if(fill)fill.style.width=`${value}%`;if(percent)percent.textContent=`${value}%`;resolve();};
      image.onload=done;image.onerror=done;image.src=src;if(image.complete)done();
    }));
    Promise.all(tasks).then(()=>setTimeout(()=>{spinButton.disabled=false;screen?.classList.add('is-hidden');setTimeout(()=>screen?.remove(),500)},180));
  }
  preloadAssets();
})();
