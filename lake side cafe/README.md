# Lake Side Cafe Website Editing Guide

This guide explains how to customize this cafe website for any client. You can change the cafe name, menu, images, location, opening hours, contact details, and colors without rebuilding the whole site.

## Project structure

```txt
lake side cafe/
├── index.html        # Main website content
├── css/
│   └── style.css     # Design, colors, layout, spacing, image styling
├── js/
│   └── script.js     # Interactions: menu popup, copy buttons, hours status
└── assets/           # Put all cafe images here
```

Most client-specific content is inside `index.html`.
Design and visual styling are inside `css/style.css`.
Interactive behavior and live opening-hours logic are inside `js/script.js`.

---

## 1. How to change the cafe name

Open `index.html` and search for:

```html
Lake Side Cafe
```

Also search for:

```html
lake side
```

Replace these with the new client name.

Example:

```html
<title>Lake Side Cafe</title>
```

Change to:

```html
<title>Orchid Cafe</title>
```

Also update the visible logo text:

```html
<a class="brand" href="#top" aria-label="Lake Side Cafe home">lake side</a>
```

Change to:

```html
<a class="brand" href="#top" aria-label="Orchid Cafe home">orchid</a>
```

If the cafe name is long, keep the logo text short. For example, use `orchid` instead of `Orchid Cafe & Restaurant`.

---

## 2. How to change the website description

In `index.html`, find this line near the top:

```html
<meta name="description" content="Lake Side Cafe — bold lakeside brunch, specialty coffee, and sunset plates by the water.">
```

Change the content to match the new cafe.

Example:

```html
<meta name="description" content="Orchid Cafe — Australian breakfast and brunch with Vietnamese soul in St Leonards.">
```

This description is useful for SEO and link previews.

---

## 3. How to change the hero headline and subtitle

In `index.html`, find the hero section:

```html
<h1 class="hero__title" aria-label="Lake Side Cafe">
    <span>L</span><span>A</span><span>K</span><span>E</span>
    <span>S</span><span>I</span><span>D</span><span>E</span>
</h1>
```

The large hero title is built letter by letter for animation.

For a new name like `ORCHID`, change it to:

```html
<h1 class="hero__title" aria-label="Orchid Cafe">
    <span>O</span><span>R</span><span>C</span><span>H</span><span>I</span><span>D</span>
</h1>
```

Then update the subtitle below it:

```html
<p class="hero__subtitle">Breakfast by the water. Coffee with a view. Dinner when the sky turns gold.</p>
```

Example:

```html
<p class="hero__subtitle">Australian breakfast and brunch infused with Vietnamese soul.</p>
```

---

## 4. How to add or change images

### Step 1: Add images to the `assets` folder

Put all client images inside:

```txt
assets/
```

Recommended image names:

```txt
assets/hero-coffee.jpg
assets/brunch.jpg
assets/burger.jpg
assets/pasta.jpg
assets/cooler.jpg
assets/interior.jpg
assets/lake-view.jpg
assets/dessert.jpg
```

Use simple lowercase filenames with no spaces.

Good:

```txt
coffee-latte.jpg
lake-view.webp
big-breakfast.png
```

Avoid:

```txt
My Cafe Image Final Version 2.jpg
```

### Step 2: Use the image in HTML

Basic image format:

```html
<img src="assets/coffee-latte.jpg" alt="Latte coffee with art on top">
```

The `src` is the image path.
The `alt` text should describe the image for accessibility.

---

## 5. How to replace illustrated food blocks with real images

The current website uses CSS illustration blocks for some food items.

Example:

```html
<div class="dish__visual dish__visual--latte">
    <span class="sticker">Coffee</span>
</div>
```

Replace it with:

```html
<div class="dish__visual">
    <span class="sticker">Coffee</span>
    <img src="assets/coffee-latte.jpg" alt="House latte with latte art">
</div>
```

Then make sure this CSS exists in `css/style.css`:

```css
.dish__visual img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}
```

Use `object-fit: cover;` when you want the image to fill the card nicely.

---

## 6. How to change hero poster images

In `index.html`, find poster cards like this:

```html
<div class="poster__art poster__art--cup" aria-hidden="true"><span></span></div>
```

Replace with a real image:

```html
<div class="poster__art">
    <img src="assets/hero-coffee.jpg" alt="Fresh coffee beside the lake">
</div>
```

Add this CSS in `css/style.css` if it is not already present:

```css
.poster__art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}
```

---

## 7. How to change gallery cards to real images

Current gallery card example:

```html
<article class="gallery-card gallery-card--wide reveal">
    <span>01</span>
    <h3>Window seats facing the water</h3>
</article>
```

Change it to:

```html
<article class="gallery-card gallery-card--wide gallery-card--image reveal">
    <img src="assets/interior.jpg" alt="Cafe interior with window seats">
    <span>01</span>
    <h3>Window seats facing the water</h3>
</article>
```

Add this CSS to `css/style.css`:

```css
.gallery-card--image {
    position: relative;
    overflow: hidden;
    color: var(--white);
}

.gallery-card--image img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
}

.gallery-card--image::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
        180deg,
        rgba(29, 11, 51, 0.15),
        rgba(29, 11, 51, 0.68)
    );
    z-index: 1;
}

.gallery-card--image span,
.gallery-card--image h3 {
    position: relative;
    z-index: 2;
}
```

This adds a dark overlay so text remains readable on top of the image.

---

## 8. How to change menu items

There are two menu areas:

1. Featured menu cards on the main page
2. Full menu popup dialog

### Main page featured menu

In `index.html`, find this section:

```html
<section class="section menu-section" id="menu" aria-labelledby="menuTitle">
```

Inside it, each dish looks like this:

```html
<article class="dish dish--hero reveal">
    <div class="dish__visual dish__visual--eggs"><span class="sticker">Best seller</span></div>
    <div class="dish__copy">
        <div class="dish__row"><h3>Lake Side Big Breakfast</h3><strong>₹420</strong></div>
        <p>Eggs your way, grilled tomato, mushrooms, hash brown, toast, and house relish.</p>
    </div>
</article>
```

To change the dish name:

```html
<h3>Lake Side Big Breakfast</h3>
```

To change the price:

```html
<strong>₹420</strong>
```

To change the description:

```html
<p>Eggs your way, grilled tomato, mushrooms, hash brown, toast, and house relish.</p>
```

Example:

```html
<div class="dish__row"><h3>Chicken Schnitzel Burger</h3><strong>$17.60</strong></div>
<p>House-made chicken schnitzel, chipotle mayo, slaw, cheese, and chips.</p>
```

### Full menu popup

Find this section near the bottom of `index.html`:

```html
<dialog class="menu-sheet" id="menuSheet" aria-labelledby="sheetTitle">
```

Each full menu line looks like this:

```html
<div class="menu-line"><b>Lake Side Big Breakfast</b><i></i><em>₹420</em><p>Eggs, toast, hash brown, mushrooms, tomato, relish.</p></div>
```

Change:

```html
<b>Dish Name</b>
<em>Price</em>
<p>Description</p>
```

Example:

```html
<div class="menu-line"><b>Avocado Toast</b><i></i><em>$15.00</em><p>Sourdough, smashed avocado, spinach, poached egg, fetta, and dukkah.</p></div>
```

---

## 9. How to change currency

Search for the current currency symbol:

```txt
₹
```

Replace it with the client's currency.

Examples:

```txt
₹420
$17.60
£12.50
AED 35
```

Keep pricing format consistent across the whole website.

---

## 10. How to change opening hours

Opening hours appear in two places:

1. Visible text in `index.html`
2. Live open/closed logic in `js/script.js`

### Change visible hours

In `index.html`, search for:

```txt
8am – 9pm
```

Replace it with the client's hours.

Example:

```txt
7:30am – 2:30pm
```

Also update related text like:

```html
<p>Open daily for breakfast, lunch, and evening snacks.</p>
```

Example:

```html
<p>Open Monday, Tuesday, Friday, and Saturday for breakfast and lunch.</p>
```

### Change live open/closed logic

Open `js/script.js` and find:

```js
const open = mins >= 480 && mins < 1260;
const text = open ? 'Open now · till 9pm' : (mins < 480 ? 'Closed · opens 8am' : 'Closed · opens tomorrow 8am');
```

Time is calculated in minutes after midnight.

Examples:

