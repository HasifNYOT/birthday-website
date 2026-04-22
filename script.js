document.addEventListener('DOMContentLoaded', function() {

    // --- Live Age Counter ---
    const birthDate = new Date('2006-08-14T00:00:00');
    const countdownElement = document.getElementById('countdown');

    function updateAge() {
        const now = new Date();

        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = now.getDate() - birthDate.getDate();
        let hours = now.getHours() - birthDate.getHours();
        let minutes = now.getMinutes() - birthDate.getMinutes();
        let seconds = now.getSeconds() - birthDate.getSeconds();

        if (seconds < 0) { seconds += 60; minutes--; }
        if (minutes < 0) { minutes += 60; hours--; }
        if (hours < 0) { hours += 24; days--; }
        if (days < 0) {
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
            months--;
        }
        if (months < 0) { months += 12; years--; }

        countdownElement.innerHTML = `${years}y ${months}m ${days}d <br> ${hours}h ${minutes}m ${seconds}s`;
    }
    setInterval(updateAge, 1000);
    updateAge();

    // --- Initialize AOS (Animate on Scroll) ---
    AOS.init({
        duration: 800,
        once: true,
    });

    // --- Initialize LightGallery ---
    lightGallery(document.getElementById('lightgallery'), {
        speed: 500,
        download: false
    });

    // --- Hall of Fame Scroller ---
    const scroller = document.getElementById('hall-of-fame-scroller');
    const scrollLeftBtn = document.getElementById('scroll-left-btn');
    const scrollRightBtn = document.getElementById('scroll-right-btn');
    if (scroller && scrollLeftBtn && scrollRightBtn) {
        const card = scroller.querySelector('.snap-center');
        const cardWidth = card.offsetWidth + parseInt(getComputedStyle(card.parentElement).gap);

        scrollRightBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });
        scrollLeftBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });
    }

    // --- Video Uploader ---
    const videoUploadInput = document.getElementById('video-upload');
    const videoPlayer = document.getElementById('video-player');
    const videoUploadLabel = document.getElementById('video-upload-label');

    if(videoUploadInput && videoPlayer && videoUploadLabel) {
        videoUploadLabel.addEventListener('click', () => {
            videoUploadInput.click();
        });

        videoUploadInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const videoURL = URL.createObjectURL(file);
                videoPlayer.src = videoURL;
                videoPlayer.classList.remove('hidden');
                videoUploadLabel.classList.add('hidden');
                videoPlayer.play();
            }
        });
    }


    // --- Sakura Petal Animation ---
    const canvas = document.getElementById('sakura-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let petals = [];
        // const numPetals = 50;
        const numPetals = 10;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function Petal() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height * 2 - canvas.height;
            this.w = 35 + Math.random() * 25;
            this.h = 30 + Math.random() * 20;
            this.opacity = this.w / 40;
            this.flip = Math.random();
            this.xSpeed = 1.5 + Math.random() * 2;
            this.ySpeed = 1 + Math.random() * 1;
            this.flipSpeed = Math.random() * 0.03;
        }

        Petal.prototype.draw = function() {
            if (this.y > canvas.height || this.x > canvas.width) {
                this.x = -this.w;
                this.y = Math.random() * canvas.height * 2 - canvas.height;
                this.xSpeed = 1.5 + Math.random() * 2;
                this.ySpeed = 1 + Math.random() * 1;
                this.flip = Math.random();
            }
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.bezierCurveTo(this.x + this.w / 2, this.y - this.h / 2, this.x + this.w, this.y, this.x + this.w / 2, this.y + this.h / 2);
            ctx.bezierCurveTo(this.x, this.y + this.h, this.x - this.w / 2, this.y, this.x, this.y);
            ctx.closePath();
            ctx.fillStyle = '#C0003C';
            ctx.fill();
        }

        Petal.prototype.update = function() {
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            this.flip += this.flipSpeed;
            this.draw();
        }

        function createPetals() {
            petals = [];
            for (let i = 0; i < numPetals; i++) {
                petals.push(new Petal());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            petals.forEach(petal => {
                petal.update();
            });
            requestAnimationFrame(animate);
        }

        createPetals();
        animate();
    }


    // --- Intro Screen ---
    const introScreen = document.getElementById('intro-screen');
    const enterBtn = document.getElementById('enter-btn');
    const bgMusic = document.getElementById('bg-music');
    const introCanvas = document.getElementById('intro-canvas');

    // Rose petals on intro screen too
    if (introCanvas) {
        const ictx = introCanvas.getContext('2d');
        let introPetals = [];
        introCanvas.width = window.innerWidth;
        introCanvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            introCanvas.width = window.innerWidth;
            introCanvas.height = window.innerHeight;
        });

        function IntroPetal() {
            this.x = Math.random() * introCanvas.width;
            this.y = Math.random() * introCanvas.height * 2 - introCanvas.height;
            this.w = 35 + Math.random() * 20;
            this.h = 30 + Math.random() * 15;
            this.opacity = 0.6 + Math.random() * 0.4;
            this.xSpeed = 0.8 + Math.random() * 1.2;
            this.ySpeed = 0.8 + Math.random() * 1.2;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.03;
        }

        IntroPetal.prototype.draw = function() {
            ictx.save();
            ictx.globalAlpha = this.opacity;
            ictx.translate(this.x, this.y);
            ictx.rotate(this.rotation);
            ictx.beginPath();
            ictx.moveTo(0, -this.h / 2);
            ictx.bezierCurveTo(this.w/2, -this.h/2, this.w/2, this.h/2, 0, this.h/2);
            ictx.bezierCurveTo(-this.w/2, this.h/2, -this.w/2, -this.h/2, 0, -this.h/2);
            ictx.closePath();
            const g = ictx.createRadialGradient(0, 0, 1, 0, 0, this.w / 2);
            g.addColorStop(0, '#FF6B8A');
            g.addColorStop(1, '#C0003C');
            ictx.fillStyle = g;
            ictx.fill();
            ictx.restore();
        }

        IntroPetal.prototype.update = function() {
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            this.rotation += this.rotationSpeed;
            if (this.y > introCanvas.height || this.x > introCanvas.width) {
                this.x = Math.random() * introCanvas.width;
                this.y = -this.h;
            }
            this.draw();
        }

        for (let i = 0; i < 30; i++) introPetals.push(new IntroPetal());

        function animateIntro() {
            if (!introScreen.classList.contains('hidden')) {
                ictx.clearRect(0, 0, introCanvas.width, introCanvas.height);
                introPetals.forEach(p => p.update());
                requestAnimationFrame(animateIntro);
            }
        }
        animateIntro();
    }

    // When button is clicked
    enterBtn.addEventListener('click', () => {
        // Start music
        bgMusic.volume = 0.5;
        bgMusic.play();

        // Fade out intro screen
        introScreen.style.transition = 'opacity 1.5s ease';
        introScreen.style.opacity = '0';

        setTimeout(() => {
            introScreen.classList.add('hidden');
        }, 1500);
    });
});

