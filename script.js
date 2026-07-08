const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const header = document.getElementById("header");

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");
const revealElements = document.querySelectorAll(".reveal");

function closeMenu() {
  if (!menuBtn || !navLinks) return;

  navLinks.classList.remove("active");
  document.body.classList.remove("menu-open");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.textContent = "☰";
}

function openMenu() {
  if (!menuBtn || !navLinks) return;

  navLinks.classList.add("active");
  document.body.classList.add("menu-open");
  menuBtn.setAttribute("aria-expanded", "true");
  menuBtn.textContent = "✕";
}

if (menuBtn && navLinks) {
  menuBtn.setAttribute("aria-label", "Toggle navigation menu");
  menuBtn.setAttribute("aria-expanded", "false");

  menuBtn.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

navItems.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("click", (event) => {
  if (!navLinks || !menuBtn) return;

  const clickedInsideMenu = navLinks.contains(event.target);
  const clickedMenuButton = menuBtn.contains(event.target);

  if (!clickedInsideMenu && !clickedMenuButton) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

function headerScrollEffect() {
  if (!header) return;

  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

function activeNavOnScroll() {
  let currentSection = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 145;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");

    if (item.getAttribute("href") === `#${currentSection}`) {
      item.classList.add("active");
    }
  });
}

function setupRevealAnimation() {
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("active");
    });
  }
}

function showWelcomeAlert() {
  if (typeof Swal === "undefined") return;

  Swal.fire({
    title: "Level 1: Welcome!",
    text: "Hi Mam Crystel, I am Zachary Navea. Start exploring my General Chemistry portfolio.",
    imageUrl: "crystel.jpg",
    imageWidth: 180,
    imageHeight: 180,
    imageAlt: "Zachary Navea profile picture",
    background: "#1b1b2f",
    color: "#fff3c4",
    confirmButtonText: "Start Game",
    confirmButtonColor: "#ffd447",
    customClass: {
      popup: "my-swal-popup",
      title: "my-swal-title",
      image: "my-swal-image"
    }
  });
}

window.addEventListener("scroll", () => {
  headerScrollEffect();
  activeNavOnScroll();
});

window.addEventListener("load", () => {
  setupRevealAnimation();
  headerScrollEffect();
  activeNavOnScroll();

  setTimeout(() => {
    showWelcomeAlert();
  }, 600);
});
