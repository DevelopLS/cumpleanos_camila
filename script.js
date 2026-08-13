const screens = [...document.querySelectorAll('.screen')];
const buttons = document.querySelectorAll('[data-next]');
const confettiCanvas = document.getElementById('confetti');
let typingTimer = null;

buttons.forEach(button => button.addEventListener('click', () => goTo(button.dataset.next)));

function goTo(id){
  screens.forEach(s => s.classList.remove('active'));
  const next = document.getElementById(id);
  if(!next) return;
  next.classList.add('active');
  const target = next.querySelector('.type');
  if(target) typeWriter(target);
  window.scrollTo({top:0, behavior:'smooth'});
}

function typeWriter(el){
  if(typingTimer) clearInterval(typingTimer);
  const text = el.dataset.text || '';
  el.textContent = '';
  let i = 0;
  typingTimer = setInterval(() => {
    el.textContent += text.charAt(i++);
    if(i >= text.length) clearInterval(typingTimer);
  }, 24);
}

function createFloaters(){
  const container = document.getElementById('floaters');
  const icons = ['💛','✨','🌼','🎈','🌷'];
  for(let i=0;i<24;i++){
    const el=document.createElement('span');
    el.className='floater';
    el.textContent=icons[Math.floor(Math.random()*icons.length)];
    el.style.left=Math.random()*100+'vw';
    el.style.fontSize=(14+Math.random()*14)+'px';
    el.style.animationDuration=(10+Math.random()*10)+'s';
    el.style.animationDelay=(-Math.random()*12)+'s';
    container.appendChild(el);
  }
}

function launchConfetti(){
  const c=confettiCanvas,ctx=c.getContext('2d');
  const dpr=Math.min(window.devicePixelRatio||1,2);
  c.width=innerWidth*dpr;c.height=innerHeight*dpr;c.style.width=innerWidth+'px';c.style.height=innerHeight+'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);
  const palette=['#e8a5b2','#ffd36c','#ffffff','#a875a1','#f0b6c2','#d49b45'];
  const pieces=Array.from({length:170},()=>({x:Math.random()*innerWidth,y:-40-Math.random()*innerHeight*.55,w:5+Math.random()*8,h:4+Math.random()*7,v:2+Math.random()*4,drift:-1+Math.random()*2,rot:Math.random()*Math.PI,spin:-.12+Math.random()*.24,color:palette[Math.floor(Math.random()*palette.length)]}));
  let frame=0;
  function draw(){
    ctx.clearRect(0,0,innerWidth,innerHeight);
    for(const p of pieces){p.y+=p.v;p.x+=p.drift+Math.sin(frame*.025+p.rot)*.5;p.rot+=p.spin;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.fillStyle=p.color;ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);ctx.restore()}
    frame++;
    if(frame<330) requestAnimationFrame(draw); else ctx.clearRect(0,0,innerWidth,innerHeight);
  }
  draw();
}

const candlesBtn=document.getElementById('candlesBtn');
const surprise=document.getElementById('surprise');
candlesBtn.addEventListener('click',()=>{
  surprise.classList.remove('hidden');
  candlesBtn.textContent='¡Feliz cumpleaños, Cami! 💛';
  candlesBtn.disabled=true;
  launchConfetti();
});

createFloaters();
window.addEventListener('resize',()=>{confettiCanvas.width=0;confettiCanvas.height=0});
