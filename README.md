# Wealon tax & accounting — Windows XP Desktop Website

A Windows XP-themed single-page website for Wealon tax & Accounting, built with Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion, and Zustand.

## Features

- **XP Boot Sequence** — animated loading screen with flag logo and progress bar
- **5 Cycling Wallpapers** — real XP-era wallpapers with 30s auto-crossfade
- **Desktop Icons** — click to open folder windows with hover preview tooltips
- **Folder Window System** — XP Luna-style windows with titlebar, menubar, toolbar, sidebar
- **3-Level Navigation** — Desktop → Folder Grid → Preview/Page → X goes back one level
- **Dark Preview Viewer** — opens like Windows Photo Viewer, maximize for full-page
- **Start Menu** — classic XP start menu with folder navigation
- **Booking Form** — functional contact form with XP-styled sunken inputs
- **Fully Responsive** — desktop (floating windows), tablet (fullscreen windows), mobile (slide-up apps)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + CSS Modules for XP chrome
- **Animation:** Framer Motion
- **State:** Zustand
- **Architecture:** Modular monolith

## Project Structure

```
src/
├── app/                    # Next.js App Router
├── lib/                    # Shared types, hooks
├── modules/
│   ├── desktop/            # Wallpaper, icons, boot, logo
│   ├── windows/            # Folder windows, preview, titlebar, store
│   ├── content/            # Page content, data, hero components
│   ├── booking/            # Booking form
│   ├── taskbar/            # Taskbar, start menu, clock
│   └── ui/                 # SVG icons, shared UI
├── styles/                 # Global CSS
public/
└── wallpapers/             # 5 wallpaper images
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Future Backend (Planned)

- **Database:** PostgreSQL on Neon/Supabase + Prisma ORM
- **Auth:** Clerk
- **Background Jobs:** Inngest
- **Email:** Resend
- **Deploy:** Vercel

## License

Private — Wealon tax & Accounting
