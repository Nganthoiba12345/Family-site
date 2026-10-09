import fs from 'fs'
import path from 'path'

const uploadsDir = path.resolve('uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

function createAvatarSvg(name, role, bgGradient, accent) {
  return `<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgGradient[0]}" />
      <stop offset="100%" stop-color="${bgGradient[1]}" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="30%" r="50%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.35" />
      <stop offset="100%" stop-color="${accent}" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="800" height="800" fill="url(#bg)" rx="40" />
  <circle cx="400" cy="300" r="280" fill="url(#glow)" />
  
  <!-- Silhouette / Portrait Icon -->
  <g transform="translate(400, 320)" fill="${accent}" opacity="0.9">
    <circle cx="0" cy="-60" r="90" />
    <path d="M -140 160 C -140 50, 140 50, 140 160 Z" />
  </g>

  <!-- Border Frame -->
  <rect x="20" y="20" width="760" height="760" rx="30" fill="none" stroke="${accent}" stroke-width="2" stroke-opacity="0.4" />
  
  <!-- Text Label -->
  <text x="400" y="580" font-family="system-ui, -apple-system, sans-serif" font-size="38" font-weight="bold" fill="#0F172A" text-anchor="middle">${name}</text>
  <text x="400" y="630" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="500" fill="#2563EB" text-anchor="middle" letter-spacing="2">${role.toUpperCase()}</text>
  <text x="400" y="670" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="#64748B" text-anchor="middle">Family Heritage Archive</text>
</svg>`
}

function createSceneSvg(title, subtitle, bgGradient, accent) {
  return `<svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgGradient[0]}" />
      <stop offset="100%" stop-color="${bgGradient[1]}" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.35" />
      <stop offset="100%" stop-color="${accent}" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#bg)" rx="40" />
  <circle cx="600" cy="350" r="400" fill="url(#glow)" />
  
  <!-- Decorative Frame -->
  <rect x="40" y="40" width="1120" height="720" rx="30" fill="none" stroke="${accent}" stroke-width="2" stroke-opacity="0.5" />
  
  <!-- Icon / Graphics -->
  <g transform="translate(600, 320)" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
    <rect x="-100" y="-80" width="200" height="160" rx="20" fill="${accent}" fill-opacity="0.1" />
    <circle cx="-30" cy="-20" r="20" fill="${accent}" />
    <path d="M -90 60 L -30 0 L 30 50 L 70 20 L 90 60" />
  </g>

  <!-- Title -->
  <text x="600" y="520" font-family="system-ui, -apple-system, sans-serif" font-size="46" font-weight="bold" fill="#0F172A" text-anchor="middle">${title}</text>
  <text x="600" y="580" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="500" fill="#2563EB" text-anchor="middle">${subtitle}</text>
  <text x="600" y="630" font-family="system-ui, -apple-system, sans-serif" font-size="20" fill="#64748B" text-anchor="middle">Family Heritage Collection</text>
</svg>`
}

const members = [
  { file: 'grandfather.svg', name: 'Grandfather', role: 'Generation 1 • Patriarch', bg: ['#EFF6FF', '#DBEAFE'], accent: '#2563EB' },
  { file: 'grandmother.svg', name: 'Grandmother', role: 'Generation 1 • Matriarch', bg: ['#F0FDFA', '#CCFBF1'], accent: '#0D9488' },
  { file: 'uncle1.svg', name: 'First Uncle', role: 'Generation 2 • Eldest Son', bg: ['#EFF6FF', '#BFDBFE'], accent: '#1D4ED8' },
  { file: 'uncle1-wife.svg', name: 'First Uncle Wife', role: 'Generation 2 • Spouse', bg: ['#FAF5FF', '#F3E8FF'], accent: '#9333EA' },
  { file: 'uncle1-daughter.svg', name: 'Uncle 1 Daughter', role: 'Generation 3 • Granddaughter', bg: ['#FDF2F8', '#FCE7F3'], accent: '#DB2777' },
  { file: 'uncle2.svg', name: 'Second Uncle', role: 'Generation 2 • Second Son', bg: ['#ECFEFF', '#CFFAFE'], accent: '#0891B2' },
  { file: 'uncle2-wife.svg', name: 'Second Uncle Wife', role: 'Generation 2 • Spouse', bg: ['#F0FDF4', '#DCFCE7'], accent: '#16A34A' },
  { file: 'uncle2-elder-daughter.svg', name: 'Second Uncle Elder Daughter', role: 'Generation 3 • Granddaughter', bg: ['#FEF2F2', '#FEE2E2'], accent: '#DC2626' },
  { file: 'uncle2-son.svg', name: 'Second Uncle Son', role: 'Generation 3 • Grandson', bg: ['#EFF6FF', '#DBEAFE'], accent: '#2563EB' },
  { file: 'uncle3.svg', name: 'Third Uncle', role: 'Generation 2 • Third Son', bg: ['#F8FAFC', '#E2E8F0'], accent: '#475569' },
  { file: 'uncle3-wife.svg', name: 'Third Uncle Wife', role: 'Generation 2 • Spouse', bg: ['#FFFBEB', '#FEF3C7'], accent: '#D97706' },
  { file: 'uncle3-daughter.svg', name: 'Third Uncle Daughter', role: 'Generation 3 • Granddaughter', bg: ['#FDF4FF', '#FAE8FF'], accent: '#C026D3' },
  { file: 'aunty.svg', name: 'Aunty', role: 'Generation 2 • Daughter', bg: ['#FFF1F2', '#FFE4E6'], accent: '#E11D48' },
  { file: 'aunty-son.svg', name: 'Aunty Son', role: 'Generation 3 • Grandson', bg: ['#F0FDF4', '#BBF7D0'], accent: '#15803D' },
]

const scenes = [
  { file: 'family-gathering.svg', title: 'Grand Reunion Gathering', subtitle: 'Summer 1985 • Family Homestead', bg: ['#EFF6FF', '#DBEAFE'], accent: '#2563EB' },
  { file: 'wedding-archive.svg', title: 'Grandparents Golden Wedding', subtitle: 'Spring 1960 • Sacred Union', bg: ['#F0FDFA', '#CCFBF1'], accent: '#0D9488' },
  { file: 'childhood-days.svg', title: 'Generations at Play', subtitle: 'Autumn 1995 • Ancestral Courtyard', bg: ['#FAF5FF', '#F3E8FF'], accent: '#9333EA' },
  { file: 'festival-lights.svg', title: 'Annual Festival Celebration', subtitle: 'Winter 2005 • Gathering of All Branches', bg: ['#FFFBEB', '#FEF3C7'], accent: '#D97706' },
  { file: 'heritage-residence.svg', title: 'The Ancestral Home', subtitle: 'Founded 1958 • Where Our Journey Began', bg: ['#F8FAFC', '#E2E8F0'], accent: '#0284C7' },
]

for (const m of members) {
  const content = createAvatarSvg(m.name, m.role, m.bg, m.accent)
  fs.writeFileSync(path.join(uploadsDir, m.file), content)
}

for (const s of scenes) {
  const content = createSceneSvg(s.title, s.subtitle, s.bg, s.accent)
  fs.writeFileSync(path.join(uploadsDir, s.file), content)
}

console.log('Generated placeholder SVGs in uploads directory successfully!')
