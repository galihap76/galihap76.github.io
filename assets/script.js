const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".nav-link");
const navHome = document.querySelector("#home");
const navbarCollapse = document.getElementById("navbarNav");
const revealItems = document.querySelectorAll(".reveal");
const form = document.forms["galihap-contact-form"];
const btnSend = document.querySelector(".btn-send");
const btnLoading = document.querySelector(".btn-loading");
const successAlert = document.querySelector(".my-alert");
const errorAlert = document.querySelector(".my-alert2");
const scriptURL =
  "https://script.google.com/macros/s/AKfycbz_sB8gb_4w7mcsZ0SJSh18QXQyA0zSyf_Eei1jRSpHJwfrxlQtDhURqiTBXyPG3EFT/exec";

AOS.init({
  once: true,
});

function initCarousels() {
  if (!window.jQuery || !jQuery.fn.owlCarousel) return;

  $(".project-carousel").owlCarousel({
    loop: true,
    margin: 24,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    smartSpeed: 650,
    navText: [
      '<i class="bi bi-arrow-left" aria-hidden="true"></i>',
      '<i class="bi bi-arrow-right" aria-hidden="true"></i>',
    ],
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1200: { items: 3 },
    },
  });

  $(".certificate-carousel").owlCarousel({
    loop: true,
    margin: 24,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 4500,
    autoplayHoverPause: true,
    smartSpeed: 650,
    navText: [
      '<i class="bi bi-arrow-left" aria-hidden="true"></i>',
      '<i class="bi bi-arrow-right" aria-hidden="true"></i>',
    ],
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1200: { items: 4 },
    },
  });
}

function updateNavbarState() {
  nav.classList.toggle("is-scrolled", window.scrollY > 12);
}

function setActiveNavigation() {
  const sections = [
    ...document.querySelectorAll("main section[id], header[id]"),
  ];
  const currentSection = sections
    .filter((section) => section.getBoundingClientRect().top <= 120)
    .pop();

  navLinks.forEach((link) => {
    const target = link.getAttribute("href")?.replace("#", "");
    link.classList.toggle("active", target && currentSection?.id === target);
  });
}

function closeMobileMenu() {
  if (!navbarCollapse || !navbarCollapse.classList.contains("show")) return;

  const collapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse, {
    toggle: false,
  });

  collapse.hide();
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 35, 240)}ms`;
  revealObserver.observe(item);
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

navHome.addEventListener("click", () => {
  closeMobileMenu();
});

window.addEventListener("scroll", () => {
  updateNavbarState();
  setActiveNavigation();
});

updateNavbarState();
setActiveNavigation();
initCarousels();

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    btnLoading.classList.remove("d-none");
    btnSend.classList.add("d-none");
    successAlert.classList.add("d-none");
    errorAlert.classList.add("d-none");

    fetch(scriptURL, {
      method: "POST",
      body: new FormData(form),
      mode: "no-cors",
    })
      .then(() => {
        btnLoading.classList.add("d-none");
        btnSend.classList.remove("d-none");
        successAlert.classList.remove("d-none");
        form.reset();

        setTimeout(() => {
          successAlert.classList.add("d-none");
        }, 3500);
      })
      .catch(() => {
        btnLoading.classList.add("d-none");
        btnSend.classList.remove("d-none");
        errorAlert.classList.remove("d-none");

        setTimeout(() => {
          errorAlert.classList.add("d-none");
        }, 3500);
      });
  });
}
