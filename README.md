# Frontend Mentor - GitHub User Search App (GitHub Profile Finder)

This is a clean, accessible, and highly responsive solution to the [GitHub user search app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/github-user-search-app-Q1t75Cx4S). The application is built using semantic HTML5, component-based CSS (BEM architecture), and asynchronous vanilla JavaScript.

---

## Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [What I Learned](#what-i-learned)
  - [AI Collaboration & Mentorship](#ai-collaboration--mentorship)

---

## Overview

### The Challenge

Users should be able to:
- Search for GitHub users by their username and view their profile card.
- See relevant user information based on their search (avatar, name, handle, date joined, bio, repos, followers, following, location, blog, twitter, company).
- Toggle between dark and light themes dynamically with smooth color transitions.
- View a fluid, responsive layout scaled across mobile (320px) up to tablet and desktop screen sizes.
- Receive immediate validation feedback showing "User Not Found" if the searched profile doesn't exist, resetting the UI to empty states.
- Access fully accessible interactive states (focus-visible outlines, contrast-compliant text states, and descriptive labels).

---

## My Process

### Built With

- **Semantic HTML5:** `<main>`, `<section>`, `<form>`, `<dl>`, `<dt>`, `<dd>`, `<h1>`, `<h2>`, `<button>`
- **CSS Custom Properties (Variables):** Dynamic color tokens, theme transition animations, and elevation shadow variables.
- **BEM (Block, Element, Modifier):** Reusable component class naming conventions.
- **Defensive CSS Grid & Flexbox:** Clean layout grids, aligned statistics boxes, and stacked footer layouts.
- **CSS Logical Properties:** Fluid sizing and padding using `inline-size`, `block-size`, `padding-inline`, and `margin-block`.
- **Vanilla JavaScript (Async/Await):** Asynchronous API fetch pipeline, structured JSON parsing, and defensive DOM manipulation.

---

### What I Learned

During this project, I learned to coordinate asynchronous network calls, manage runtime DOM scopes, resolve mobile layout overflows, and apply clean modular patterns:

#### 1. Overcoming Monospace Text Overflow (`min-inline-size: 0;`)
I learned that browsers assign an implicit `min-width: auto;` to grid/flex items and text inputs. Because monospace characters have wide physical boundaries, a long input placeholder (like `"Github username..."`) or a long footer text will force the card to expand, causing page overflow. I resolved this by applying the `min-inline-size: 0;` defensive reset to allow components to shrink freely:
```css
.search-bar__input {
  flex-grow: 1;
  outline: none;
  min-inline-size: 0; /* Overrides default browser minimum width guard */
}
```

#### 2. Clean Asynchronous Wrapper Patterns & Error Guards
I learned how to wrap fetch actions inside an `async/await` function, evaluate HTTP response status codes (like `404 Not Found`), and trigger a UI state reset to clear old search data on failure:
```javascript
const getUserData = async (username) => {
    const apiResponse = await fetch(`https://api.github.com/users/${username}`);

    if (!apiResponse.ok || apiResponse.status === 404) {
        profileCardName.textContent = "User Not Found";
        resetUI(); // Clears out old data
        return;
    }
    
    const data = await apiResponse.json();
    // parse and render...
}
```

#### 3. Object Destructuring with Key Aliasing
I learned how to write clean, ES6 destructuring statements to extract raw API keys and rename them to match my local variable conventions in a single line of code:
```javascript
const { 
  avatar_url: avatar, 
  login: handle, 
  created_at: joinedDate, 
  public_repos: repos, 
  twitter_username: twitter 
} = data;
```

#### 4. Formatting Raw ISO Dates
I learned how to parse raw ISO date strings from an external database and convert them into readable date strings locally using native date locales:
```javascript
const getjoinedDate = (value) => {
    const date = new Date(value);
    const day = date.getDate();
    const month = date.toLocaleString("en-us", { month: "short" });
    const year = date.getFullYear();

    return `Joined ${day} ${month} ${year}`;
}
```

#### 5. Dynamic Link Toggling and Opacity Control
I learned how to write a reusable helper function to map links, set default text fallback for empty fields, and target parent elements to dim their opacity dynamically:
```javascript
const updateSocialLink = (elementId, dataValue) => {
    const textElement = document.getElementById(elementId);
    const parentRow = textElement.closest(".profile-card__link-item");

    if (dataValue) {
        textElement.textContent = dataValue;
        parentRow.style.opacity = "1";
    } else {
        textElement.textContent = "Not Available";
        parentRow.style.opacity = "0.5";
    }
}
```

---

### AI Collaboration & Mentorship

This project was built under the guidance of **Antigravity**, a senior AI coding developer. Together, we analyzed design mocks, optimized browser rendering contexts, enforced semantic validation rules, and built clean, modular components.

---

## Credits & Resources

- **Typography:** [Space Mono Font](https://fonts.google.com/specimen/Space+Mono) via Google Fonts.
- **Theme Icons:** [Material Symbols Outlined](https://fonts.google.com/icons) via Google Fonts.
- **Social & Brand Icons:** [Font Awesome Free CDN](https://fontawesome.com/) for utility and brand vectors.
- **Data Source:** [GitHub Users API](https://docs.github.com/en/rest/users/users) for dynamic profile lookup.

---

## Author

- GitHub - [Vinayak Kamble](https://github.com/CodeWithVinayakKamble)

