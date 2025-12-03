# SEO Plan

Future pSEO pages to add once actual product features exist.

## Calendar Intent Pages (Removed)

These pages were removed because they showed the same product with different copy.

### Blank Calendar
- URL: `/calendars/intent/blank`
- Feature needed: Undated calendar template (no year/month labels)
- Content ready in `byIntent.ts` (removed, restore when feature exists)

### Academic Calendar
- URL: `/calendars/intent/academic`
- Feature needed: August-July year format, semester tracking
- Content ready in `byIntent.ts` (removed, restore when feature exists)

### Wall Planner
- URL: `/calendars/intent/wall-planner`
- Feature needed: Single-page year view optimized for large format printing
- Content ready in `byIntent.ts` (removed, restore when feature exists)

## Habit Tracker Variants

### Bullet Journal Style
- URL: `/habit-tracker/bullet-journal`
- Currently: Same tracker with A5 format and different preset habits
- To make legit: Add actual bujo-style dotted grid, collections, or index pages

## Implementation Checklist

When adding a feature back:
1. Build the actual distinct product/view
2. Restore content to `byIntent.ts`
3. Create page in `src/pages/calendars/intent/`
4. Add to "Browse by Type" in landing page
5. Add to Related sections in other intent pages

---

## Planner/Tracker Pillars (Biggest Gap)

New top-level pillars with transactional landers:

### /planners
- `/planners/weekly-minimalist-planner`
- `/planners/daily-minimalist-planner`
- `/planners/undated-minimalist-planner`

### /trackers
- `/trackers/minimalist-habit-tracker` (reuse existing)
- `/trackers/minimalist-mood-tracker`

Use pSEO system with Product/FAQ/Breadcrumb JSON-LD and hreflang for key locales.

---

## Blog Cluster

Ship top 4 posts first:
- "What Is a Minimalist Planner?"
- "Paper Planner vs Digital Apps"
- "How to Set Up a Minimalist Weekly Planning Routine"
- "Why Minimalism Helps You Focus"

Requirements:
- FAQPage JSON-LD
- Internal links to planners/trackers pillars
- `/blog` index page
- Category hubs: `/blog/minimalism`, `/blog/planning`

---

## Image/Pinterest SEO

- Generate tall Pinterest images per product/intent
- Descriptive filenames: `minimalist-2025-calendar-a4.png`
- Alt text per research
- Image sitemap or `<image:image>` entries via next-sitemap

---

## International/Language Landers

For top locales, add localized landing aliases:
- `/es/calendario-minimalista-2025` → canonical to `/calendars/2025/simple/es`
- Or serve localized content directly
- Ensure hreflang includes aliases

---

## Upcoming-Year Prep

Add `/calendars/2026-minimalist-printable-calendar` early:
- Already in dynamic years, but create dedicated slug/lander
- Optimize for "2026" phrasing
- Clarify paid bundle vs free sample

---

## Featured Snippets

Add 40-60 word direct answers under H2/H3 for:
- "What is a minimalist planner"
- "Why use a printable calendar"
- "How to use a habit tracker"

Include FAQPage JSON-LD (already on many pages).

---

## Internal Linking

- Intent pages: Add "Learn to use this" links to blog posts
- Format/week-start pages: Link to planners/trackers (A5 → planners/binders)
- Footer: Link formats to `/calendars/formats/{a4,a5,letter}`, add planners/trackers

---

## Image/Canonical Hygiene

- Consider intent/planner-specific OG images for higher CTR
- Ensure all pages have canonicals and hreflang
