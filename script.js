const screens = document.querySelectorAll(".screen");
const buttons = document.querySelectorAll("[data-next]");
const smileBtn = document.getElementById("smileBtn");
const mission = document.getElementById("mission");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const next = button.dataset.next;
    goTo(next);
  });
});

function goTo(id) {
  screens.forEach(screen => screen.classList.remove("active"));

  const nextScreen = document.getElementById(id);
  nextScreen.classList.add("active");

  if (id === "loading") {
    setTimeout(() => goTo("trabajo"), 2600);
  }

  const typeTarget = nextScreen.querySelector(".type");
  if (typeTarget) {
    typeWriter(typeTarget);
  }
}

function typeWriter(element) {
  const text = element.dataset.text;
  element.textContent = "";

  let index = 0;

  const interval = setInterval(() => {
    element.textContent += text.charAt(index);
    index++;

    if (index >= text.length) {
      clearInterval(interval);
    }
  }, 32);
}

smileBtn.addEventListener("click", () => {
  mission.classList.remove("hidden");
  launchConfetti();
});

function createParticles() {
  const container = document.getElementById("particles");
  const icons = ["🌿", "🍃", "✨", "🌼"];

  for (let i = 0; i < 28; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.textContent = icons[Math.floor(Math.random() * icons.length)];

    particle.style.left = Math.random() * 100 + "vw";
    particle.style.animationDuration = Math.random() * 8 + 9 + "s";
    particle.style.animationDelay = Math.random() * 8 + "s";
    particle.style.fontSize = Math.random() * 10 + 14 + "px";

    container.appendChild(particle);
  }
}

createParticles();

function launchConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ["#9dcf8c", "#ffd39a", "#d7edff", "#ffffff", "#f7c59f"];

  for (let i = 0; i < 130; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      size: Math.random() * 7 + 4,
      speed: Math.random() * 2.6 + 1.5,
      angle: Math.random() * 360,
      spin: Math.random() * 0.14 - 0.07,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.7 + 0.3
    });
  }

  let frame = 0;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(piece => {
      piece.y += piece.speed;
      piece.x += Math.sin(frame * 0.025 + piece.angle) * 0.8;
      piece.angle += piece.spin;

      ctx.save();
      ctx.globalAlpha = piece.alpha;
      ctx.translate(piece.x, piece.y);
      ctx.rotate(piece.angle);
      ctx.fillStyle = piece.color;
      ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.65);
      ctx.restore();
    });

    frame++;

    if (frame < 290) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}

window.addEventListener("resize", () => {
  const canvas = document.getElementById("confetti");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
