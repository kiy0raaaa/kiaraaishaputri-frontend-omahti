document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("togglePortoBtn");
  const btnText = document.getElementById("btnText");
  const btnIcon = document.getElementById("btnIcon");
  const hiddenCards = document.querySelectorAll(".porto-card.hidden");

  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    hiddenCards.forEach((card) => {
      // Hapus inline style 'display' bekas percobaan sebelumnya kalau ada
      card.style.removeProperty("display");

      // Toggle class hidden
      card.classList.toggle("hidden");
    });

    const isExpanded = !hiddenCards[0].classList.contains("hidden");

    if (isExpanded) {
      btnText.textContent = "Show Less";
      btnIcon.classList.add("arrow-up");
    } else {
      btnText.textContent = "Show More";
      btnIcon.classList.remove("arrow-up");
    }
  });
});
