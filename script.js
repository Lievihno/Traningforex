
(function(){
    emailjs.init("TON_PUBLIC_KEY"); // Remplace ici
})();

document.getElementById("contact-form")
.addEventListener("submit", function(event) {
    event.preventDefault();

    emailjs.sendForm(
        "TON_SERVICE_ID", 
        "TON_TEMPLATE_ID", 
        this
    )
    .then(function() {
        document.getElementById("success-message").style.display = "block";
        document.getElementById("contact-form").reset();
    }, function(error) {
        alert("Erreur lors de l'envoi");
    });
});

function openForm() {
    document.getElementById("popupForm").style.display = "flex";
}
function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}


// navbar sticky + changement style au scroll
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if(window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


// Fonction compteur animé
const counters = document.querySelectorAll(".counter");
const speed = 200; // plus petit = plus rapide

counters.forEach(counter => {
    const animate = () => {
        const value = +counter.getAttribute("data-target");
        const data = +counter.innerText;

        const increment = value / speed;

        if(data < value){
            counter.innerText = Math.ceil(data + increment);
            setTimeout(animate, 20);
        } else {
            counter.innerText = value;
        }
    }

    // Compter seulement quand la section est visible
    const observer = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting === true){
            animate();
            observer.unobserve(counter);
        }
    }, { threshold: 0.5 });

    observer.observe(counter);
});


// Animation de la section À propos
const aboutSection = document.querySelector('.about-premium');

const observerAbout = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.5 });

observerAbout.observe(aboutSection);



// Animation des témoignages
const testimonials = document.querySelectorAll('.testimonial-card');

const observerTestimonials = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.5 });

testimonials.forEach(card => observerTestimonials.observe(card));



// bouton retour en haut
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if(window.scrollY > 300){
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/*anim 1*/


const canvas = document.getElementById("tradingCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Points pour la courbe
let points = [];
const numberOfPoints = 100;

function initPoints() {
    points = [];
    for (let i = 0; i < numberOfPoints; i++) {
        points.push({
            x: i * (canvas.width / numberOfPoints),
            y: canvas.height / 2,
        });
    }
}
initPoints();

// Animation
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid();
    drawCurve();

    requestAnimationFrame(animate);
}

// Dessiner la grille
function drawGrid() {
    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 1;
    const gridSize = 80;

    // Lignes verticales
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // Lignes horizontales
    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// Dessiner la courbe animée
function drawCurve() {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
        points[i].y = canvas.height / 2 + Math.sin((Date.now() * 0.002) + i * 0.3) * 100;
        ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.strokeStyle = "#32CD32";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#32CD32";
    ctx.shadowBlur = 15;
    ctx.stroke();
}

animate();
