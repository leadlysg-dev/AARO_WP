# AARO Website — Static HTML Skeleton

**Asian Alliance Radiation & Oncology · aaro.sg**
Built as a static HTML skeleton, designed for a clean conversion to a WordPress theme.

---

## 📦 What's in this folder

| Folder / file | What it is |
|---|---|
| `index.html` | Home page |
| `about.html`, `contact.html`, `second-opinion.html`, `for-clinicians.html`, `financing.html`, `faqs.html`, `careers.html` | The seven other top-level pages |
| `our-specialists/` | 1 doctor archive page + 7 individual specialist profile pages |
| `cancers-we-treat/` | 1 cancer archive page + 12 individual cancer pages |
| `our-treatments/` | 1 treatments archive page + 5 treatment pages (SBRT, SRS, VMAT/IMRT, Brachytherapy, Chemotherapy) |
| `our-clinics/` | 1 clinic archive page + 6 individual clinic pages |
| `patient-stories/` | 1 stories archive page + 3 sample patient story pages |
| `style.css` | Single-file stylesheet — all design tokens, components, and layout. Mobile-first. |
| `scripts.js` | Mobile nav drawer, FAQ accordion, current-page highlighter |
| `assets/images/` | Empty image folders, organised by category — drop real photos in here using the filenames in the shotlist |
| `assets/icons/` | Empty — for any SVG icons added later |
| `image-shotlist.md` | Photographer's brief — every image slot in the site, by category, with filename, dimensions, and which pages use it |
| `README.md` | This file |

**Total: 46 HTML pages.** All previewable locally. No build step required.

---

## ▶️ How to preview

### Quickest way (any modern browser)

1. Unzip the folder.
2. Double-click `index.html`. The site opens in your default browser.
3. Click any link — every page is wired up. The mobile nav, FAQ accordions, and current-page highlight all work.

### Slightly fancier way (recommended for clean URLs)

If you have Python installed, open a terminal in this folder and run:

```bash
python3 -m http.server 8000
```

Then visit **http://localhost:8000** in your browser. This serves the site over HTTP, which avoids any quirks with `file://` paths.

---

## 🎨 What's already styled vs what's a placeholder

### Already styled (v1.1 — moodboard-aligned)
- Design system follows the AARO moodboard "Clinical" palette: Navy `#0B2240`, Teal `#0A7E6A`, Surface `#F4F7FB`. Cormorant Garamond for display, **Inter** for body, DM Mono for meta.
- Home, About, Specialists index, Dr Daniel Tan profile, Second Opinion, Patient Stories index, Adam Road CSR clinic, and SBRT treatment pages all use **real photography** — supplied by AARO. Other pages still use refined placeholders.
- Home page hero now follows the moodboard pattern: white background, content stacked above a 16:9 hero image (the four senior doctors at the Elekta Linac).
- Every component used across the site: hero blocks, doctor cards, cancer tiles, treatment cards, story cards, clinic cards, breadcrumbs, FAQ accordion, CTA bands, footer.
- Mobile-first responsive design. Breakpoints at 640 / 1024 / 1280 px.
- A consistent grey image-placeholder pattern (with category tag, filename, and dimensions) — replace these with real images when ready.

### Placeholders / TBC
- Every spot where the audit content brief said "rewrite as instructions" instead of providing final copy is marked with a yellow `[CONTENT TBC]` block. Search the codebase for `class="tbc"` to find every one — there are around 90 of them, mostly inside the cancer, doctor, treatment, clinic and story templates.
- Image slots are styled placeholders showing category, filename, and dimensions. See `image-shotlist.md` for the full list.

