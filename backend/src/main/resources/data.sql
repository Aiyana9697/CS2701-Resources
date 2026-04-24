
INSERT INTO users (
    name,
    username,
    email,
    password_hash,
    role,
    status,
    join_date,
    last_login,
    avatar_url,
    created_at,
    updated_at
) VALUES
(
    'Admin User',
    'admin',
    'admin@oceaniq.org',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'ADMIN',
    'ACTIVE',
    CURRENT_DATE - INTERVAL '90 days',
    NOW() - INTERVAL '2 days',
    NULL,
    NOW() - INTERVAL '90 days',
    NOW()
),
(
    'Explorer User',
    'explorer',
    'explorer@oceaniq.org',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'USER',
    'ACTIVE',
    CURRENT_DATE - INTERVAL '60 days',
    NOW() - INTERVAL '10 days',
    NULL,
    NOW() - INTERVAL '60 days',
    NOW()
),
(
    'Research Analyst',
    'researcher',
    'researcher@oceaniq.org',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'USER',
    'ACTIVE',
    CURRENT_DATE - INTERVAL '45 days',
    NOW() - INTERVAL '5 days',
    NULL,
    NOW() - INTERVAL '45 days',
    NOW()
),
(
    'Dr Sarah Chen',
    'dr_chen',
    'sarah.chen@oceaniq.org',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'USER',
    'ACTIVE',
    CURRENT_DATE - INTERVAL '120 days',
    NOW() - INTERVAL '1 day',
    NULL,
    NOW() - INTERVAL '120 days',
    NOW()
),
(
    'James Wright',
    'marine_biologist',
    'james.wright@oceaniq.org',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'USER',
    'ACTIVE',
    CURRENT_DATE - INTERVAL '30 days',
    NOW() - INTERVAL '3 days',
    NULL,
    NOW() - INTERVAL '30 days',
    NOW()
),
(
    'Alex Rivera',
    'student_alex',
    'alex.rivera@oceaniq.org',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'USER',
    'ACTIVE',
    CURRENT_DATE - INTERVAL '15 days',
    NOW() - INTERVAL '1 day',
    NULL,
    NOW() - INTERVAL '15 days',
    NOW()
);

-- ============================================
-- REGIONS (Ocean Mining Sites)
-- ============================================
INSERT INTO regions (
    name,
    description,
    coordinates,
    ocean_name,
    type,
    created_at
) VALUES
(
    'Clarion-Clipperton Zone',
    'Largest known polymetallic nodule field in the Pacific Ocean',
    '13.5,-130.0',
    'Pacific Ocean',
    'OCEAN',
    NOW() - INTERVAL '180 days'
),
(
    'Mid-Atlantic Ridge',
    'Underwater mountain range with hydrothermal vent ecosystems',
    '0.0,-29.0',
    'Atlantic Ocean',
    'OCEAN',
    NOW() - INTERVAL '150 days'
),
(
    'Indian Ocean Triple Junction',
    'Tectonically active mineral-rich seabed region',
    '-25.0,70.0',
    'Indian Ocean',
    'OCEAN',
    NOW() - INTERVAL '120 days'
),
(
    'Costa Rica Dome',
    'Nutrient-rich upwelling zone with high biodiversity',
    '9.0,-90.0',
    'Pacific Ocean',
    'OCEAN',
    NOW() - INTERVAL '200 days'
),
(
    'Mariana Trench',
    'Deepest ocean trench with extremophile ecosystems',
    '11.3493,142.1996',
    'Pacific Ocean',
    'TRENCH',
    NOW() - INTERVAL '90 days'
),
(
    'Peru Basin',
    'Abyssal plain with manganese nodule deposits',
    '-9.0,-90.0',
    'Pacific Ocean',
    'BASIN',
    NOW() - INTERVAL '60 days'
),
(
    'Galapagos Rift',
    'Volcanic ridge with unique hydrothermal biodiversity',
    '-0.8,-86.1',
    'Pacific Ocean',
    'RIDGE',
    NOW() - INTERVAL '175 days'
),
(
    'Kermadec Trench',
    'Deep ocean trench in the southwest Pacific',
    '-31.0,-177.0',
    'Pacific Ocean',
    'TRENCH',
    NOW() - INTERVAL '45 days'
),
(
    'Philippine Sea',
    'Mineral-rich marginal sea region',
    '15.0,135.0',
    'Pacific Ocean',
    'SEA',
    NOW() - INTERVAL '100 days'
),
(
    'Azores Platform',
    'Volcanic plateau with protected marine ecosystems',
    '38.0,-28.0',
    'Atlantic Ocean',
    'PLATFORM',
    NOW() - INTERVAL '80 days'
);

