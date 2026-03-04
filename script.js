
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
