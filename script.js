// ========================================== //
// Selectors
// ========================================== //

const rootElement = document.documentElement;
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const toggleBtnText = themeToggleBtn.querySelector("#toggle-btn-text")
const toggleBtnIcon = themeToggleBtn.querySelector("#toggle-btn-icon")

// ========================================== //
// Theme Toggle
// ========================================== //
themeToggleBtn.addEventListener("click", () => {
    const currentTheme = rootElement.getAttribute("data-theme")
    if (currentTheme === "dark") {
        rootElement.setAttribute("data-theme", "light")
        toggleBtnText.textContent = "dark";
        toggleBtnIcon.textContent = "dark_mode"
    } else {
        rootElement.setAttribute("data-theme", "dark")
        toggleBtnText.textContent = "light";
        toggleBtnIcon.textContent = "light_mode"

    }
})