```txt
8:00am  = 480
9:00am  = 540
2:30pm  = 870
5:00pm  = 1020
9:00pm  = 1260
```

If the cafe opens at `7:30am` and closes at `2:30pm`, use:

```js
const open = mins >= 450 && mins < 870;
const text = open ? 'Open now · till 2:30pm' : (mins < 450 ? 'Closed · opens 7:30am' : 'Closed · opens tomorrow 7:30am');
```

### Change daily hours message

In `js/script.js`, find:

```js
open 8am – 9pm. Breakfast till noon, lunch after 11, evening snacks from 5.
```

Change it to the correct message.

Example:

```js
open 7:30am – 2:30pm. Breakfast all day, lunch from 11am.
```

---

## 11. How to handle closed days

If the cafe is open every day, the current JavaScript is fine.

If the cafe is closed on some days, add an open-days list in `js/script.js`.

Example: open Monday, Tuesday, Friday, Saturday only:

```js
const openDays = [true, true, false, false, true, true, false];
```

The order is:

```txt
Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
```

Then the open logic should check both day and time:

```js
const jsDay = new Date().getDay();
const dayIndex = jsDay === 0 ? 6 : jsDay - 1;
const open = openDays[dayIndex] && mins >= 450 && mins < 870;
```

Update the status text to mention the next open day if needed.

If you are not comfortable editing this logic, keep it simple and show fixed hours only in the HTML.

---

## 12. How to change address and map link

In `index.html`, find the visit section:

```html
<section class="section visit-section" id="visit" aria-labelledby="visitTitle">
```

Change this card:

```html
<article class="info-card info-card--yellow reveal">
    <span class="mono">Location</span>
    <h3>By the lake</h3>
    <p>Exact address goes here</p>
</article>
```

Example:

```html
<article class="info-card info-card--yellow reveal">
    <span class="mono">Location</span>
    <h3>38 Atchison St</h3>
    <p>St Leonards NSW 2065</p>
</article>
```

### Change the map button

Find:

```html
<a class="btn btn--sun" href="https://www.google.com/maps/search/?api=1&query=Lake+Side+Cafe" target="_blank" rel="noopener">
```

Replace the query with the cafe address.

Example:

```html
<a class="btn btn--sun" href="https://www.google.com/maps/search/?api=1&query=Orchid+Cafe+38+Atchison+St+St+Leonards+NSW+2065" target="_blank" rel="noopener">
```

Use `+` instead of spaces inside the URL.

---

## 13. How to change phone number and email

In `index.html`, find:

```html
<h3>+91 00000 00000</h3>
<button class="copy" type="button" data-copy="+91 00000 00000">Copy number</button>
```

Change both the visible number and the `data-copy` value.

Example:

```html
<h3>0423 245 052</h3>
<button class="copy" type="button" data-copy="0423 245 052">Copy number</button>
```

For email, find:

```html
<h3>hello@lakeside.cafe</h3>
<button class="copy" type="button" data-copy="hello@lakeside.cafe">Copy email</button>
```

Change both values:

```html
<h3>Info@orchidcafe.net</h3>
<button class="copy" type="button" data-copy="Info@orchidcafe.net">Copy email</button>
```

---

## 14. How to change reviews

Find the reviews section in `index.html`:

```html
<section class="reviews" id="reviews" aria-labelledby="reviewTitle">
```

Each review card looks like this:

```html
<article class="review-card">
    <span>★★★★★</span>
    <p>“Best place for a slow breakfast. The coffee is strong and the lake view makes everything better.”</p>
    <b>Aditi</b>
</article>
```

Change:

```html
<span>★★★★★</span>      # star rating
<p>Review text</p>        # customer review
<b>Customer name</b>      # reviewer name
```

Do not invent fake real reviews for a client unless they clearly ask for sample/demo content. Use real reviews provided by the client.

---

## 15. How to change colors

Open `css/style.css` and find the `:root` section at the top:

```css
:root {
    --paper: #fbf7ff;
    --foam: #e9f7ff;
    --lake: #47a9d6;
    --deep: #1d0b33;
    --reed: #6b8c42;
    --sun: #ffd43b;
    --coral: #ff8fb8;
    --white: #ffffff;
}
```

Change these color tokens instead of editing colors everywhere.

Common tokens:

