
// TextScramble Effect
class TextScramble {
    constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
    }
    setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
    }
    update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
        complete++;
        output += to;
        } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
        } else {
        output += from;
        }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
        this.resolve();
    } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
    }
    }
    randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Phrases to scramble
const phrases = [
    'Developer',
    'Tech Enthusiast',
    'Hacker',
    'Ai developer',
    'Python Developer',
    'Reverse Engineer',
    'Web Developer',
    'Robotics Engineer'
];

const el = document.querySelector('.text');
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
    fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 1000); // Delay before next phrase
    });
    counter = (counter + 1) % phrases.length;
};

next();

// Navbar Scroll Effect
const navbar = document.getElementById("navbar");
const profile = document.getElementById("navbar-profile");

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
    navbar.classList.remove("hidden");
    profile.classList.add("profile-transform");
    } else {
    navbar.classList.add("hidden");
    profile.classList.remove("profile-transform");
    }
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById("dark-mode-toggle");
const darkModeIcon = document.getElementById("dark-mode-icon");
const moonIcon = document.getElementById("moon-icon");
const sunIcon = document.getElementById("sun-icon");

if (localStorage.getItem("dark-mode") === "enabled") {
    document.documentElement.classList.add("dark");
    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");
} else {
    document.documentElement.classList.remove("dark");
    moonIcon.classList.remove("hidden");
    sunIcon.classList.add("hidden");
}

darkModeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");

    if (document.documentElement.classList.contains("dark")) {
    localStorage.setItem("dark-mode", "enabled");
    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");
    } else {
    localStorage.setItem("dark-mode", "disabled");
    moonIcon.classList.remove("hidden");
    sunIcon.classList.add("hidden");
    }
});

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let submitBtn = document.getElementById("submit-btn");
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert("Message sent successfully!");
        submitBtn.textContent = "Send Message";
        submitBtn.disabled = false;
        document.getElementById("contact-form").reset();
    }, 2000);
});


document.addEventListener("DOMContentLoaded", function () {
    const cardsContainer = document.querySelector(".cards-container");
    cardsContainer.addEventListener("wheel", function (event) {
        if (cardsContainer.scrollLeft + cardsContainer.clientWidth < cardsContainer.scrollWidth) {
            event.preventDefault();
            cardsContainer.scrollLeft += event.deltaY;
        }
    });
});

// window.onload = function() {
//     document.addEventListener("click", function openFullscreen() {
//         if (document.documentElement.requestFullscreen) {
//             document.documentElement.requestFullscreen();
//         } else if (document.documentElement.mozRequestFullScreen) { // Firefox
//             document.documentElement.mozRequestFullScreen();
//         } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari
//             document.documentElement.webkitRequestFullscreen();
//         } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
//             document.documentElement.msRequestFullscreen();
//         }
//         document.removeEventListener("click", openFullscreen); // Remove listener after activation
//     });
// };