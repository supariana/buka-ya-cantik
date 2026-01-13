/* ===============================
   PASSWORD SYSTEM
================================ */

const PASSWORD = "1301";
let attempts = 0;
const maxAttempts = 3;

const passwordScreen = document.getElementById("passwordScreen");
const passwordInput = document.getElementById("passwordInput");
const passwordButton = document.getElementById("passwordButton");
const passwordError = document.getElementById("passwordError");

passwordButton.addEventListener("click", checkPassword);
passwordInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") checkPassword();
});

function checkPassword() {
    const input = passwordInput.value;

    if (input === PASSWORD) {
        passwordScreen.classList.add("fade-out");
        setTimeout(() => {
            passwordScreen.style.display = "none";
        }, 800);
    } else {
        attempts++;
        passwordInput.value = "";

        if (attempts < maxAttempts) {
            passwordError.textContent =
                `Password salah 💔 (${attempts}/${maxAttempts})`;
        } else {
            passwordError.innerHTML = `
                💖 Tidak apa-apa salah,
                yang penting kamu selalu benar
                di hatiku ❤️
            `;
            passwordInput.disabled = true;
            passwordButton.disabled = true;
        }
    }
}

/* ===============================
   COVER → MAIN TRANSITION
================================ */

const openButton = document.getElementById("openButton");
const cover = document.getElementById("cover");
const main = document.getElementById("main");

openButton.addEventListener("click", () => {
    cover.classList.add("fade-out");

    // ▶️ putar musik otomatis
    audioPlayer.play().catch(() => {});
    isPlaying = true;
    playPauseButton.querySelector(".icon").textContent = "⏸️";
    playPauseButton.querySelector(".text").textContent = "Pause";

    setTimeout(() => {
        cover.style.display = "none";
        main.classList.remove("hidden");
        initScrollAnimation();
    }, 800);
});


/* ===============================
   SCROLL ANIMATION
================================ */

function initScrollAnimation() {
    const sections = document.querySelectorAll(
        ".ucapan-section, .galeri-section, .musik-section"
    );

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.3 }
    );

    sections.forEach(section => observer.observe(section));
}

/* ===============================
   MUSIC PLAYER
================================ */
const audioPlayer = document.getElementById("audioPlayer");
const playPauseButton = document.getElementById("playPauseButton");
const icon = playPauseButton.querySelector(".icon");
const text = playPauseButton.querySelector(".text");

let isPlaying = false;

playPauseButton.addEventListener("click", () => {
    if (isPlaying) {
        audioPlayer.pause();
        icon.textContent = "▶️";
        text.textContent = "Play";
    } else {
        audioPlayer.play();
        icon.textContent = "⏸️";
        text.textContent = "Pause";
    }
    isPlaying = !isPlaying;
});


/* ===============================
   LOVE CANVAS ANIMATION
================================ */

const canvas = document.getElementById("loveCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class LoveParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 18 + 12;
        this.speedY = Math.random() * 0.6 + 0.2;
        this.opacity = Math.random() * 0.5 + 0.5;
    }

    update() {
        this.y -= this.speedY;
        if (this.y < -20) {
            this.y = canvas.height + 20;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.font = `${this.size}px Arial`;
        ctx.fillText("❤️", this.x, this.y);
        ctx.globalAlpha = 1;
    }
}

const particles = [];
for (let i = 0; i < 40; i++) {
    particles.push(new LoveParticle());
}

function animateLove() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateLove);
}

animateLove();

/* ===============================
   LIGHTBOX GALERI
================================ */
const imgs = document.querySelectorAll('.galeri-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');

imgs.forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

let zoomed = false;

lightboxImg.addEventListener('dblclick', () => {
    zoomed = !zoomed;
    lightboxImg.style.transform = zoomed ? 'scale(1.6)' : 'scale(1)';
});

