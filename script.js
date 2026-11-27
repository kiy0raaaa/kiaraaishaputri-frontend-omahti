document.addEventListener("DOMContentLoaded", () => {
  // ===== Portofolio: Show More / Show Less =====
  const toggleBtn = document.getElementById("togglePortoBtn");
  const btnText = document.getElementById("btnText");
  const btnIcon = document.getElementById("btnIcon");
  const hiddenCards = document.querySelectorAll(".porto-card.hidden");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isExpanded = toggleBtn.getAttribute("aria-expanded") !== "true";

      hiddenCards.forEach((card) =>
        card.classList.toggle("hidden", !isExpanded),
      );
      toggleBtn.setAttribute("aria-expanded", String(isExpanded));
      btnText.textContent = isExpanded ? "Show Less" : "Show More";
      btnIcon.classList.toggle("arrow-up", isExpanded);
    });
  }

  // ===== Navbar: hamburger menu =====
  const menuToggle = document.querySelector(".menu-toggle");
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-links a");

  const setMenu = (isOpen) => {
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
    navbar.classList.toggle("is-open", isOpen);
  };

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    // menu ditutup lagi setelah salah satu link diklik
    navLinks.forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });
  }

  // ===== Validasi form (dipakai Sign In, Sign Up, dan Contact) =====
  const showError = (input, message) => {
    const error = input.nextElementSibling;

    input.setAttribute("aria-invalid", String(Boolean(message)));
    if (error) error.textContent = message;
  };

  const validateInput = (input) => {
    let message = "";

    if (input.validity.valueMissing) {
      message = "This field is required.";
    } else if (input.validity.typeMismatch) {
      message = "Enter a valid email address.";
    } else if (input.validity.tooShort) {
      message = "Use at least 8 characters.";
    }

    showError(input, message);
    return message === "";
  };

  // cek semua input di form, return true kalau semuanya valid
  const validateForm = (form) => {
    let isValid = true;

    form.querySelectorAll("input, textarea").forEach((input) => {
      if (!validateInput(input)) isValid = false;
    });
    return isValid;
  };

  const clearErrors = (form) => {
    form.querySelectorAll("input, textarea").forEach((input) => {
      showError(input, "");
    });
  };

  // ===== Modal Sign In / Sign Up =====
  const authDialog = document.querySelector(".auth-dialog");
  const closeDialog = document.querySelector(".modal-close");
  const authOpeners = document.querySelectorAll("[data-auth-open]");
  const authTabs = document.querySelectorAll("[data-auth-tab]");
  const authForms = document.querySelectorAll("[data-auth-form]");

  const switchAuthForm = (formName) => {
    authForms.forEach((form) => {
      form.hidden = form.dataset.authForm !== formName;
      clearErrors(form);
      form.querySelector(".form-status").textContent = "";
    });

    authTabs.forEach((tab) => {
      tab.classList.toggle("is-active", tab.dataset.authTab === formName);
    });

    document.getElementById("auth-title").textContent =
      formName === "signin" ? "Sign In" : "Sign Up";
  };

  if (authDialog) {
    authOpeners.forEach((button) => {
      button.addEventListener("click", () => {
        switchAuthForm(button.dataset.authOpen);
        authDialog.showModal();
      });
    });

    authTabs.forEach((tab) => {
      tab.addEventListener("click", () => switchAuthForm(tab.dataset.authTab));
    });

    closeDialog.addEventListener("click", () => authDialog.close());

    // klik di luar kotak dialog (area gelap) = tutup.
    // Pakai koordinat, soalnya padding dialog juga dianggap "klik dialog".
    authDialog.addEventListener("click", (event) => {
      const box = authDialog.getBoundingClientRect();
      const isOutside =
        event.clientX < box.left ||
        event.clientX > box.right ||
        event.clientY < box.top ||
        event.clientY > box.bottom;

      if (isOutside) authDialog.close();
    });

    // form dikosongkan setiap dialog ditutup (Esc sudah bawaan <dialog>)
    authDialog.addEventListener("close", () => {
      authForms.forEach((form) => {
        form.reset();
        clearErrors(form);
      });
    });

    authForms.forEach((form) => {
      form.querySelectorAll("input").forEach((input) => {
        input.addEventListener("input", () => validateInput(input));
      });

      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const isValid = validateForm(form);
        const password = form.elements["password"];
        const confirmation = form.elements["confirm-password"]; // cuma ada di Sign Up

        if (isValid && confirmation && password.value !== confirmation.value) {
          showError(confirmation, "Passwords do not match.");
          confirmation.focus();
          return;
        }

        if (!isValid) return;

        form.reset();
        clearErrors(form);
        form.querySelector(".form-status").textContent =
          form.dataset.authForm === "signin"
            ? "Sign in form submitted successfully."
            : "Sign up form submitted successfully.";
      });
    });
  }

  // ===== Form Contact =====
  const contactForm = document.getElementById("contact-form");
  const contactStatus = document.getElementById("contact-status");

  if (contactForm) {
    contactForm.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("input", () => validateInput(input));
    });

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!validateForm(contactForm)) {
        contactStatus.textContent = "";
        contactForm.querySelector("[aria-invalid='true']").focus();
        return;
      }

      contactForm.reset();
      clearErrors(contactForm);
      contactStatus.textContent = "Your message is ready. Thank you!";
    });
  }

  // ===== Testimoni: carousel yang berputar =====
  // Klik kanan: kartu paling kiri pindah ke belakang.
  // Klik kiri: kartu paling kanan pindah ke depan.
  const track = document.getElementById("testimonialTrack");
  const nextBtn = document.getElementById("nextTestiBtn");
  const prevBtn = document.getElementById("prevTestiBtn");

  if (track && nextBtn && prevBtn) {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const slideDuration = reduceMotion ? 0 : 400;
    let isSliding = false; // biar klik beruntun tidak merusak urutan kartu

    const getCards = () => Array.from(track.children);

    const moveCards = (offset, animate) => {
      getCards().forEach((card) => {
        card.style.transition = animate
          ? `transform ${slideDuration}ms ease`
          : "none";
        card.style.transform = `translateX(${offset}px)`;
      });
    };

    // kembalikan style kartu ke aturan di CSS
    const resetCards = () => {
      getCards().forEach((card) => {
        card.style.transition = "none";
        card.style.transform = "";
      });
      track.offsetWidth; // paksa browser render ulang
      getCards().forEach((card) => {
        card.style.transition = "";
      });
    };

    const slideTestimonials = (direction) => {
      if (isSliding) return;
      isSliding = true;

      // jarak geser = lebar 1 kartu + gap
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const step = track.firstElementChild.offsetWidth + gap;

      if (direction === "next") {
        moveCards(-step, true);
        setTimeout(() => {
          const moved = track.firstElementChild;
          track.appendChild(moved);
          resetCards();
          moved.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 });
          isSliding = false;
        }, slideDuration);
      } else {
        track.prepend(track.lastElementChild);
        moveCards(-step, false);
        track.offsetWidth;
        moveCards(0, true);
        setTimeout(() => {
          resetCards();
          isSliding = false;
        }, slideDuration);
      }
    };

    nextBtn.addEventListener("click", () => slideTestimonials("next"));
    prevBtn.addEventListener("click", () => slideTestimonials("prev"));
  }

  // ===== Link navbar aktif sesuai posisi scroll =====
  const sections = ["about", "portfolio", "testimonial", "faq", "contact"].map(
    (id) => document.getElementById(id),
  );

  const activeSectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          if (link.hash === `#${entry.target.id}`) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    { rootMargin: "-25% 0px -65% 0px" },
  );

  sections.forEach((section) => activeSectionObserver.observe(section));

  // ===== Animasi muncul saat di-scroll =====
  // (hero tidak ikut, karena sudah kelihatan dari awal)
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );

    document
      .querySelectorAll(
        ".container-2, .container-3, .container-4, .container-5, .container-6, .container-7, .porto-card",
      )
      .forEach((element) => {
        element.classList.add("reveal-ready");
        revealObserver.observe(element);
      });
  }
});