-- ============================================
-- SPECIES (Marine Biodiversity)
-- ============================================
INSERT INTO species (
    common_name,
    scientific_name,
    species_category,
    conservation_status,
    description,
    image_url,
    habitat,
    average_size,
    average_lifespan,
    diet,
    is_featured,
    created_at,
    updated_at
) VALUES

-- Abyssal Octopus (deep-sea mollusk)
(
    'Abyssal Octopus',
    'Grimpoteuthis sp.',
    'MOLLUSK',
    'VULNERABLE',
    'Small deep-sea octopus known for ear-like fins',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
    'ABYSSAL_PLAINS',
    '20-30 cm',
    '5-7 years',
    'CARNIVORE',
    true,
    NOW() - INTERVAL '90 days',
    NOW()
),

-- Glass Sponge
(
    'Glass Sponge',
    'Hexactinellida',
    'CNIDARIAN',
    'ENDANGERED',
    'Ancient filter-feeding organisms with silica skeletons',
    'https://images.unsplash.com/photo-1583212292454-1fe6229603b7',
    'DEEP_SEA',
    'Up to 1m',
    'Unknown',
    'FILTER_FEEDER',
    false,
    NOW() - INTERVAL '85 days',
    NOW()
),

-- Yeti Crab
(
    'Yeti Crab',
    'Kiwa hirsuta',
    'CRUSTACEAN',
    'VULNERABLE',
    'Hairy crab found near hydrothermal vents',
    'https://images.unsplash.com/photo-1535591273668-578e31182c4f',
    'DEEP_SEA',
    '15 cm',
    'Unknown',
    'OMNIVORE',
    true,
    NOW() - INTERVAL '75 days',
    NOW()
),

-- Blue Whale
(
    'Blue Whale',
    'Balaenoptera musculus',
    'MAMMAL',
    'ENDANGERED',
    'Largest animal on Earth',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
    'OPEN_OCEAN',
    '24-30m',
    '80-90 years',
    'FILTER_FEEDER',
    true,
    NOW() - INTERVAL '50 days',
    NOW()
),

-- Mariana Snailfish
(
    'Mariana Snailfish',
    'Pseudoliparis swirei',
    'FISH',
    'VULNERABLE',
    'Deepest-living fish ever recorded',
    'https://images.unsplash.com/photo-1535591273668-578e31182c4f',
    'HADAL_ZONE',
    '10-20 cm',
    'Unknown',
    'CARNIVORE',
    true,
    NOW() - INTERVAL '35 days',
    NOW()
);
-- ============================================
-- LEARNING MODULES
-- ============================================
INSERT INTO learning_modules (
    title,
    description,
    icon,
    lessons_count,
    duration,
    category,
    difficulty_level,
    created_at
) VALUES

('Introduction to Deep Sea Mining',
 'Learn the basics of ocean mineral extraction and its technological challenges',
 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
 5,
 '45m',
 'FUNDAMENTALS',
 'BEGINNER',
 NOW() - INTERVAL '180 days'),

('Marine Biodiversity Hotspots',
 'Explore critical ocean ecosystems and their unique species',
 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0',
 6,
 '1h',
 'ECOLOGY',
 'INTERMEDIATE',
 NOW() - INTERVAL '150 days'),

