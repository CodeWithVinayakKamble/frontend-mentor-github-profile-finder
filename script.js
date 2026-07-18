// Root Element
const rootElement = document.documentElement;


// Toggle Button
const toggleThemeBtn = document.getElementById("toggle-theme-btn");
const btnText = toggleThemeBtn.querySelector("#theme-btn-text");
const btnIcon = toggleThemeBtn.querySelector("#theme-btn-icon");
// 


toggleThemeBtn.addEventListener("click", () => {

    const currentTheme = rootElement.getAttribute("data-theme");

    if (currentTheme === "dark") {
        rootElement.setAttribute("data-theme", "light");
        btnText.textContent = "dark"
        btnIcon.classList.replace("fa-sun", "fa-moon")
        console.log("theme switched dark to light");

    } else {
        rootElement.setAttribute("data-theme", "dark")
        btnText.textContent = "light"
        btnIcon.classList.replace("fa-moon", "fa-sun")
        console.log("theme switched Light to Dark");
    }
})