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


    // --- Rose Petal Animation ---
    const canvas = document.getElementById('sakura-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let petals = [];
        const numPetals = 35;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function Petal() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height * 2 - canvas.height;
            this.w = 35 + Math.random() * 20;
            this.h = 30 + Math.random() * 15;
            this.opacity = 0.7 + Math.random() * 0.3;
            this.xSpeed = 0.8 + Math.random() * 1.2;
            this.ySpeed = 0.8 + Math.random() * 1.2;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.03;
        }
        // function Petal() {
    //         this.x = Math.random() * canvas.width;
    //         this.y = Math.random() * canvas.height * 2 - canvas.height;
    //         this.w = 25 + Math.random() * 15;
    //         this.h = 20 + Math.random() * 10;
    //         this.opacity = this.w / 40;
    //         this.flip = Math.random();
    //         this.xSpeed = 1.5 + Math.random() * 2;
    //         this.ySpeed = 1 + Math.random() * 1;
    //         this.flipSpeed = Math.random() * 0.03;
    //     }

        // Petal.prototype.draw = function() {
        //     ctx.save();
        //     ctx.globalAlpha = this.opacity;
        //     ctx.translate(this.x, this.y);
        //     ctx.rotate(this.rotation);

        //     ctx.beginPath();
        //     ctx.moveTo(0, -this.h / 2);
        //     ctx.bezierCurveTo(
        //         this.w / 2, -this.h / 2,
        //         this.w / 2,  this.h / 2,
        //         0,           this.h / 2
        //     );
        //     ctx.bezierCurveTo(
        //         -this.w / 2, this.h / 2,
        //         -this.w / 2, -this.h / 2,
        //         0,           -this.h / 2
        //     );
        //     ctx.closePath();

        //     const gradient = ctx.createRadialGradient(0, 0, 1, 0, 0, this.w / 2);
        //     gradient.addColorStop(0, '#FF6B8A');
        //     gradient.addColorStop(1, '#C0003C');
        //     ctx.fillStyle = gradient;
        //     ctx.fill();
        //     ctx.restore();
        // }
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
            ctx.restore();
        }

        Petal.prototype.update = function() {
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            this.rotation += this.rotationSpeed;

            // Reset petal when it goes off screen
            if (this.y > canvas.height || this.x > canvas.width) {
                this.x = -this.w;
                this.y = -this.h;
                this.xSpeed = 0.8 + Math.random() * 1.2;
                this.ySpeed = 0.8 + Math.random() * 1.2;
            }
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
            petals.forEach(petal => petal.update());
            requestAnimationFrame(animate);
        }

        createPetals();
        animate();
    }


    // // --- Sakura Petal Animation ---
    // const canvas = document.getElementById('sakura-canvas');
    // if (canvas) {
    //     const ctx = canvas.getContext('2d');
    //     let petals = [];
    //     // const numPetals = 50;
    //     const numPetals = 35;

    //     function resizeCanvas() {
    //         canvas.width = window.innerWidth;
    //         canvas.height = window.innerHeight;
    //     }
    //     window.addEventListener('resize', resizeCanvas);
    //     resizeCanvas();

    //     function Petal() {
    //         this.x = Math.random() * canvas.width;
    //         this.y = Math.random() * canvas.height * 2 - canvas.height;
    //         this.w = 25 + Math.random() * 15;
    //         this.h = 20 + Math.random() * 10;
    //         this.opacity = this.w / 40;
    //         this.flip = Math.random();
    //         this.xSpeed = 1.5 + Math.random() * 2;
    //         this.ySpeed = 1 + Math.random() * 1;
    //         this.flipSpeed = Math.random() * 0.03;
    //     }

    //     Petal.prototype.draw = function() {
    //         if (this.y > canvas.height || this.x > canvas.width) {
    //             this.x = -this.w;
    //             this.y = Math.random() * canvas.height * 2 - canvas.height;
    //             this.xSpeed = 1.5 + Math.random() * 2;
    //             this.ySpeed = 1 + Math.random() * 1;
    //             this.flip = Math.random();
    //         }
    //         ctx.globalAlpha = this.opacity;
    //         ctx.beginPath();
    //         ctx.moveTo(this.x, this.y);
    //         ctx.bezierCurveTo(this.x + this.w / 2, this.y - this.h / 2, this.x + this.w, this.y, this.x + this.w / 2, this.y + this.h / 2);
    //         ctx.bezierCurveTo(this.x, this.y + this.h, this.x - this.w / 2, this.y, this.x, this.y);
    //         ctx.closePath();
    //         ctx.fillStyle = '#C0003C';
    //         ctx.fill();
    //     }

    //     Petal.prototype.update = function() {
    //         this.x += this.xSpeed;
    //         this.y += this.ySpeed;
    //         this.flip += this.flipSpeed;
    //         this.draw();
    //     }

    //     function createPetals() {
    //         petals = [];
    //         for (let i = 0; i < numPetals; i++) {
    //             petals.push(new Petal());
    //         }
    //     }

    //     function animate() {
    //         ctx.clearRect(0, 0, canvas.width, canvas.height);
    //         petals.forEach(petal => {
    //             petal.update();
    //         });
    //         requestAnimationFrame(animate);
    //     }

    //     createPetals();
    //     animate();
    // }
});

