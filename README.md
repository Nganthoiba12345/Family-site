# Our Family Heritage & Digital Lineage Archive

A modern, responsive, and elegant **Family Heritage / Family Tree Website** built with **Next.js (App Router)**, **Payload CMS 3.x**, **SQLite**, **Redis**, and **Docker Compose**.

Designed as a living digital family album and genealogical sanctuary across three generations with a white-and-blue theme, subtle neon cyan accents, and glassmorphism cards.

---

## Architecture Overview

```text
                           Browser (Clients)
                                  │
                                  ▼
                         Next.js App Router
                     (React 19, TypeScript, Tailwind)
                                  │
                    ┌─────────────┴─────────────┐
                    ▼                           ▼
            Payload CMS 3.x                   Redis
        (Admin / APIs / Auth)           (Metadata Cache)
                    │
                    ▼
           SQLite (family.db)
     (Embedded via Bind Mount)
```

### Persistence Architecture (Bind Mounts)
All permanent data is stored on your host machine via Docker bind volumes:
- `./data/family.db` → Persistent SQLite database
- `./uploads/` → Family photographs and uploaded media assets
- `./media/` → Additional media storage

> **Key Guarantee:** Running `docker compose down` and rebuilding the container does **not** erase your family data or uploaded photographs. The data lives securely on the host filesystem.

---

## Family Tree Lineage (3 Generations)

The application comes pre-seeded with the exact requested family structure:

```text
                  Grandfather ──(Heart)── Grandmother
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    │                               │                               │
First Uncle + Wife             Second Uncle + Wife             Third Uncle + Wife             Aunty
    │                               │                               │                           │
    ▼                               ▼                               ▼                           ▼
 Daughter                    Elder Daughter + Son                Daughter                      Son
```

- **Generation 1 (Roots):** Grandfather & Grandmother (connected with glowing neon bridge)
- **Generation 2 (Children & Spouses):**
  - First Uncle & First Uncle Wife
  - Second Uncle & Second Uncle Wife
  - Third Uncle & Third Uncle Wife
  - Aunty
- **Generation 3 (Grandchildren):**
  - Uncle 1 Daughter
  - Second Uncle Elder Daughter & Second Uncle Son
  - Third Uncle Daughter
  - Aunty Son

---

## Key Features

1. **Dynamic Family Tree Visualization:**
   - Desktop: Horizontal genealogical branching structure with neon blue glowing connection lines.
   - Mobile: Transforms gracefully into an interactive vertical timeline/tree layout with no horizontal clipping.
2. **Dedicated Individual Photo Pages (`/photos/[slug]`):**
   - Clicking any photo navigates directly to its dedicated page (never a simple popup/modal).
   - Full caption, story description, date taken, location, photographer, tagged family members, and Previous / Next navigation buttons.
3. **Individual Family Member Profiles (`/family/[slug]`):**
   - High-resolution portrait with glowing neon border.
   - Life dates, occupation, full multi-paragraph biography.
   - Interactive relational cards for Spouse, Parents, and Children.
   - Photo gallery of pictures featuring that family member.
   - Associated family chronicles and memories.
4. **Heritage Photo Gallery (`/gallery`):**
   - Filter by Category (*Family, Wedding, Childhood, Birthday, Festival, Travel, Old Memories, Family Gathering*).
   - Real-time text search by title, location, or caption.
5. **Historical Family Timeline:**
   - Milestones spanning from 1960 to Present with chronological markers and category tags.
6. **Recent Memories & Chronicles (`/memories`):**
   - Long-form stories of family reunions, anniversaries, and courtyard traditions.
7. **Payload CMS Administration (`/admin`):**
   - Manage all family members, upload photos, link relationships, edit biographies, and publish new timeline events without touching code.
8. **Redis Performance Caching:**
   - Automatically caches database queries for family members, gallery photos, and memories with graceful in-memory fallback.

---

## Quick Start with Docker Compose

### 1. Prerequisites
- Docker & Docker Compose installed.

### 2. Launch the Application

```bash
docker compose up -d --build
```

### 3. Access URLs
- **Public Family Website:** [http://localhost:3000](http://localhost:3000)
- **Payload CMS Admin Panel:** [http://localhost:3000/admin](http://localhost:3000/admin)

### 4. Admin Credentials
The database is automatically pre-seeded on first run with an administrator account:
- **Email:** `admin@heritage.local`
- **Password:** `FamilyHeritage2026!`

*(You can change your password or create additional administrators inside `/admin`)*

---

## Docker Commands Cheat Sheet

| Action | Command |
|---|---|
| **Start / Build in background** | `docker compose up -d --build` |
| **Stop containers** | `docker compose down` |
| **View live logs** | `docker compose logs -f app` |
| **Restart services** | `docker compose restart` |
| **Check container status** | `docker compose ps` |

---

## Running Locally Without Docker

If you prefer to run directly on Node.js:

```bash
# 1. Install dependencies
npm install

# 2. Run initial database seeder
npm run seed

# 3. Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## How to Manage Family Information (Payload CMS)

### Adding a Family Member
1. Log into `/admin`.
2. Click **Family Members** → **Create New**.
3. Fill in:
   - **Full Name** (e.g. `New Cousin`)
   - **Slug** (auto-generated or custom, e.g. `new-cousin`)
   - **Relationship** (Son, Daughter, etc.)
   - **Generation** (1, 2, or 3)
   - **Branch** (Uncle 1 Branch, etc.)
   - **Parent** & **Spouse** (choose from existing members)
   - **Profile Photo** & **Biography**
4. Click **Publish**. The member immediately appears on the website and within the Family Tree!

### Uploading Photographs
1. In `/admin`, navigate to **Media** → **Create New**.
2. Upload the image file.
3. Add **Title**, **Category**, **Date Taken**, **Location**, and select which **Family Members** appear in the photo.
4. Click **Publish**. The photo instantly becomes visible in the Gallery and on each tagged person's profile page.

---

## Backup & Restore Guide

All permanent data is localized in three folders:

```text
my_app/
├── data/       # Contains family.db (SQLite database)
├── uploads/    # Contains uploaded photos and avatars
└── media/      # Additional media files
```

### Creating a Backup
Simply create an archive of `data/` and `uploads/`:

**On Linux / macOS:**
```bash
tar -czvf family_backup_$(date +%F).tar.gz data/ uploads/
```

**On Windows (PowerShell):**
```powershell
Compress-Archive -Path data, uploads -DestinationPath "family_backup.zip"
```

### Restoring from a Backup
1. Stop the application: `docker compose down`
2. Extract your backup archive over the `data/` and `uploads/` directories.
3. Start the application: `docker compose up -d`
All family records, tree structures, and photos will be restored.

---

## Tech Stack & Standards

- **Next.js 16** with App Router & React 19
- **Tailwind CSS v4** with custom neon utilities
- **Payload CMS 3.90** natively integrated into Next.js App Router
- **SQLite** with `@payloadcms/db-sqlite`
- **Redis** with `ioredis` and memory fallback
- **Sharp** for Next.js image optimization
- **TypeScript** strict type safety