('Environmental Impact Assessment',
 'Understanding EIA processes for ocean projects',
 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
 7,
 '1h 30m',
 'POLICY',
 'ADVANCED',
 NOW() - INTERVAL '120 days'),

('Ocean Conservation Laws',
 'International treaties and regulations protecting marine environments',
 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
 5,
 '50m',
 'POLICY',
 'INTERMEDIATE',
 NOW() - INTERVAL '100 days'),

('Deep Sea Ecology 101',
 'Introduction to life in the deep ocean',
 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
 4,
 '40m',
 'ECOLOGY',
 'BEGINNER',
 NOW() - INTERVAL '90 days'),

('Hydrothermal Vent Systems',
 'Biology and geology of underwater volcanic vents',
 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0',
 6,
 '1h 15m',
 'ECOLOGY',
 'ADVANCED',
 NOW() - INTERVAL '60 days'),

('Sustainable Ocean Mining',
 'Balancing resource extraction with conservation',
 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
 5,
 '55m',
 'FUNDAMENTALS',
 'INTERMEDIATE',
 NOW() - INTERVAL '45 days'),

('Marine Protected Areas',
 'Design and management of ocean sanctuaries',
 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
 6,
 '1h 5m',
 'POLICY',
 'INTERMEDIATE',
 NOW() - INTERVAL '30 days'),

('Climate Change and Oceans',
 'How global warming affects marine ecosystems',
 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0',
 5,
 '45m',
 'ECOLOGY',
 'BEGINNER',
 NOW() - INTERVAL '20 days'),

('Data Analysis for Marine Science',
 'Using statistics and GIS for ocean research',
 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
 8,
 '2h',
 'TECHNOLOGY',
 'ADVANCED',
 NOW() - INTERVAL '10 days');
-- ============================================
-- DATASETS
-- ============================================
INSERT INTO datasets (
    name,
    description,
    uploader_id,
    upload_date,
    file_size,
    file_url,
    status,
    category,
    region_id,
    download_count,
    created_at,
    updated_at
) VALUES

('CCZ Biodiversity Survey 2024',
 'Comprehensive species inventory from sampling sites across the Clarion-Clipperton Zone',
 1,
 NOW() - INTERVAL '15 days',
 257000000,
 '/data/ccz-bio-2024.csv',
 'VERIFIED',
 'BIODIVERSITY',
 1,
 342,
 NOW() - INTERVAL '15 days',
 NOW()),

('Global Mining Sites Database',
 'Locations and operators of deep sea mining sites',
 2,
 NOW() - INTERVAL '30 days',
 13400000,
 '/data/mining-sites.json',
 'PENDING',
 'MINING',
 2,
 89,
 NOW() - INTERVAL '30 days',
 NOW()),

('Deep Sea Species Catalog',
 'Taxonomic data for deep sea species',
 3,
 NOW() - INTERVAL '60 days',
 523000000,
 '/data/species-catalog.csv',
 'VERIFIED',
 'SPECIES',
 3,
 1247,
 NOW() - INTERVAL '60 days',
 NOW()),

('Hydrothermal Vent Chemistry',
 'Chemical composition data from vent sites',
 1,
 NOW() - INTERVAL '45 days',
 89300000,
 '/data/vent-chemistry.xlsx',
 'VERIFIED',
 'CHEMISTRY',
 2,
 567,
 NOW() - INTERVAL '45 days',
 NOW()),

('Polymetallic Nodule Assays',
 'Mineral composition analysis of nodules',
 2,
 NOW() - INTERVAL '20 days',
 156700000,
 '/data/nodule-assays.csv',
 'PENDING',
 'GEOLOGY',
 1,
 234,
 NOW() - INTERVAL '20 days',
 NOW()),

