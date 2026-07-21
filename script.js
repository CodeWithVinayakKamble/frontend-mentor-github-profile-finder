// ========================================== //
// Selectors
// ========================================== //

/* ==== Toggle Btn Selectors ==== */
const rootElement = document.documentElement;
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const toggleBtnText = themeToggleBtn.querySelector("#toggle-btn-text")
const toggleBtnIcon = themeToggleBtn.querySelector("#toggle-btn-icon")

/* ==== Form Selectors ==== */
const searchForm = document.getElementById("search-form");
const searchInput = searchForm.querySelector("#search-input");
const submitBtn = searchForm.querySelector("#submitForm")

/* ==== Section Profile Card Selectors ==== */
const profileCard = document.getElementById("profile-card");
// avatar
const profileCardAvatarWrapper = profileCard.querySelector(".profile-card__avatar-wrapper");
// identity
const profileCardName = profileCard.querySelector(".profile-card__name");
const profileCardHandle = profileCard.querySelector(".profile-card__handle");
const profileCardJoined = profileCard.querySelector(".profile-card__joined");
// bio
const userBio = profileCard.querySelector(".profile-card__bio-text");
// user Stats Value
const userStats = profileCard.querySelectorAll(".profile-card__stat-value");
// profile card links
const profileLocation = document.getElementById("location");
const profileBlog = document.getElementById("blog");
const profileTwitter = document.getElementById("twitter");
const profileCompany = document.getElementById("company");

// ========================================== //
// Helper Functions
// ========================================== //

/* ==== Converting api Date String into Readble Format ==== */
const getjoinedDate = (value) => {

    const date = new Date(value);
    let getDate = date.getDate();
    let getMonth = date.toLocaleString("en-us", { month: "short" });
    let getYear = date.getFullYear();

    let joinedDate = `Joined ${getDate} ${getMonth} ${getYear}`;
    return joinedDate;
}


// ==== Social link map function ====
const updateSocialLink = (elementId, dataValue) => {

    const textElement = document.getElementById(`${elementId}`);
    const parnetRow = textElement.closest(".profile-card__link-item");

    if (dataValue) {
        textElement.textContent = dataValue;
        parnetRow.style.opacity = "1"
    } else {
        textElement.textContent = "Not Available"
        parnetRow.style.opacity = "0.5"
    }
}




// ========================================== //
// Core Action Functions
// ========================================== //

/* ==== Get User Data from API ==== */
const getUserData = async (username) => {

    const apiResponce = await fetch(`https://api.github.com/users/${username}`);

    if (!apiResponce.ok || apiResponce.status === 404) {

        profileCardName.textContent = "User Not Found";


        profileCardHandle.textContent = "";
        profileCardJoined.textContent = "";

        userBio.textContent = "No profile data available.";

        userStats.forEach((value) => {
            value.textContent = "0";
        });

        updateSocialLink("location", null);
        updateSocialLink("blog", null);
        updateSocialLink("twitter", null);
        updateSocialLink("company", null);

        return;
    }

    const data = await apiResponce.json();
    const { avatar_url: avatar, name, login: handel, created_at: joinedDate, bio, public_repos: repos, followers, following, location, blog, twitter_username: twitter, company } = data;

    updateUI({ avatar, name, handel, joinedDate, bio, repos, followers, following, location, blog, twitter, company });
}

/* ==== Update UI Function ==== */
const updateUI = (user) => {

    profileCardAvatarWrapper.innerHTML = `<img class="profile-card__avatar" src="${user.avatar}" alt="${user.name}">`;

    profileCardName.textContent = user.name
    profileCardHandle.textContent = user.handel
    profileCardJoined.textContent = getjoinedDate(user.joinedDate);

    userBio.textContent = user.bio ? user.bio : "This Profile Has No Bio"

    userStats.forEach((value) => {
        if (value.id === "repos") value.textContent = user.repos;
        if (value.id === "followers") value.textContent = user.followers;
        if (value.id === "following") value.textContent = user.following;
    })

    updateSocialLink("location", user.location)
    updateSocialLink("blog", user.blog)
    updateSocialLink("twitter", user.twitter)
    updateSocialLink("company", user.company)

}


// ========================================== //
// Event Listeners / Triggers
// ========================================== //

/* ==== Theme Toggle ==== */
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


/* ==== Form Submittion Event ==== */
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = searchInput.value.trim();
    if (query) {
        getUserData(query);
    }
})