### Where final Excel content was used directly
- Home: hero, mission/why, full sections
- About: full timeline 2010–2018, mission, vision, who/what
- Second Opinion: full content (fears + 4-step process)
- For Clinicians: full content (referral indications, pathway, contact)
- Contact, Financing, FAQs, Careers: full structure with key copy
- Breast Cancer page: full 5-section content (What is / Symptoms / Mammogram / Risk / Treatment)
- Prostate Cancer page: full content including the SBRT-vs-surgery framing, stage-by-stage selector, SpaceOAR explainer, and full FAQ block
- Dr Daniel Tan profile: full 10-section bio, publications, "when to see me", linked patient story

---

## 🛠 How this becomes a WordPress theme

This skeleton was built to be straightforward to convert. The conventions below make conversion mechanical rather than interpretive.

### 1. Header and footer are byte-identical across all pages

Every HTML file uses exactly the same header markup (between `<!-- @wp:get_header() -->` and `<!-- @wp:get_header_end -->`) and exactly the same footer markup (between `<!-- @wp:get_footer() -->` and `<!-- @wp:wp_footer() -->`). The only difference between pages is the path prefix (`""` vs `"../"`). When porting:

- Copy the header block into `header.php`.
- Copy the footer block into `footer.php`.
- Replace the static nav `<ul>` with `<?php wp_nav_menu( ['theme_location' => 'primary', 'container' => false] ); ?>` — the `<!-- @wp:wp_nav_menu(primary) -->` comment marks the exact spot.
- Footer columns are marked with `<!-- @wp:dynamic_sidebar(footer-1) -->` etc. — replace these with `<?php dynamic_sidebar( 'footer-1' ); ?>`.

### 2. Body classes match WP template names

Every page has a body class indicating what kind of WP template it should become:

| HTML file pattern | `body class` | Becomes WP template |
|---|---|---|
| `index.html` | `page-home` | `front-page.php` |
| `about.html`, `contact.html`, `careers.html`, etc. | `page-{slug}` | `page-{slug}.php` (or just `page.php` with conditional content) |
| `our-specialists/index.html` | `archive-doctors` | `archive-doctor.php` |
| `our-specialists/dr-daniel-tan.html` | `single-doctor` | `single-doctor.php` |
| `cancers-we-treat/index.html` | `archive-cancers` | `archive-cancer.php` |
| `cancers-we-treat/breast-cancer.html` | `single-cancer` | `single-cancer.php` |
| `our-treatments/index.html` | `archive-treatments` | `archive-treatment.php` |
| `our-treatments/sbrt.html` | `single-treatment` | `single-treatment.php` |
| `our-clinics/index.html` | `archive-clinics` | `archive-clinic.php` |
| `our-clinics/adam-road-csr.html` | `single-clinic` | `single-clinic.php` |
| `patient-stories/index.html` | `archive-stories` | `archive-story.php` |
| `patient-stories/helen-saada-ching.html` | `single-story` | `single-story.php` |

The four custom post types you'll register are: **doctor**, **cancer**, **treatment**, **clinic**, **story**.

### 3. Inline WordPress markers

Throughout the HTML, you'll find HTML comments like:

```html
<!-- @wp:the_content() -->
<!-- @wp:dynamic_sidebar(header-utility) -->
<!-- @wp:wp_head() -->
<!-- @wp:wp_nav_menu(primary) -->
<!-- @wp:body_open() -->
```

These aren't doing anything functionally — they're signposts for the developer porting the templates. Each one indicates the WP function that belongs at that spot.

### 4. CSS is theme-ready

`style.css` already begins with the standard WordPress theme metadata block (Theme Name, Description, Version, Author). Once you rename it `style.css` inside the theme folder, WP will pick it up. The theme name field can be edited if needed.

### 5. Suggested ACF (Advanced Custom Fields) groups

For clean content management, suggested field groups for each custom post type:

- **Doctor**: name, role_short, role_long, qualifications, focus_tags (taxonomy), specialties_one_line, bio (rich text), publications (repeater: title + meta), when_to_see (repeater: list item), linked_stories (relationship to Story CPT).
- **Cancer**: name, tagline, intro_paragraphs (rich text), symptoms (rich text), diagnosis (rich text), risk_factors (rich text), treatment_approach (rich text), specialists (relationship to Doctor CPT), treatments_used (relationship to Treatment CPT), featured_story (relationship to Story CPT).
- **Treatment**: name, name_full, tagline, what_summary, how_it_works (rich text), used_for (repeater: cancer + 1-line context), what_to_expect (rich text), side_effects (rich text), comparison (rich text), sessions, cost_block (rich text).
- **Clinic**: name, name_short, tagline, is_flagship (boolean), address, phone, opening_hours, public_transport, parking, doctors_on_site (relationship to Doctor CPT), gallery_images (gallery).
- **Story**: name, cancer_tag, treatment, doctor (relationship to Doctor CPT), pull_quote, narrative_diagnosis (rich text), narrative_decision (rich text), narrative_treatment (rich text), narrative_aftercare (rich text), hero_portrait (image), secondary_portrait (image).

---

## 🖼 Adding real images

When real images become available:

1. Open `image-shotlist.md`. Find the row for the image you want to add.
2. Note the **Filename** column (e.g., `doctor-dr-daniel-tan-portrait.jpg`).
3. Save your image to the matching folder using **exactly that filename**:
   - `clinic-...` → `/assets/images/clinic/`
   - `doctor-...` → `/assets/images/doctor/` (folder is `doctors/` on disk — see folder structure)
   - `staff-...` → `/assets/images/staff/`
   - `equipment-...` → `/assets/images/equipment/`
   - `treatment-...` → `/assets/images/treatment/`
   - `story-...` → `/assets/images/patient/` (folder is `patients/` on disk)
   - `accreditation-...`, `insurance-...` → `/assets/images/brand/`

> Note: the `<img>` tags themselves are not yet wired into the HTML — that step happens during the WP conversion, where the developer can replace the placeholder `<div>`s with real `<img>` tags pulling from the WP media library or ACF image fields. This skeleton is intentionally text-only so the structure is the focus.

---

## 📋 Editorial / content decisions to confirm

Sections currently marked `[CONTENT TBC]` need a content writer or editor before launch. The largest clusters are:

- **Doctor profiles** (Drs David Tan, Jonathan Teh, Michelle Tseng, Andrew Tan, Manish Taneja, Ooi Wei Seong) — each needs the 6-section bio template filled in. Dr Daniel Tan's profile shows the structure and depth required.
- **10 of 12 cancer pages** — the templates are fully laid out (intro, symptoms, diagnosis, risk, treatment approach), but prose needs to be written. Breast Cancer and Prostate Cancer pages show the depth required.
- **All 5 treatment pages** — the structure is in place; the "What it is", "How it works", "What to expect", "Side effects" and "Comparison" sections all need writing.
- **5 of 6 clinic pages** (every clinic except Adam Road) — addresses, opening hours, public transport, parking and on-site doctor rosters need filling in.
- **All 3 patient story pages** — narratives need writing (with patient consent), pull quotes need extracting.
- **Careers page** — actual open roles need adding (or the page reverts to "send us a speculative CV").

---

## 🚀 Deploying with Git and Netlify

This site is a fully static HTML site with no build step, which makes Netlify the simplest place to host it. A `netlify.toml` is already included with sensible defaults (publish directory, security headers, cache rules).

### Path A — Drag and drop (60 seconds, no git)

Best for: showing someone a live preview today.