('Marine Mammal Migration Patterns',
 'Satellite tracking of marine mammals',
 3,
 NOW() - INTERVAL '10 days',
 412900000,
 '/data/mammal-migration.gpx',
 'VERIFIED',
 'BIODIVERSITY',
 4,
 678,
 NOW() - INTERVAL '10 days',
 NOW()),

('EIA Repository - Pacific Region',
 'Environmental impact assessments for mining projects',
 1,
 NOW() - INTERVAL '90 days',
 1024500000,
 '/data/eia-pacific.pdf',
 'VERIFIED',
 'EIA',
 9,
 1893,
 NOW() - INTERVAL '90 days',
 NOW()),

('Seafloor Mapping - Mariana Region',
 'Bathymetric mapping data',
 2,
 NOW() - INTERVAL '5 days',
 2048000000,
 '/data/mariana-bathymetry.tif',
 'PENDING',
 'MAPPING',
 5,
 456,
 NOW() - INTERVAL '5 days',
 NOW()),

('Ocean Acidification Measurements',
 'pH and carbonate chemistry data',
 3,
 NOW() - INTERVAL '12 days',
 67400000,
 '/data/ocean-acidification.csv',
 'VERIFIED',
 'CHEMISTRY',
 6,
 892,
 NOW() - INTERVAL '12 days',
 NOW()),

('Indigenous Knowledge Database',
 'Traditional ocean management practices',
 1,
 NOW() - INTERVAL '40 days',
 34200000,
 '/data/indigenous-knowledge.json',
 'VERIFIED',
 'SOCIAL',
 10,
 178,
 NOW() - INTERVAL '40 days',
 NOW());
-- ============================================
-- INCIDENTS / ALERTS
-- ============================================
INSERT INTO incident_reports (
    user_id,
    contractor_id,
    region_id,
    report_type,
    title,
    summary_text,
    status,
    submitted_at,
    created_at
) VALUES

(1, 100, 1, 'ILLEGAL_FISHING',
 'Unauthorized Mining Activity Detected',
 'Seismic monitoring detected unusual drilling activity in protected zone 12A. Vessel appears unregistered.',
 'SUBMITTED',
 NOW() - INTERVAL '2 days',
 NOW() - INTERVAL '2 days'),

(2, 101, 2, 'SPECIES_THREAT',
 'Glass Sponge Population Decline',
 'ROV surveys show 45% decline in Hexactinellida populations near proposed mining site.',
 'UNDER_REVIEW',
 NOW() - INTERVAL '5 days',
 NOW() - INTERVAL '5 days'),

(3, 102, 4, 'OTHER',
 'Equipment Malfunction at Research Station',
 'Autonomous buoy offline for 6 hours due to power system failure.',
 'APPROVED',
 NOW() - INTERVAL '10 days',
 NOW() - INTERVAL '10 days'),

(4, 103, 6, 'POLLUTION',
 'Oil Leak from Mining Vessel',
 'Small hydraulic oil leak (~50L) detected from MV Deep Explorer.',
 'APPROVED',
 NOW() - INTERVAL '15 days',
 NOW() - INTERVAL '15 days'),

(5, 104, 7, 'SPECIES_THREAT',
 'Endangered Species Sighting in Mining Zone',
 'Galapagos penguin colony observed within restricted mining boundary.',
 'DRAFT',
 NOW() - INTERVAL '7 days',
 NOW() - INTERVAL '7 days'),

(6, 105, 1, 'OTHER',
 'Sediment Plume Exceeds Limits',
 'Sediment plume extended 12km, exceeding regulatory threshold.',
 'UNDER_REVIEW',
 NOW() - INTERVAL '3 days',
 NOW() - INTERVAL '3 days'),

(7, 106, 3, 'OTHER',
 'Underwater Earthquake - Mining Site Evacuation',
 'Magnitude 5.8 earthquake near active mining zone. Evacuation completed.',
 'APPROVED',
 NOW() - INTERVAL '20 days',
 NOW() - INTERVAL '20 days'),

