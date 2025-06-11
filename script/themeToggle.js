export function setupThemeToggle(
  toggleBtnId = "toggleBtn",
  modeTextId = "mode-text"
) {
  const darkTheme = "dark-theme";

  const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? "dark" : "light";

  const applyTheme = () => {
    const toggleBtn = document.getElementById(toggleBtnId);
    const modeText = document.getElementById(modeTextId);

    if (getCurrentTheme() === "dark") {
      toggleBtn.checked = true;
      modeText && (modeText.textContent = "Dark Mode");
    } else {
      toggleBtn.checked = false;
      modeText && (modeText.textContent = "Light Mode");
    }
  };

  const savedTheme = localStorage.getItem("selected-theme");
  if (savedTheme === "dark") {
    document.body.classList.add(darkTheme);
  }
  applyTheme();
  const toggleBtn = document.getElementById(toggleBtnId);
  toggleBtn?.addEventListener("change", () => {
    document.body.classList.toggle(darkTheme);
    localStorage.setItem("selected-theme", getCurrentTheme());
    applyTheme();
  });
}