1. Sign up at [netlify.com](https://netlify.com) (free).
2. On the dashboard, drag the unzipped `aaro-website/` folder onto the deploy area.
3. Done. Netlify gives you a URL like `https://shimmering-otter-1234.netlify.app/`.

You can later connect the same site to git — Netlify lets you "link" an existing site to a repository.

### Path B — Git + Netlify (recommended)

Best for: continuous deployment. Every push to `main` rebuilds the live site automatically.

**1. Initialise the git repo locally**

In Terminal, from inside the `aaro-website/` folder:

```bash
cd path/to/aaro-website
git init
git add .
git commit -m "Initial commit"
git branch -M main
```

**2. Create an empty repo on GitHub**

Go to [github.com/new](https://github.com/new). Name it (e.g., `aaro-website`). Don't tick "add README" or "add .gitignore" — you already have those. Click *Create repository*.

GitHub will show you commands. Use the "push an existing repository" block. It looks like:

```bash
git remote add origin https://github.com/YOUR-USERNAME/aaro-website.git
git push -u origin main
```

Run those two commands.

**3. Connect Netlify to the repo**

1. Sign in at [netlify.com](https://netlify.com) → *Add new site* → *Import an existing project*.
2. Choose *GitHub* and authorise it. Pick `aaro-website`.
3. Build settings — Netlify usually auto-fills these correctly from the `netlify.toml`. If asked manually:
   - **Build command:** *(leave empty)*
   - **Publish directory:** `.`
4. Click *Deploy*. About 30 seconds later, your site is live.

**4. (Optional) Connect aaro.sg as a custom domain**

In Netlify: *Site settings → Domain management → Add custom domain* → `aaro.sg`.
Netlify will give you DNS records — point your domain registrar at them. SSL certificate is auto-provisioned via Let's Encrypt.

### After it's deployed

Future updates are just:

```bash
git add .
git commit -m "Update breast cancer page copy"
git push
```

Netlify rebuilds and pushes the new version live within ~30 seconds. Each deploy gets a unique preview URL too, so you can review changes before they go live.

---

## 🔍 Quick QA checklist before launch

- [ ] All `[CONTENT TBC]` blocks resolved (search for `class="tbc"`).
- [ ] All image placeholders replaced with real assets per `image-shotlist.md`.
- [ ] Phone number `+65 8102 3838` confirmed correct everywhere (used in header, footer, every CTA).
- [ ] WhatsApp number confirmed correct (currently same as phone).
- [ ] Adam Road CSR address filled in.
- [ ] Five clinic addresses filled in.
- [ ] Insurance panel list updated to final 13 panels with logos.
- [ ] Privacy Policy, Terms, PDPA, Sitemap pages added and linked from footer.
- [ ] Page titles and meta descriptions reviewed for SEO (currently set sensibly but worth a final pass).
- [ ] Open Graph tags reviewed (currently set generically per page).
- [ ] Favicon and Apple touch icon added.
- [ ] Google Analytics / Google Tag Manager snippet added.

---

## 📐 Design tokens (for reference)

```
Colours
  Navy        #0B2240     Primary brand colour, headlines, dark mode bg
  Navy mid    #163455     Hover state on Navy buttons
  Navy light  #E8EFF7     Tinted bg for doctor card images
  Teal        #0A7E6A     Primary CTA, accent, links
  Teal light  #E0F2EE     Tinted bg for treatment cards
  Gold        #B8882A     Tertiary accent, "flagship" pill, [CONTENT TBC] block
  Gold light  #F9F0DC     Background for [CONTENT TBC] blocks
  Warm white  #F7F4EF     Section bg, hero bg
  Ink         #1A1A1A     Body copy
  Border      #E0DDD8     Card and divider borders

Typography
  Cormorant Garamond  Serif — h1, h2, h3 (display headings, italics for emphasis)
  DM Sans             Sans — body, h4–h6, UI
  DM Mono             Mono — eyebrows, taglines, meta, [CONTENT TBC] markers

Layout
  Container max  1280px
  Container narrow  920px
  Gutter  24px
  Header height  72px
  Section padding  60px (mobile) / 88px (desktop)
```

---

## 📞 Production support

For questions during the WordPress conversion or content fill-in, contact AARO's digital lead. The brand architecture document and content audit Excel referenced during this build remain the source of truth for design tokens and editorial direction.
