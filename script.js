document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("togglePortoBtn");
  const btnText = document.getElementById("btnText");
  const btnIcon = document.getElementById("btnIcon");
  const hiddenCards = document.querySelectorAll(".porto-card.hidden");
  const menuToggle = document.querySelector(".menu-toggle");
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-links a");
  const authDialog = document.querySelector(".auth-dialog");
  const closeDialog = document.querySelector(".modal-close");
  const authOpeners = document.querySelectorAll("[data-auth-open]");
  const authTabs = document.querySelectorAll("[data-auth-tab]");
  const authForms = document.querySelectorAll("[data-auth-form]");
  const track = document.getElementById('testimonialTrack');
  const nextBtn = document.getElementById('nextTestiBtn');
  const prevBtn = document.getElementById('prevTestiBtn');
  const faqItems = document.querySelectorAll(".faq-item");
  const contactForm = document.getElementById("contact-form");
  let lastAuthOpener = null;

  if (toggleBtn && btnText && btnIcon && hiddenCards.length) {
    toggleBtn.addEventListener("click", () => {
      const isExpanded = toggleBtn.getAttribute("aria-expanded") !== "true";

      hiddenCards.forEach((card) => card.classList.toggle("hidden", !isExpanded));
      toggleBtn.setAttribute("aria-expanded", String(isExpanded));
      btnText.textContent = isExpanded ? "Show Less" : "Show More";
      btnIcon.classList.toggle("arrow-up", isExpanded);
    });
  }

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") !== "true";

      menuToggle.setAttribute("aria-expanded", String(isExpanded));
      menuToggle.setAttribute(
        "aria-label",
        isExpanded ? "Close navigation menu" : "Open navigation menu",
      );
      navbar.classList.toggle("is-open", isExpanded);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        navbar.classList.remove("is-open");
      });
    });
  }

  const getFieldError = (input) => input.nextElementSibling;

  const setFieldError = (input, message) => {
    const error = getFieldError(input);

    input.setAttribute("aria-invalid", String(Boolean(message)));
    if (error && error.classList.contains("field-error")) {
      error.textContent = message;
    }
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

    setFieldError(input, message);
    return !message;
  };

  const clearFormFeedback = (form) => {
    form.querySelectorAll("input, textarea").forEach((input) => {
      setFieldError(input, "");
    });
    const status = form.querySelector(".form-status");
    if (status) status.textContent = "";
  };

  const switchAuthForm = (formName) => {
    authForms.forEach((form) => {
      const isActive = form.dataset.authForm === formName;
      form.hidden = !isActive;
      clearFormFeedback(form);
    });

    authTabs.forEach((tab) => {
      const isActive = tab.dataset.authTab === formName;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    const title = document.getElementById("auth-title");
    if (title) title.textContent = formName === "signin" ? "Sign In" : "Sign Up";
  };

  if (authDialog instanceof HTMLDialogElement) {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && authDialog.open) authDialog.close();
    });

    authOpeners.forEach((button) => {
      button.addEventListener("click", () => {
        lastAuthOpener = button;
        switchAuthForm(button.dataset.authOpen);
        authDialog.showModal();
        authDialog.querySelector(`#${button.dataset.authOpen}-email`)?.focus();
      });
    });

    authTabs.forEach((tab) => {
      tab.addEventListener("click", () => switchAuthForm(tab.dataset.authTab));
    });

    closeDialog?.addEventListener("click", () => authDialog.close());

    authDialog.addEventListener("click", (event) => {
      if (event.target === authDialog) authDialog.close();
    });

    authDialog.addEventListener("close", () => {
      authForms.forEach((form) => {
        form.reset();
        clearFormFeedback(form);
      });
      lastAuthOpener?.focus();
    });

    authForms.forEach((form) => {
      form.querySelectorAll("input").forEach((input) => {
        input.addEventListener("input", () => validateInput(input));
      });

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const inputs = Array.from(form.querySelectorAll("input"));
        const isValid = inputs.map(validateInput).every(Boolean);
        const password = form.elements.namedItem("password");
        const confirmation = form.elements.namedItem("confirm-password");
        const status = form.querySelector(".form-status");

        if (
          isValid &&
          password instanceof HTMLInputElement &&
          confirmation instanceof HTMLInputElement &&
          password.value !== confirmation.value
        ) {
          setFieldError(confirmation, "Passwords do not match.");
          confirmation.focus();
          return;
        }

        if (!isValid || !status) return;

        status.textContent =
          form.dataset.authForm === "signin"
            ? "Sign in form submitted successfully."
            : "Sign up form submitted successfully.";
        form.reset();
        form.querySelectorAll("input").forEach((input) => {
          setFieldError(input, "");
        });
      });
    });
  }

  if (contactForm instanceof HTMLFormElement) {
    const contactStatus = document.getElementById("contact-status");
    const contactInputs = Array.from(
      contactForm.querySelectorAll("input, textarea"),
    );

    contactInputs.forEach((input) => {
      input.addEventListener("input", () => validateInput(input));
    });

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const isValid = contactInputs.map(validateInput).every(Boolean);

      if (!isValid) {
        contactInputs.find((input) => input.getAttribute("aria-invalid") === "true")?.focus();
        if (contactStatus) contactStatus.textContent = "";
        return;
      }

      contactForm.reset();
      contactInputs.forEach((input) => setFieldError(input, ""));
      if (contactStatus) contactStatus.textContent = "Your message is ready. Thank you!";
    });
  }

  if (track && nextBtn && prevBtn) {
    const slideDuration = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? 0
      : 400;
    let isSliding = false;

    const getCards = () => Array.from(track.children);

    const moveCards = (offset, animate) => {
      getCards().forEach((card) => {
        card.style.transition = animate
          ? `transform ${slideDuration}ms ease`
          : "none";
        card.style.transform = `translateX(${offset}px)`;
      });
    };

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

      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const step = track.firstElementChild.offsetWidth + gap;

      if (direction === "next") {
        // geser semua ke kiri, lalu kartu pertama pindah ke belakang
        moveCards(-step, true);
        setTimeout(() => {
          const moved = track.firstElementChild;
          track.appendChild(moved);
          resetCards();
          moved.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 });
          isSliding = false;
        }, slideDuration);
      } else {
        // kartu terakhir pindah ke depan, lalu semua geser ke kanan
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

  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      const summary = item.querySelector("summary");
      summary?.setAttribute("aria-expanded", String(item.open));
    });
  });

  const sections = ["about", "portfolio", "testimonial", "faq", "contact"]
    .map((id) => document.getElementById(id))
    .filter((section) => section instanceof HTMLElement);

  if ("IntersectionObserver" in window) {
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
          ".container-1, .container-2, .container-3, .container-4, .container-5, .container-6, .container-7, .porto-card",
        )
        .forEach((element) => {
          element.classList.add("reveal-ready");
          revealObserver.observe(element);
        });
    }
  }
});
