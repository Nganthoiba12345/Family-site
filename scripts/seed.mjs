import { getPayload } from 'payload'
import config from '../payload.config.ts'

async function seed() {
  console.log('[Seed] Initializing Payload for database seeding...')
  const payload = await getPayload({ config })

  // 1. Ensure Admin User
  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
  })

  if (existingUsers.totalDocs === 0) {
    console.log('[Seed] Creating default administrator user...')
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@heritage.local',
        password: 'FamilyHeritage2026!',
        role: 'admin',
        name: 'Family Administrator',
      },
    })
    console.log('[Seed] Admin user created: admin@heritage.local / FamilyHeritage2026!')
  }

  // 2. Check if Family Members already seeded
  const existingMembers = await payload.find({
    collection: 'family-members',
    limit: 1,
  })

  if (existingMembers.totalDocs > 0) {
    console.log('[Seed] Family members already exist in database. Skipping duplicate seed.')
    return
  }

  console.log('[Seed] Seeding Media collection...')
  const mediaItems = [
    { filename: 'grandfather.svg', title: 'Grandfather Portrait', slug: 'grandfather-portrait', category: 'Old Memories', caption: 'Wise and compassionate leader of our family', description: 'Captured during the golden anniversary era in the family library.', dateTaken: '1975-06-12', location: 'Ancestral Homestead', photographer: 'Family Studio' },
    { filename: 'grandmother.svg', title: 'Grandmother Portrait', slug: 'grandmother-portrait', category: 'Old Memories', caption: 'The heart and warm soul of generations', description: 'Known for her endless hospitality, traditional recipes, and soothing stories.', dateTaken: '1977-08-20', location: 'Ancestral Homestead', photographer: 'Family Studio' },
    { filename: 'uncle1.svg', title: 'First Uncle Portrait', slug: 'first-uncle-portrait', category: 'Family', caption: 'Eldest son and guiding pillar', description: 'Passionate about engineering, education, and family traditions.', dateTaken: '1990-04-10', location: 'Metro Residence', photographer: 'Studio Archive' },
    { filename: 'uncle1-wife.svg', title: 'First Uncle Wife Portrait', slug: 'first-uncle-wife-portrait', category: 'Family', caption: 'Beloved spouse and educator', description: 'Dedicated teacher and community volunteer.', dateTaken: '1992-05-15', location: 'Metro Residence', photographer: 'Studio Archive' },
    { filename: 'uncle1-daughter.svg', title: 'Uncle 1 Daughter Portrait', slug: 'uncle-1-daughter-portrait', category: 'Childhood', caption: 'First granddaughter of Generation 3', description: 'Artist, designer, and family historian.', dateTaken: '2010-09-01', location: 'Garden Villa', photographer: 'Family Album' },
    { filename: 'uncle2.svg', title: 'Second Uncle Portrait', slug: 'second-uncle-portrait', category: 'Family', caption: 'Second son, innovator and entrepreneur', description: 'A creative mind who established the family foundation.', dateTaken: '1995-11-22', location: 'City Center', photographer: 'Studio Archive' },
    { filename: 'uncle2-wife.svg', title: 'Second Uncle Wife Portrait', slug: 'second-uncle-wife-portrait', category: 'Family', caption: 'Spouse, researcher and writer', description: 'Author of several historical essays and beloved aunt.', dateTaken: '1996-03-14', location: 'City Center', photographer: 'Studio Archive' },
    { filename: 'uncle2-elder-daughter.svg', title: 'Elder Daughter Portrait', slug: 'uncle-2-elder-daughter-portrait', category: 'Childhood', caption: 'Elder daughter of second uncle', description: 'Medical student, passionate violinist, and avid traveller.', dateTaken: '2012-07-08', location: 'Summer Courtyard', photographer: 'Family Album' },
    { filename: 'uncle2-son.svg', title: 'Second Uncle Son Portrait', slug: 'second-uncle-son-portrait', category: 'Childhood', caption: 'Son of second uncle', description: 'Computer science enthusiast and sports captain.', dateTaken: '2015-02-18', location: 'Sports Arena', photographer: 'Family Album' },
    { filename: 'uncle3.svg', title: 'Third Uncle Portrait', slug: 'third-uncle-portrait', category: 'Family', caption: 'Third son, architect and naturalist', description: 'Designer of modern community spaces and avid nature lover.', dateTaken: '1998-10-05', location: 'Design Studio', photographer: 'Studio Archive' },
    { filename: 'uncle3-wife.svg', title: 'Third Uncle Wife Portrait', slug: 'third-uncle-wife-portrait', category: 'Family', caption: 'Spouse and botanist', description: 'Curator of heritage gardens and culinary arts enthusiast.', dateTaken: '2001-01-30', location: 'Botanical Garden', photographer: 'Studio Archive' },
    { filename: 'uncle3-daughter.svg', title: 'Third Uncle Daughter Portrait', slug: 'third-uncle-daughter-portrait', category: 'Childhood', caption: 'Daughter of third uncle', description: 'Passionate musician and environmental advocate.', dateTaken: '2018-06-14', location: 'Lakeside Cabin', photographer: 'Family Album' },
    { filename: 'aunty.svg', title: 'Aunty Portrait', slug: 'aunty-portrait', category: 'Family', caption: 'Cherished daughter of grandparents', description: 'Philanthropist, diplomat, and keeper of family oral folklore.', dateTaken: '1999-12-12', location: 'Diplomatic Enclave', photographer: 'Studio Archive' },
    { filename: 'aunty-son.svg', title: 'Aunty Son Portrait', slug: 'aunty-son-portrait', category: 'Childhood', caption: 'Son of Aunty', description: 'Budding filmmaker and adventurous spirit.', dateTaken: '2020-08-25', location: 'Coastal Retreat', photographer: 'Family Album' },
    { filename: 'family-gathering.svg', title: 'Grand Reunion Gathering', slug: 'grand-reunion-gathering', category: 'Family Gathering', caption: 'All four branches coming together for the silver celebration', description: 'Over three dozen relatives gathered on the front lawn of the homestead under the ancient banyan tree.', dateTaken: '1985-07-24', location: 'Ancestral Homestead', photographer: 'Uncle 2' },
    { filename: 'wedding-archive.svg', title: 'Grandparents Golden Anniversary', slug: 'grandparents-golden-anniversary', category: 'Wedding', caption: 'Fifty years of enduring partnership and devotion', description: 'Celebrated with heartfelt blessings from children, grandchildren, and lifelong neighbors.', dateTaken: '2010-04-18', location: 'Heritage Hall', photographer: 'City Chronicler' },
    { filename: 'childhood-days.svg', title: 'Generations at Play', slug: 'generations-at-play', category: 'Childhood', caption: 'Laughter ringing through the summer afternoon', description: 'The grandchildren playing hide-and-seek in the courtyard while the uncles discussed memories.', dateTaken: '2016-05-10', location: 'Ancestral Courtyard', photographer: 'Aunty' },
    { filename: 'festival-lights.svg', title: 'Annual Festival of Lights', slug: 'annual-festival-of-lights', category: 'Festival', caption: 'Illuminating tradition and welcoming prosperity', description: 'Every room lit with earthen lamps as the entire lineage exchanged sweets and heartfelt wishes.', dateTaken: '2022-11-04', location: 'Homestead Terrace', photographer: 'Uncle 1' },
    { filename: 'heritage-residence.svg', title: 'The Ancestral Residence', slug: 'the-ancestral-residence', category: 'Old Memories', caption: 'Built with love and standing strong for decades', description: 'The foundation stone was laid with hope; today it shelters generations of triumphs and warm memories.', dateTaken: '1965-03-15', location: 'Homestead Grounds', photographer: 'Grandfather' },
  ]

  const mediaMap = {}

  for (const m of mediaItems) {
    try {
      const created = await payload.create({
        collection: 'media',
        data: {
          title: m.title,
          slug: m.slug,
          category: m.category,
          caption: m.caption,
          description: m.description,
          dateTaken: m.dateTaken,
          location: m.location,
          photographer: m.photographer,
          featured: true,
          filename: m.filename,
          mimeType: 'image/svg+xml',
          filesize: 12000,
          url: `/uploads/${m.filename}`,
        },
      })
      mediaMap[m.filename] = created.id
    } catch (e) {
      console.warn(`[Seed] Media create notice for ${m.filename}:`, e.message)
    }
  }

  console.log('[Seed] Seeding Family Members in Generation 1...')
  // Generation 1: Grandparents
  const grandfather = await payload.create({
    collection: 'family-members',
    data: {
      fullName: 'Grandfather',
      slug: 'grandfather',
      relationship: 'Grandfather',
      gender: 'male',
      generation: 1,
      branch: 'Roots',
      displayOrder: 1,
      dateOfBirth: '1935',
      dateOfDeath: '2015',
      isLiving: false,
      occupation: 'Civil Engineer & Community Elder',
      shortBio: 'The foundational patriarch of our family. A man of quiet integrity, deep wisdom, and boundless generosity.',
      biography: 'Grandfather was born in a modest town and rose to become a respected community engineer. He dedicated his life to building public bridges, educational schools, and fostering a loving family grounded in honor and mutual respect. His stories by the fireside shaped generations.',
      profilePhoto: mediaMap['grandfather.svg'],
      featured: true,
    },
  })

  const grandmother = await payload.create({
    collection: 'family-members',
    data: {
      fullName: 'Grandmother',
      slug: 'grandmother',
      relationship: 'Grandmother',
      gender: 'female',
      generation: 1,
      branch: 'Roots',
      displayOrder: 2,
      dateOfBirth: '1938',
      dateOfDeath: '2019',
      isLiving: false,
      occupation: 'Master Teacher & Homemaker',
      shortBio: 'The beloved matriarch whose warmth, unconditional love, and comforting presence bound the entire household together.',
      biography: 'Grandmother was the heartbeat of our ancestral homestead. A gifted storyteller and culinary master, her kitchen was always full of laughter, warmth, and fresh delicacies for children and visitors alike.',
      profilePhoto: mediaMap['grandmother.svg'],
      spouse: grandfather.id,
      featured: true,
    },
  })

  // Link grandfather's spouse
  await payload.update({
    collection: 'family-members',
    id: grandfather.id,
    data: { spouse: grandmother.id },
  })

  console.log('[Seed] Seeding Generation 2 & 3: First Uncle Branch...')
  // Uncle 1 Branch
  const uncle1 = await payload.create({
    collection: 'family-members',
    data: {
      fullName: 'First Uncle',
      slug: 'first-uncle',
      relationship: 'First Uncle',
      gender: 'male',
      generation: 2,
      branch: 'Uncle 1 Branch',
      displayOrder: 3,
      dateOfBirth: '1962',
      isLiving: true,
      occupation: 'Senior Mechanical Engineer',
      shortBio: 'The eldest son who carried forward Grandfather’s passion for precision and leadership.',
      biography: 'First Uncle exemplifies discipline and dedication. Having guided his younger siblings through university and life, he continues to be the pillar of counsel for the extended family.',
      profilePhoto: mediaMap['uncle1.svg'],
      parent: grandfather.id,
      featured: true,
    },
  })

  const uncle1Wife = await payload.create({
    collection: 'family-members',
    data: {
      fullName: 'First Uncle Wife',
      slug: 'first-uncle-wife',
      relationship: 'Wife',
      gender: 'female',
      generation: 2,
      branch: 'Uncle 1 Branch',
      displayOrder: 4,
      dateOfBirth: '1965',
      isLiving: true,
      occupation: 'High School Literature Educator',
      shortBio: 'A devoted educator and gentle spirit who introduced poetry and literature to the younger generation.',
      biography: 'First Uncle Wife joined the family with elegance and grace. Her warmth and enthusiasm for learning inspired all nieces and nephews to pursue higher education.',
      profilePhoto: mediaMap['uncle1-wife.svg'],
      spouse: uncle1.id,
      featured: true,
    },
  })

  const uncle1Daughter = await payload.create({
    collection: 'family-members',
    data: {
      fullName: 'Uncle 1 Daughter',
      slug: 'uncle-1-daughter',
      relationship: 'Daughter',
      gender: 'female',
      generation: 3,
      branch: 'Uncle 1 Branch',
      displayOrder: 5,
      dateOfBirth: '1992',
      isLiving: true,
      occupation: 'Digital Product Designer & Archivist',
      shortBio: 'Eldest granddaughter of Generation 3. Passionate about art, design, and preserving family folklore.',
      biography: 'Uncle 1 Daughter carries a love for visual arts and digital craftsmanship. She was instrumental in collecting old family photographs and initiating this digital heritage project.',
      profilePhoto: mediaMap['uncle1-daughter.svg'],
      parent: uncle1.id,
      featured: true,
    },
  })

  await payload.update({
    collection: 'family-members',
    id: uncle1.id,
    data: {
      spouse: uncle1Wife.id,
      children: [uncle1Daughter.id],
    },
  })
  await payload.update({
    collection: 'family-members',
    id: uncle1Wife.id,
    data: {
      children: [uncle1Daughter.id],
    },
  })

  console.log('[Seed] Seeding Generation 2 & 3: Second Uncle Branch...')
  // Uncle 2 Branch
  const uncle2 = await payload.create({
    collection: 'family-members',
    data: {
      fullName: 'Second Uncle',
      slug: 'second-uncle',
      relationship: 'Second Uncle',
      gender: 'male',
      generation: 2,
      branch: 'Uncle 2 Branch',
      displayOrder: 6,
      dateOfBirth: '1966',
      isLiving: true,
      occupation: 'Technology Entrepreneur & Investor',
      shortBio: 'A visionary thinker with an entrepreneurial heart, always encouraging the family to explore new horizons.',
      biography: 'Second Uncle ventured into cutting-edge technology ventures in the late 1990s. Always cheerful and optimistic, he is famous for organizing unforgettable family holidays.',
      profilePhoto: mediaMap['uncle2.svg'],
      parent: grandfather.id,
      featured: true,
    },
  })

  const uncle2Wife = await payload.create({
    collection: 'family-members',
    data: {
      fullName: 'Second Uncle Wife',
      slug: 'second-uncle-wife',
      relationship: 'Wife',
      gender: 'female',
      generation: 2,
      branch: 'Uncle 2 Branch',
      displayOrder: 7,
      dateOfBirth: '1969',
      isLiving: true,
      occupation: 'Medical Doctor & Pediatrician',
      shortBio: 'A kind-hearted physician whose caring nature extends to everyone who crosses her path.',
      biography: 'Second Uncle Wife has healed countless children in her practice and brings boundless kindness to all family gatherings.',
      profilePhoto: mediaMap['uncle2-wife.svg'],
      spouse: uncle2.id,
      featured: true,
    },
  })

  const uncle2ElderDaughter = await payload.create({
    collection: 'family-members',
    data: {
      fullName: 'Second Uncle Elder Daughter',
      slug: 'second-uncle-elder-daughter',
      relationship: 'Elder Daughter',
      gender: 'female',
      generation: 3,
      branch: 'Uncle 2 Branch',
      displayOrder: 8,
      dateOfBirth: '1996',
      isLiving: true,
      occupation: 'Bio-medical Researcher',
      shortBio: 'Inquisitive researcher working on genetics and passionate classical violinist.',
      biography: 'Second Uncle Elder Daughter graduated with highest honors and is pursuing medical research, embodying the diligence of both her parents.',
      profilePhoto: mediaMap['uncle2-elder-daughter.svg'],
      parent: uncle2.id,
      featured: true,
    },
  })

  const uncle2Son = await payload.create({
    collection: 'family-members',
    data: {
      fullName: 'Second Uncle Son',
      slug: 'second-uncle-son',
      relationship: 'Son',
      gender: 'male',
      generation: 3,
      branch: 'Uncle 2 Branch',
      displayOrder: 9,
      dateOfBirth: '2000',
      isLiving: true,
      occupation: 'Software Engineer & Athlete',
      shortBio: 'Energetic technologist and marathon runner, always bringing vitality to reunions.',
      biography: 'Second Uncle Son represents the digital millennium generation. He loves competitive sports, artificial intelligence, and organizing outdoor family adventures.',
      profilePhoto: mediaMap['uncle2-son.svg'],
      parent: uncle2.id,
      featured: true,
    },
  })

  await payload.update({
    collection: 'family-members',
    id: uncle2.id,
    data: {
      spouse: uncle2Wife.id,
      children: [uncle2ElderDaughter.id, uncle2Son.id],
    },
  })
  await payload.update({
    collection: 'family-members',
    id: uncle2Wife.id,
    data: {
      children: [uncle2ElderDaughter.id, uncle2Son.id],
    },
  })

  console.log('[Seed] Seeding Generation 2 & 3: Third Uncle Branch...')
  // Uncle 3 Branch
  const uncle3 = await payload.create({
    collection: 'family-members',
    data: {
      fullName: 'Third Uncle',
      slug: 'third-uncle',
      relationship: 'Third Uncle',
      gender: 'male',
      generation: 2,
      branch: 'Uncle 3 Branch',
      displayOrder: 10,
      dateOfBirth: '1971',
      isLiving: true,
      occupation: 'Landscape Architect & Conservationist',
      shortBio: 'A creative architect blending natural ecosystems with modern sustainable living.',
      biography: 'Third Uncle designed multiple award-winning public parks and green spaces. He possesses Grandfather’s love of the outdoors and craftsmanship.',
      profilePhoto: mediaMap['uncle3.svg'],
      parent: grandfather.id,
      featured: true,
    },
  })

  const uncle3Wife = await payload.create({
    collection: 'family-members',
    data: {
      fullName: 'Third Uncle Wife',
      slug: 'third-uncle-wife',
      relationship: 'Wife',
      gender: 'female',
      generation: 2,
      branch: 'Uncle 3 Branch',
      displayOrder: 11,
      dateOfBirth: '1974',
      isLiving: true,
      occupation: 'Botanist & Horticultural Specialist',
      shortBio: 'Lover of indigenous flora, culinary herbs, and organic horticulture.',
      biography: 'Third Uncle Wife transformed the grounds of every family property into thriving, colorful gardens full of fruit trees and native flowering shrubs.',
      profilePhoto: mediaMap['uncle3-wife.svg'],
      spouse: uncle3.id,
      featured: true,
    },
  })

  const uncle3Daughter = await payload.create({
    collection: 'family-members',
    data: {
      fullName: 'Third Uncle Daughter',
      slug: 'third-uncle-daughter',
      relationship: 'Daughter',
      gender: 'female',
      generation: 3,
      branch: 'Uncle 3 Branch',
      displayOrder: 12,
      dateOfBirth: '2004',
      isLiving: true,
      occupation: 'Environmental Science Student & Pianist',
      shortBio: 'Talented musician and passionate champion of climate ecology.',
      biography: 'Third Uncle Daughter delights every family gathering with spontaneous piano recitals and enthusiasm for wilderness trekking.',
      profilePhoto: mediaMap['uncle3-daughter.svg'],
      parent: uncle3.id,
      featured: true,
    },
  })

  await payload.update({
    collection: 'family-members',
    id: uncle3.id,
    data: {
      spouse: uncle3Wife.id,
      children: [uncle3Daughter.id],
    },
  })
  await payload.update({
    collection: 'family-members',
    id: uncle3Wife.id,
    data: {
      children: [uncle3Daughter.id],
    },
  })

  console.log('[Seed] Seeding Generation 2 & 3: Aunty Branch...')
  // Aunty Branch
  const aunty = await payload.create({
    collection: 'family-members',
    data: {
      fullName: 'Aunty',
      slug: 'aunty',
      relationship: 'Aunty',
      gender: 'female',
      generation: 2,
      branch: 'Aunty Branch',
      displayOrder: 13,
      dateOfBirth: '1975',
      isLiving: true,
      occupation: 'Diplomat & Cultural Affairs Director',
      shortBio: 'The cherished daughter of Grandparents, known for eloquence, empathy, and international service.',
      biography: 'Aunty has represented cultural exchange missions across several continents. Despite a demanding career, she has always been the joyful center of family reunions.',
      profilePhoto: mediaMap['aunty.svg'],
      parent: grandfather.id,
      featured: true,
    },
  })

  const auntySon = await payload.create({
    collection: 'family-members',
    data: {
      fullName: 'Aunty Son',
      slug: 'aunty-son',
      relationship: 'Son',
      gender: 'male',
      generation: 3,
      branch: 'Aunty Branch',
      displayOrder: 14,
      dateOfBirth: '2008',
      isLiving: true,
      occupation: 'High School Scholar & Aspiring Filmmaker',
      shortBio: 'Youngest grandson of Generation 3 with a sharp cinematic eye and witty humor.',
      biography: 'Aunty Son is passionate about documentary cinema, capturing oral histories of our family elders on video, and playing competitive football.',
      profilePhoto: mediaMap['aunty-son.svg'],
      parent: aunty.id,
      featured: true,
    },
  })

  await payload.update({
    collection: 'family-members',
    id: aunty.id,
    data: {
      children: [auntySon.id],
    },
  })

  // Update Grandfather & Grandmother children list
  const childrenIds = [uncle1.id, uncle2.id, uncle3.id, aunty.id]
  await payload.update({
    collection: 'family-members',
    id: grandfather.id,
    data: { children: childrenIds },
  })
  await payload.update({
    collection: 'family-members',
    id: grandmother.id,
    data: { children: childrenIds },
  })

  console.log('[Seed] Seeding Memories...')
  await payload.create({
    collection: 'memories',
    data: {
      title: 'The Grand Homestead Silver Jubilee Reunion',
      slug: 'grand-homestead-silver-jubilee-reunion',
      date: 'Summer 1985',
      location: 'Ancestral Homestead Gardens',
      description: 'A landmark summer where all four siblings, spouses, and early grandchildren returned home. Under lanterns strung across the courtyard, Grandfather toasted the enduring unity of the family.',
      featured: true,
      photos: [mediaMap['family-gathering.svg']],
      people: [grandfather.id, grandmother.id, uncle1.id, uncle2.id, uncle3.id, aunty.id],
    },
  })

  await payload.create({
    collection: 'memories',
    data: {
      title: 'Grandparents 50th Golden Wedding Anniversary',
      slug: 'grandparents-50th-golden-wedding-anniversary',
      date: 'Spring 2010',
      location: 'Heritage Grand Pavilion',
      description: 'Celebrating half a century of devotion. Grandfather and Grandmother renewed their vows surrounded by three living generations of children and grandchildren.',
      featured: true,
      photos: [mediaMap['wedding-archive.svg']],
      people: [grandfather.id, grandmother.id, uncle1.id, uncle2.id, uncle3.id, aunty.id],
    },
  })

  await payload.create({
    collection: 'memories',
    data: {
      title: 'The Ancestral Courtyard Games & Harvest Festival',
      slug: 'ancestral-courtyard-games-and-festival',
      date: 'Autumn 2016',
      location: 'Ancestral Courtyard',
      description: 'A weekend filled with festive music, traditional storytelling around the stove, and the grandchildren competing in traditional board games.',
      featured: true,
      photos: [mediaMap['childhood-days.svg'], mediaMap['festival-lights.svg']],
      people: [uncle1Daughter.id, uncle2ElderDaughter.id, uncle2Son.id, uncle3Daughter.id, auntySon.id],
    },
  })

  console.log('[Seed] Seeding Timeline Events...')
  const timelineData = [
    { year: '1960', title: 'Grandparents United in Sacred Marriage', description: 'Grandfather and Grandmother unite their lives and establish the ancestral home.', category: 'Marriage', order: 1 },
    { year: '1962', title: 'Arrival of First Child (First Uncle)', description: 'The family welcomes their eldest son, marking the dawn of Generation 2.', category: 'Birth', order: 2 },
    { year: '1966', title: 'Birth of Second Uncle', description: 'The family grows as the second son is born into the household.', category: 'Birth', order: 3 },
    { year: '1971', title: 'Arrival of Third Uncle', description: 'The third son is welcomed with celebration across the neighborhood.', category: 'Birth', order: 4 },
    { year: '1975', title: 'Birth of Beloved Daughter (Aunty)', description: 'The youngest child and only daughter brings boundless joy to the family.', category: 'Birth', order: 5 },
    { year: '1985', title: 'The Landmark Grand Reunion', description: 'Over thirty family members gather to celebrate family unity and heritage.', category: 'Celebration', order: 6 },
    { year: '1992', title: 'First Grandchild Welcomed (Generation 3)', description: 'The arrival of Uncle 1 Daughter marks the birth of the third generation.', category: 'Birth', order: 7 },
    { year: '2010', title: 'Golden Wedding Anniversary', description: 'Fifty years of love and resilience honored by three generations.', category: 'Celebration', order: 8 },
    { year: '2026', title: 'Digital Family Heritage Archive Launched', description: 'A persistent digital sanctuary capturing our collective history for posterity.', category: 'Achievement', order: 9 },
  ]

  for (const t of timelineData) {
    await payload.create({
      collection: 'timeline-events',
      data: t,
    })
  }

  console.log('[Seed] Seed completed successfully!')
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('[Seed] Error during seeding:', err)
    process.exit(1)
  })
