document.addEventListener("DOMContentLoaded", () => {
  const birthdaySong = document.getElementById("birthday-song");
  const playButton = document.getElementById("play-button");

  // Attempt to autoplay the song
  birthdaySong
    .play()
    .then(() => {
      console.log("Song started playing");
    })
    .catch((error) => {
      console.log("Autoplay failed, showing play button.");
      playButton.style.display = "block"; // Show the play button if autoplay fails
    });

  // If autoplay failed, let the user manually play the song
  playButton.addEventListener("click", () => {
    birthdaySong.play().catch((error) => {
      console.error("Error playing the audio:", error);
    });
    playButton.style.display = "none"; // Hide play button once clicked
  });

  // Fireworks animation setup
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const fireworks = [];
  const colors = ["#ff4757", "#1e90ff", "#2ed573", "#ffa502", "#ff6b81"];

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  class Firework {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.size = random(3, 5);
      this.speedX = random(-3, 3);
      this.speedY = random(-3, -7);
      this.opacity = 1;
      this.fadeSpeed = random(0.01, 0.03);
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.opacity -= this.fadeSpeed;
    }

    draw() {
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function createFireworks() {
    const fireworkCount = random(10, 20);
    const x = random(0, canvas.width);
    const y = random(canvas.height / 4, canvas.height / 2);
    const color = colors[Math.floor(random(0, colors.length))];
    for (let i = 0; i < fireworkCount; i++) {
      fireworks.push(new Firework(x, y, color));
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update();
      fireworks[i].draw();
      if (fireworks[i].opacity <= 0) {
        fireworks.splice(i, 1);
      }
    }
    requestAnimationFrame(animate);
  }

  setInterval(createFireworks, 800);
  animate();
});