(8, 107, 9, 'OTHER',
 'Invasive Species Introduction',
 'Non-native barnacles found on mining equipment.',
 'DRAFT',
 NOW() - INTERVAL '8 days',
 NOW() - INTERVAL '8 days'),

(9, 108, 1, 'OTHER',
 'Data Breach - Mining Coordinates Leaked',
 'Confidential exploration coordinates leaked online.',
 'UNDER_REVIEW',
 NOW() - INTERVAL '1 day',
 NOW() - INTERVAL '1 day'),

(10, 109, 4, 'SPECIES_THREAT',
 'Whale Entanglement in Survey Equipment',
 'Humpback whale entangled in hydrophone array, later freed safely.',
 'APPROVED',
 NOW() - INTERVAL '12 days',
 NOW() - INTERVAL '12 days');
-- ============================================
-- SAVED ITEMS (User Bookmarks)
-- ============================================
INSERT INTO saved_items (
    user_id,
    item_type,
    item_id,
    item_title,
    item_description,
    item_thumbnail,
    saved_at
) VALUES

-- Explorer
(2, 'REGION', 1, 'Clarion-Clipperton Zone',
 'High biodiversity area with critical mining risk',
 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
 NOW() - INTERVAL '3 days'),

(2, 'MODULE', 2, 'Marine Biodiversity Hotspots',
 'Intermediate level ecology course',
 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0',
 NOW() - INTERVAL '1 day'),

(2, 'SPECIES', 1, 'Abyssal Octopus',
 'Vulnerable deep-sea species',
 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
 NOW()),

(2, 'DATASET', 1, 'CCZ Biodiversity Survey 2024',
 'Latest survey data',
 NULL,
 NOW() - INTERVAL '2 days'),

-- Researcher
(3, 'DATASET', 3, 'Deep Sea Species Catalog',
 'Comprehensive taxonomic database',
 NULL,
 NOW() - INTERVAL '5 days'),

(3, 'REGION', 2, 'Mid-Atlantic Ridge',
 'Hydrothermal vent ecosystems',
 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0',
 NOW() - INTERVAL '4 days'),

(3, 'MODULE', 6, 'Hydrothermal Vent Systems',
 'Advanced vent ecology',
 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0',
 NOW() - INTERVAL '1 day'),

(3, 'SPECIES', 4, 'Yeti Crab',
 'Vent-endemic crustacean',
 'https://images.unsplash.com/photo-1535591273668-578e31182c4f',
 NOW() - INTERVAL '6 days'),

-- Dr. Chen
(4, 'DATASET', 7, 'EIA Repository - Pacific Region',
 'All Pacific EIA documents',
 NULL,
 NOW() - INTERVAL '10 days'),

(4, 'INCIDENT', 2, 'Glass Sponge Population Decline',
 'Critical biodiversity alert',
 NULL,
 NOW() - INTERVAL '5 days'),

(4, 'REGION', 4, 'Costa Rica Dome',
 'Protected upwelling zone',
 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
 NOW() - INTERVAL '8 days'),

-- Student Alex
(6, 'MODULE', 1, 'Introduction to Deep Sea Mining',
 'Beginner fundamentals',
 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
 NOW() - INTERVAL '7 days'),

(6, 'MODULE', 5, 'Deep Sea Ecology 101',
 'Intro to deep sea life',
 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
 NOW() - INTERVAL '6 days'),

(6, 'SPECIES', 9, 'Blue Whale',
 'Endangered megafauna',
 'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7',
 NOW() - INTERVAL '2 days');

-- ============================================
-- USER STATISTICS / ANALYTICS
-- ============================================
INSERT INTO user_stats (
    user_id,
    modules_completed,
    datasets_uploaded,
    discussions_started,
    incidents_reported,
    total_points,
    current_streak,
    longest_streak,
    last_activity_date,
    updated_at
) VALUES