```css
--paper   # main page background
--foam    # soft secondary background
--lake    # main blue accent
--deep    # text and border color
--reed    # green accent
--sun     # yellow button/sticker color
--coral   # pink accent
--white   # white surfaces
```

Example for a warmer cafe brand:

```css
--paper: #fff7ed;
--foam: #f3e7d3;
--lake: #c46a3a;
--deep: #24120b;
--reed: #7a5c2e;
--sun: #ffd166;
--coral: #e07a5f;
```

---

## 16. How to change fonts

The fonts are loaded in `index.html`:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Caprasimo&family=Instrument+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap">
```

The font variables are in `css/style.css`:

```css
--f-logo: "Caprasimo", "Cooper Black", Georgia, serif;
--f-display: "Anton", Impact, "Arial Narrow Bold", sans-serif;
--f-body: "Instrument Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
--f-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
```

If you change fonts, update both:

1. Google Fonts link in `index.html`
2. Font variables in `css/style.css`

For most clients, keep the fonts as they are and only change colors/content/images.

---

## 17. How to change footer details

In `index.html`, find:

```html
<footer class="footer" aria-label="Footer">
```

Update:

```html
<h2>lake side</h2>
```

Change to the client name:

```html
<h2>orchid</h2>
```

Update hours and mood text:

```html
<div><span class="mono">Hours</span><p>Open daily<br>8am – 9pm</p></div>
```

Example:

```html
<div><span class="mono">Hours</span><p>Mon, Tue, Fri, Sat<br>7:30am – 2:30pm</p></div>
```

Also update copyright:

```html
© <span id="year">2026</span> Lake Side Cafe
```

Example:

```html
© <span id="year">2026</span> Orchid Cafe
```

---

## 18. Recommended workflow for a new client

Follow this order:

1. Copy the whole project folder.
2. Rename the folder for the new client.
3. Add client images to `assets/`.
4. Update cafe name in `index.html`.
5. Update hero headline and subtitle.
6. Update menu items and prices.
7. Update location, phone, email, and map link.
8. Update hours in both `index.html` and `js/script.js`.
9. Replace CSS illustration blocks with real images where needed.
10. Change colors in `css/style.css` if the client has different branding.
11. Open `index.html` in a browser and test:
    - navigation links
    - full menu popup
    - copy buttons
    - map button
    - mobile layout

---

## 19. Common mistakes to avoid

### Wrong image path

Wrong:

```html
<img src="coffee.jpg">
```

Correct:

```html
<img src="assets/coffee.jpg" alt="Coffee cup on cafe table">
```

### Spaces in image filenames

Avoid:

```txt
hero image final.jpg
```

Use:

```txt
hero-image-final.jpg
```

### Changing only visible phone number

If you update this:

```html
<h3>0423 245 052</h3>
```

Also update this:

```html
data-copy="0423 245 052"
```

Otherwise the copy button will copy the old number.

### Changing hours only in HTML

If you change hours in `index.html`, also update `js/script.js`, otherwise the live open/closed badge may show the wrong time.

### Using huge images

Large images slow the website.

Recommended:

```txt
Hero image: 1600px wide
Gallery image: 1200px wide
Food image: 1000px wide
Format: .jpg or .webp
```

---

## 20. Quick checklist before delivery

Use this checklist for every client:

```txt
[ ] Cafe name updated
[ ] Website title updated
[ ] Meta description updated
[ ] Hero headline updated
[ ] Hero subtitle updated
[ ] Menu items updated
[ ] Prices updated
[ ] Full menu popup updated
[ ] Images added to assets folder
[ ] Image paths checked
[ ] Address updated
[ ] Google Maps link updated
[ ] Phone number updated
[ ] Email updated
[ ] Opening hours updated in HTML
[ ] Opening hours updated in JavaScript
[ ] Footer updated
[ ] Copy buttons tested
[ ] Menu popup tested
[ ] Mobile view checked
```

---

## 21. If you want to keep the same design but make it feel different

For each new client, change these four things:

1. **Color tokens** in `css/style.css`
2. **Hero headline and subtitle** in `index.html`
3. **Images** inside `assets/`
4. **Menu names and prices** in `index.html`

That is usually enough to make the same template feel custom for another cafe.
