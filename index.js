const menuToggle = document.getElementById("menu-toggle");
const menuClose = document.getElementById("menu-close");
const mobileMenu = document.getElementById("mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-link");

menuToggle.addEventListener("click", () => mobileMenu.classList.add("active"));
menuClose.addEventListener("click", () =>
  mobileMenu.classList.remove("active"),
);
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => mobileMenu.classList.remove("active"));
});

// 2. Typing Effect
const typingElement = document.getElementById("typing-text");
const roles = [
  "Full-Stack Developer",
  "React / Next.js / Vue / Nuxtjs / AngularSpecialist",
  "Node.js / NestJS & ASP .NET Engineer",
  "Paystack and Remita Integration Expert",
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function type() {
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    typingElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = 50;
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 100;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typingDelay = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingDelay = 500;
  }

  setTimeout(type, typingDelay);
}
type();

// 3. Experience Carousel
const expCarousel = document.getElementById("exp-carousel");
const expPrev = document.getElementById("exp-prev");
const expNext = document.getElementById("exp-next");
const expDots = document.querySelectorAll(".exp-dot");

expNext.addEventListener("click", () => {
  expCarousel.scrollLeft += expCarousel.offsetWidth;
});
expPrev.addEventListener("click", () => {
  expCarousel.scrollLeft -= expCarousel.offsetWidth;
});

expCarousel.addEventListener("scroll", () => {
  const index = Math.round(expCarousel.scrollLeft / expCarousel.offsetWidth);
  expDots.forEach((dot, i) => {
    dot.style.background = i === index ? "#00D4FF" : "rgba(255,255,255,0.2)";
  });
});

// 4. Testimonials Carousel
const testCarousel = document.getElementById("testimonial-carousel");
const testDots = document.querySelectorAll(".test-dot");
let currentTest = 0;

function autoSlideTestimonial() {
  currentTest = (currentTest + 1) % 3;
  testCarousel.scrollTo({
    left: testCarousel.offsetWidth * currentTest,
    behavior: "smooth",
  });
  updateTestDots(currentTest);
}

function updateTestDots(index) {
  testDots.forEach((dot, i) => {
    dot.style.background = i === index ? "#00D4FF" : "rgba(255,255,255,0.2)";
  });
}

let testimonialInterval = setInterval(autoSlideTestimonial, 5000);

testDots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    clearInterval(testimonialInterval);
    currentTest = i;
    testCarousel.scrollTo({
      left: testCarousel.offsetWidth * i,
      behavior: "smooth",
    });
    updateTestDots(i);
    testimonialInterval = setInterval(autoSlideTestimonial, 5000);
  });
});

// 5. Contact Form Logic
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const subject = encodeURIComponent(`Portfolio Enquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  );
  const mailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=nicholaslechi41@gmail.com&su=${subject}&body=${body}`;

  window.open(mailUrl, "_blank");
  contactForm.reset();
});

// 6. Intersection Observer for fade-up
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

// 7. Navbar Scroll Effect
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.classList.add("py-2", "bg-deep-navy/95", "shadow-xl");
    nav.classList.remove("py-4", "bg-deep-navy/80");
  } else {
    nav.classList.remove("py-2", "bg-deep-navy/95", "shadow-xl");
    nav.classList.add("py-4", "bg-deep-navy/80");
  }
});