(2, 3, 5, 8, 1, 120, 4, 7, NOW() - INTERVAL '60 days', NOW()),
(3, 12, 23, 34, 2, 540, 10, 15, NOW() - INTERVAL '45 days', NOW()),
(4, 18, 45, 67, 5, 980, 18, 22, NOW() - INTERVAL '120 days', NOW()),
(5, 8, 12, 19, 1, 310, 6, 9, NOW() - INTERVAL '30 days', NOW()),
(6, 2, 3, 4, 0, 90, 2, 3, NOW() - INTERVAL '15 days', NOW());
-- ============================================
-- EIA ENTRIES (Environmental Impact Assessments)
-- ============================================
INSERT INTO impact_reports (
    title,
    report_type,
    impact,
    uploaded_by,
    region_id,
    created_at
) VALUES

('DeepGreen CCZ Exploration Phase 2',
 'EIA',
 'HIGH',
 2,
 1,
 NOW() - INTERVAL '45 days'),

('MAR Hydrothermal Survey',
 'REMP',
 'MODERATE',
 3,
 2,
 NOW() - INTERVAL '60 days'),

('Indian Ocean Baseline Study',
 'EIA',
 'HIGH',
 4,
 3,
 NOW() - INTERVAL '20 days'),

('Peru Basin Mining Pilot',
 'EIA',
 'HIGH',
 5,
 6,
 NOW() - INTERVAL '90 days'),

('Kermadec Trench Research Station',
 'APEI',
 'LOW',
 6,
 8,
 NOW() - INTERVAL '15 days');
-- ============================================
-- Print completion message
-- ============================================
SELECT 'Database seeding completed successfully! ✅' AS status;
SELECT 'Total users: ' || COUNT(*) AS summary FROM users;
SELECT 'Total regions: ' || COUNT(*) AS summary FROM regions;
SELECT 'Total species: ' || COUNT(*) AS summary FROM species;
SELECT 'Total learning modules: ' || COUNT(*) AS summary FROM learning_modules;
SELECT 'Total datasets: ' || COUNT(*) AS summary FROM datasets;

-- ============================================
-- TIMELINE EVENTS
-- ============================================

INSERT INTO timeline_event (event_year, title, description, extended_details, impact) VALUES
(
  '1982',
  'UNCLOS Adopted',
  'The ''Constitution for the Oceans'' is signed, defining maritime zones.',
  'The United Nations Convention on the Law of the Sea (UNCLOS) defined the 200-nautical-mile Exclusive Economic Zone (EEZ) and declared the seabed beyond national jurisdiction as the ''Common Heritage of Mankind,'' managed by the ISA.',
  'positive'
),
(
  '1994',
  'ISA Operations Begin',
  'The International Seabed Authority (ISA) is formally established in Jamaica.',
  'The ISA was tasked with organizing and controlling all mineral-related activities in the international seabed area. Its dual mandate—to facilitate mining while protecting the marine environment—remains a subject of intense global debate today.',
  'mixed'
),
(
  '2015',
  'SDG 14 Established',
  'The UN adopts the 2030 Agenda, including Goal 14: Life Below Water.',
  'SDG 14 was the first universal global framework to explicitly target marine pollution, ocean acidification, and the regulation of harvesting to end overfishing. It set specific targets for conserving at least 10% of coastal and marine areas.',
  'positive'
),
(
  '2023',
  'The High Seas Treaty',
  'Nations agree to the BBNJ treaty to protect biodiversity beyond national jurisdiction.',
  'After nearly two decades of talks, the Biodiversity Beyond National Jurisdiction (BBNJ) treaty was agreed upon. It provides a legal framework for establishing Marine Protected Areas (MPAs) on the high seas, which cover nearly two-thirds of the ocean.',
  'positive'
),
(
  '2024',
  'The Mining Moratorium Call',
  '25+ countries call for a ''precautionary pause'' on deep-sea mining.',
  'With the ISA nearing the finalization of the Mining Code, a growing coalition of nations argued that scientific knowledge of the deep sea is insufficient to approve commercial mining without risking irreversible ecological damage.',
  'mixed'
);
