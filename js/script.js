document.addEventListener("DOMContentLoaded", () => {

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const navLinks = document.querySelectorAll(".sidebar a, .nav-links a");

//menu toggle
let menuOpen = false;

function openMenu() {
  sidebar.classList.add("active");
  overlay.classList.add("active");
  menuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  menuOpen = true;
}

function closeMenu() {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  menuOpen = false;
}

menuBtn.addEventListener("click", () => {
  menuOpen ? closeMenu() : openMenu();
});

overlay.addEventListener("click", closeMenu);

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

//testimonial slides
const testimonials = document.querySelectorAll(".testimonial");
let currentTestimonial = 0;

function showTestimonial(index) {
  testimonials.forEach(t => t.classList.remove("active"));
  testimonials[index].classList.add("active");
}

if (testimonials.length > 0) {
  showTestimonial(currentTestimonial);

  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }, 5000);
}

//form validation
const form = document.querySelector(".contact-form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputs = form.querySelectorAll("input, textarea, select");

    let valid = true;
    let message = "";

    inputs.forEach(input => {
      if (input.hasAttribute("required") && input.value.trim() === "") {
        valid = false;
        message = "Please fill in all required fields.";
      }
    });

    const email = form.querySelector('input[type="email"]');
    if (email && !email.value.includes("@")) {
      valid = false;
      message = "Please enter a valid email address.";
    }

    const phone = form.querySelector('input[type="tel"]');
    if (phone && phone.value.length < 10) {
      valid = false;
      message = "Please enter a valid phone number.";
    }

    if (!valid) {
      showToast(message, "error");
      return;
    }

    showToast("Message sent successfully! We will contact you soon.", "success");
    form.reset();
  });
}

//toast notify
function showToast(message, type) {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

//navbar scroll effect
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.15)";
    header.style.padding = "10px 30px";
  } else {
    header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.05)";
    header.style.padding = "15px 30px";
  }
});

//menu active state on scroll
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let scrollPos = window.scrollY + 120;

  sections.forEach(sec => {
    if (
      scrollPos > sec.offsetTop &&
      scrollPos < sec.offsetTop + sec.offsetHeight
    ) {
      document.querySelectorAll(".nav-links a").forEach(a => {
        a.classList.remove("active");
        if (a.getAttribute("href") === `#${sec.id}`) {
          a.classList.add("active");
        }
      });
    }
  });
});

});