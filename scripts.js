// TextScramble Effect - Optimized version
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
    this.frame = 0;
    this.queue = [];
    this.resolve = null;
    this.frameRequest = null;
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

// Initialize Text Scramble
function initTextScramble() {
  const phrases = [
    'Developer',
    'Tech Enthusiast',
    'Hacker',
    'AI Developer',
    'Python Developer',
    'Reverse Engineer',
    'Web Developer',
    'Robotics Engineer'
  ];

  const el = document.querySelector('.text');
  if (!el) return;

  const fx = new TextScramble(el);
  let counter = 0;
  let scrambleInterval = null;

  const next = () => {
    fx.setText(phrases[counter]).then(() => {});
    counter = (counter + 1) % phrases.length;
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        next();
        scrambleInterval = setInterval(next, 2000);
      } else {
        if (scrambleInterval) {
          clearInterval(scrambleInterval);
          scrambleInterval = null;
        }
      }
    });
  }, { threshold: 0.5 });

  observer.observe(el);
}

// Navbar Scroll Effect
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const profile = document.getElementById("navbar-profile");
  if (!navbar || !profile) return;

  let ticking = false;

  const updateNavbar = () => {
    if (window.scrollY > 100) {
      navbar.classList.remove("hidden");
      profile.classList.add("profile-transform");
    } else {
      navbar.classList.add("hidden");
      profile.classList.remove("profile-transform");
    }
    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  };

  window.addEventListener("scroll", requestTick, { passive: true });
}

// Contact form validation
function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const submitBtn = document.getElementById("submit-btn");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      alert("Please enter a valid email address");
      return;
    }

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      alert(`Thank you, ${nameInput.value}! Your message has been sent.`);
      submitBtn.textContent = "Send Message";
      submitBtn.disabled = false;
      this.reset();
    }, 1500);
  });
}

// Projects horizontal scrolling (legacy, safe to keep if needed)
function initProjectsScrolling() {
  const cardsContainer = document.querySelector(".cards-container");
  if (!cardsContainer) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  cardsContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - cardsContainer.offsetLeft;
    scrollLeft = cardsContainer.scrollLeft;
  });

  cardsContainer.addEventListener('mouseleave', () => { isDown = false; });
  cardsContainer.addEventListener('mouseup', () => { isDown = false; });

  cardsContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - cardsContainer.offsetLeft;
    const walk = (x - startX) * 2;
    cardsContainer.scrollLeft = scrollLeft - walk;
  });

  // Touch support
  cardsContainer.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - cardsContainer.offsetLeft;
    scrollLeft = cardsContainer.scrollLeft;
  }, { passive: true });

  cardsContainer.addEventListener('touchend', () => { isDown = false; });

  cardsContainer.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - cardsContainer.offsetLeft;
    const walk = (x - startX) * 2;
    cardsContainer.scrollLeft = scrollLeft - walk;
  }, { passive: true });
}

// Smooth scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}



// === Init All ===
document.addEventListener("DOMContentLoaded", function() {
  initTextScramble();
  initNavbar();
  initContactForm();
  initProjectsScrolling();
  initSmoothScrolling();

  // Disable right-click
  document.addEventListener('contextmenu', e => e.preventDefault());
});