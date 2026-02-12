-- REMICCO Seed Data
-- Run this SQL in your Supabase SQL Editor after running 001_schema.sql
-- Safe to re-run: tables are cleared before inserting seed data

-- ============================================
-- CLEAR EXISTING DATA (order matters due to no FK constraints)
-- ============================================
TRUNCATE TABLE hero_content RESTART IDENTITY CASCADE;
TRUNCATE TABLE hero_slides RESTART IDENTITY CASCADE;
TRUNCATE TABLE stats RESTART IDENTITY CASCADE;
TRUNCATE TABLE about_content RESTART IDENTITY CASCADE;
TRUNCATE TABLE highlights RESTART IDENTITY CASCADE;
TRUNCATE TABLE awards RESTART IDENTITY CASCADE;
TRUNCATE TABLE services RESTART IDENTITY CASCADE;
TRUNCATE TABLE news_articles RESTART IDENTITY CASCADE;
TRUNCATE TABLE events RESTART IDENTITY CASCADE;
TRUNCATE TABLE gallery_images RESTART IDENTITY CASCADE;
TRUNCATE TABLE contact_info RESTART IDENTITY CASCADE;

-- ============================================
-- HERO CONTENT
-- ============================================
INSERT INTO hero_content (tagline, heading, heading_highlight, description, primary_button_text, primary_button_link, secondary_button_text, secondary_button_link)
VALUES (
  'Est. 2018 • Mindoro, Philippines',
  'Empowering Mindoreños Through',
  'Faith-Guided',
  'The Responsible and Empowered Mindoreños Credit Cooperative — where trust, solidarity, and shared belief transform limited resources into meaningful opportunities.',
  'Join Our Community',
  '#contact',
  'Learn More',
  '#about'
);

-- ============================================
-- HERO SLIDES (using placeholder URLs - replace with actual Supabase Storage URLs)
-- ============================================
INSERT INTO hero_slides (image_url, alt_text, order_index, is_active) VALUES
  ('/assets/remiccoMainhero.jpg', 'REMICCO Main Hero', 1, true),
  ('/assets/remiccohero2.jpg', 'REMICCO Community', 2, true),
  ('/assets/hero1.png', 'REMICCO Members', 3, true);

-- ============================================
-- STATS
-- ============================================
INSERT INTO stats (label, value, icon, order_index, is_active) VALUES
  ('Active Members', '270+', 'Users', 1, true),
  ('Total Assets', '₱27.6M', 'Heart', 2, true),
  ('Paid-up Capital', '₱21M', 'Shield', 3, true);

-- ============================================
-- ABOUT CONTENT
-- ============================================
INSERT INTO about_content (
  section_tag,
  section_title,
  paragraphs,
  quote_text,
  quote_author,
  citation_text,
  citation_url,
  vision_title,
  vision_text,
  mission_title,
  mission_text
) VALUES (
  'Rooted in Faith, Built by the People',
  'Our Story',
  ARRAY[
    '<strong>REMICCO</strong> was organized in 2018 in response to the growing socio-economic challenges faced by working families in Oriental and Occidental Mindoro. From the outset, it was envisioned not merely as a financial institution but as a <strong>people-centered cooperative rooted in service and solidarity</strong>.',
    'During a pre-registration seminar on 3 February 2018, <strong>79 founding members</strong> committed their trust and resources, raising an initial capitalization of <strong>₱711,000</strong>. The cooperative was officially registered with the Cooperative Development Authority (CDA) on 25 April 2018.'
  ],
  'For many of us, joining REMICCO was an act of faith. We believed that by helping one another save and grow, we could free ourselves from debt traps and uncertainty.',
  'A Founding Member',
  'Source: Virola, Madonna T. "REMICCO: A Ministry of Hope." Radio Veritas Asia, 23 January 2026.',
  'https://rvasia.org',
  'Our Vision',
  'To become a leading financial cooperative in Oriental Mindoro while remaining socially responsible to the wider community — where finance, rooted in faith and solidarity, becomes a ministry of hope.',
  'Our Mission',
  'To integrate financial services with personal and spiritual formation — forming responsible stewards who understand that financial growth must always go hand in hand with integrity, accountability, and concern for others.'
);

-- ============================================
-- HIGHLIGHTS
-- ============================================
INSERT INTO highlights (text, order_index, is_active) VALUES
  ('79 founding members in 2018', 1, true),
  ('CDA registered since April 25, 2018', 2, true),
  ('Most Outstanding Cooperative (MIMAROPA 2023)', 3, true),
  ('1st Runner-Up CDA National Gawad Parangal', 4, true),
  ('Guided by the 5Cs of Credit', 5, true),
  ('Inspired by St. Mark the Evangelist', 6, true);

-- ============================================
-- AWARDS
-- ============================================
INSERT INTO awards (year, title, order_index, is_active) VALUES
  ('2023', 'Most Outstanding Cooperative (Small Category) — MIMAROPA', 1, true),
  ('2023', '1st Runner-Up — CDA National Gawad Parangal', 2, true),
  ('2025', 'Regional Recognition (Medium Category) — MIMAROPA', 3, true);

-- ============================================
-- SERVICES
-- ============================================
INSERT INTO services (icon, title, description, full_description, features, requirements, terms, interest_rate, loan_amount_range, payment_terms, contact_info, order_index, is_active) VALUES
  (
    'Wallet', 
    'Regular Loans', 
    'Affordable personal loans with flexible repayment terms designed for working families.',
    'Our Regular Loan program provides accessible financing for your personal needs. Whether it''s for home improvement, medical expenses, or family occasions, we''re here to support you with competitive rates and flexible terms that fit your budget.',
    '["Quick approval process (3-5 business days)", "Flexible payment terms up to 36 months", "No prepayment penalties", "Grace period options available", "Automatic salary deduction available"]',
    '["Active REMICCO membership for at least 3 months", "Valid government-issued ID", "Proof of income (payslip, ITR, or business permit)", "2 co-makers who are also REMICCO members", "Proof of residence"]',
    'Loan amount is based on your share capital and payment capacity. Interest is computed monthly on the diminishing balance.',
    '1.5% - 2% per month',
    '₱5,000 - ₱200,000',
    '6, 12, 18, 24, or 36 months',
    'Visit our main office in Victoria or call during business hours for loan counseling and application.',
    1,
    true
  ),
  (
    'PiggyBank', 
    'Savings Programs', 
    'Secure savings accounts with competitive interest rates to help you build for the future.',
    'Build your financial security with our comprehensive savings programs. From regular savings to time deposits, we offer various options to help you grow your money safely while earning competitive returns.',
    '["PDIC insured up to ₱100,000", "Competitive interest rates", "No maintaining balance for regular savings", "Withdrawable anytime during office hours", "Quarterly interest crediting", "Online balance inquiry"]',
    '["REMICCO membership", "Valid government-issued ID", "Initial deposit of ₱100 for regular savings", "Filled-out account opening form"]',
    'Regular savings earn 2% annual interest. Time deposits earn higher rates (3-5%) depending on term. Voluntary shares earn annual dividends.',
    '2% - 5% per annum',
    'Minimum ₱100 initial deposit',
    'Regular savings: Anytime withdrawal. Time deposits: 3, 6, or 12 months',
    'Open your account at our main office. Bring valid ID and initial deposit.',
    2,
    true
  ),
  (
    'Building', 
    'Livelihood Loans', 
    'Capital support for small businesses and entrepreneurial ventures in the community.',
    'Empower your entrepreneurial spirit with our Livelihood Loan program. Designed specifically for small business owners and aspiring entrepreneurs, this program provides the capital you need to start or expand your business venture.',
    '["Higher loan amounts up to ₱500,000", "Longer payment terms up to 60 months", "Business development support and training", "Flexible collateral options", "Seasonal payment adjustments for agricultural businesses"]',
    '["REMICCO membership in good standing", "Business plan or proposal", "Business permit or DTI registration", "Proof of business address", "Business financial statements (if existing)", "Collateral (depending on loan amount)"]',
    'Loan amount based on business viability and collateral. Site inspection may be required. Business training attendance is required for first-time borrowers.',
    '1.5% - 2% per month',
    '₱20,000 - ₱500,000',
    '12, 24, 36, 48, or 60 months',
    'Schedule a business consultation appointment at our office for loan assessment.',
    3,
    true
  ),
  (
    'GraduationCap', 
    'Educational Loans', 
    'Investment in education through accessible study-now-pay-later programs.',
    'Invest in your family''s future through education. Our Educational Loan program helps members finance tuition fees and other school-related expenses, making quality education accessible to all REMICCO families.',
    '["Covers tuition and miscellaneous fees", "Direct payment to educational institution", "Flexible payment terms aligned with school calendar", "Available for college, senior high, and vocational courses", "Renewal available for continuing students"]',
    '["Active REMICCO membership", "Student enrollment proof", "School billing statement", "Student''s report card (for renewals)", "Parent/guardian co-maker"]',
    'Loan proceeds are paid directly to the school. Payment starts one month after loan release. Interest rates are lower than regular loans.',
    '1% - 1.5% per month',
    '₱10,000 - ₱150,000 per semester',
    '6 or 12 months per semester',
    'Apply at least 2 weeks before enrollment deadline. Bring enrollment documents.',
    4,
    true
  ),
  (
    'HeartHandshake', 
    'Emergency Assistance', 
    'Quick access to funds during emergencies with simplified processing.',
    'When unexpected emergencies arise, REMICCO is here to help. Our Emergency Assistance program provides quick financial support for urgent medical needs, calamities, and other unforeseen circumstances.',
    '["Fast approval (same day or next business day)", "Minimal documentation required", "No collateral needed for smaller amounts", "Calamity loan with zero interest available", "Flexible payment terms", "Can be availed even with existing loan"]',
    '["REMICCO membership", "Valid ID", "Emergency proof (hospital bill, death certificate, etc.)", "1 co-maker for amounts above ₱10,000"]',
    'For calamity loans in declared disaster areas, special terms apply including possible interest waivers. Maximum loan amount depends on share capital.',
    '1% - 2% per month (0% for qualified calamity loans)',
    '₱5,000 - ₱20,000',
    '3, 6, or 12 months',
    'For emergencies, visit our office immediately or call our hotline for assistance.',
    5,
    true
  ),
  (
    'Users', 
    'Member Benefits', 
    'Exclusive benefits including insurance coverage, dividends, and community programs.',
    'Being a REMICCO member means more than just access to financial services. Enjoy a comprehensive package of benefits designed to support your family''s welfare and build a stronger community together.',
    '["Annual dividends on share capital", "Patronage refunds based on transactions", "Life insurance coverage", "Educational scholarships for dependents", "Medical assistance program", "Livelihood training and seminars", "Annual general assembly with raffle prizes", "Discounts from partner merchants"]',
    '["Active REMICCO membership", "Good standing (no delinquent loans)", "Minimum share capital maintained", "Updated member information"]',
    'Dividends and patronage refunds are distributed annually during the Annual General Assembly. Insurance coverage is automatic for all members in good standing.',
    'Not applicable',
    'Not applicable',
    'Benefits effective upon membership approval',
    'Visit our office for complete member benefits information and scholarship application.',
    6,
    true
  );

-- ============================================
-- NEWS ARTICLES
-- ============================================
INSERT INTO news_articles (title, excerpt, image_url, category, author, source, source_url, published_date, is_featured, is_active) VALUES
  (
    'REMICCO Featured in Radio Veritas Asia',
    'REMICCO''s story of faith-guided finance and community empowerment was featured in Radio Veritas Asia, highlighting how the cooperative has become a ministry of hope for Mindoreño families.',
    '/assets/gallery/gallery1remicco.jpg',
    'Media Feature',
    'Madonna T. Virola',
    'Radio Veritas Asia',
    'https://rvasia.org',
    '2026-01-23',
    true,
    true
  ),
  (
    'REMICCO Receives Regional Recognition 2025',
    'In October 2025, REMICCO again received regional recognition from CDA MIMAROPA, this time in the Medium Category, affirming continued growth and excellence in cooperative governance.',
    '/assets/gallery/Aruga Kapatid FOundation outreach program.jpg',
    'Awards',
    NULL,
    NULL,
    NULL,
    '2025-10-15',
    false,
    true
  ),
  (
    'Community Outreach: Faith in Action Beyond Finance',
    'True to cooperative principles, REMICCO extends its mission beyond financial services through elderly wellness programs, outreach to indigenous peoples, humanitarian assistance, and environmental stewardship activities.',
    '/assets/gallery/outreach program.jpg',
    'Community',
    NULL,
    NULL,
    NULL,
    '2025-12-01',
    false,
    true
  );

-- ============================================
-- EVENTS
-- ============================================
INSERT INTO events (title, event_date, location, description, is_active) VALUES
  ('Annual General Assembly 2026', '2026-02-15', 'Calapan City', 'Annual meeting for all cooperative members.', true),
  ('Financial Literacy Workshop', '2026-02-20', 'Victoria, Oriental Mindoro', 'Free workshop on financial management and savings.', true),
  ('Member Appreciation Day', '2026-03-05', 'REMICCO Main Office', 'A day to celebrate and thank our valued members.', true);

-- ============================================
-- GALLERY IMAGES
-- ============================================
INSERT INTO gallery_images (image_url, title, category, date, order_index, is_active) VALUES
  ('/assets/gallery/gallery1remicco.jpg', 'REMICCO Community Event', 'Events', '2025', 1, true),
  ('/assets/gallery/gallery1.jpg', 'REMICCO Activities', 'Events', '2025', 2, true),
  ('/assets/gallery/gallery2.jpg', 'Member Gathering', 'Events', '2025', 3, true),
  ('/assets/gallery/gallery3.jpg', 'Cooperative Assembly', 'Meetings', '2025', 4, true),
  ('/assets/gallery/gallery4.jpg', 'Community Service', 'Community Outreach', '2025', 5, true),
  ('/assets/gallery/gallery5.jpg', 'REMICCO Program', 'Events', '2025', 6, true),
  ('/assets/gallery/Aruga Kapatid FOundation outreach program.jpg', 'Aruga Kapatid Foundation Outreach Program', 'Community Outreach', '2025', 7, true),
  ('/assets/gallery/cash assistance to Lingap center for PDL program.jpg', 'Cash Assistance to Lingap Center for PDL Program', 'Community Outreach', '2025', 8, true),
  ('/assets/gallery/distributin of school supplies pandemic.jpg', 'Distribution of School Supplies During Pandemic', 'Community Outreach', '2025', 9, true),
  ('/assets/gallery/distribution of school supplies 9 pandemic.jpg', 'Distribution of School Supplies During Pandemic', 'Community Outreach', '2025', 10, true),
  ('/assets/gallery/donation of classroom wall fun and school supplies- dulangan 3, baco.jpg', 'Donation of Classroom Supplies - Dulangan, Baco', 'Community Outreach', '2025', 11, true),
  ('/assets/gallery/donation of classroom wall fun and school supplies- dulangan 3, baco (2).jpg', 'Donation of Classroom Supplies - Dulangan, Baco', 'Community Outreach', '2025', 12, true),
  ('/assets/gallery/donation of classroom wall fun and school supplies- dulangan 3, baco (3).jpg', 'Donation of Classroom Supplies - Dulangan, Baco', 'Community Outreach', '2025', 13, true),
  ('/assets/gallery/management and officers seminars.jpg', 'Management and Officers Seminar', 'Seminars', '2025', 14, true),
  ('/assets/gallery/management  and officers seminars.jpg', 'Management and Officers Seminar', 'Seminars', '2025', 15, true),
  ('/assets/gallery/management and  officers seminars.jpg', 'Management and Officers Seminar', 'Seminars', '2025', 16, true),
  ('/assets/gallery/management and officers seminars (2).jpg', 'Management and Officers Seminar', 'Seminars', '2025', 17, true),
  ('/assets/gallery/mangyan outreach program.jpg', 'Mangyan Outreach Program', 'Community Outreach', '2025', 18, true),
  ('/assets/gallery/mangyan school outreach program.jpg', 'Mangyan School Outreach Program', 'Community Outreach', '2025', 19, true),
  ('/assets/gallery/outhreach program to mangyan  community.jpg', 'Outreach to Mangyan Community', 'Community Outreach', '2025', 20, true),
  ('/assets/gallery/outreach program in Mangyan comunity Mirayan Gloria solar lights for 14 families and sacks  of rice.jpg', 'Solar Lights for Mangyan Community - Mirayan, Gloria', 'Community Outreach', '2025', 21, true),
  ('/assets/gallery/outreach program in Mangyan comunity Mirayan Gloria solar lights for 14 families and sacks  of rice (2).jpg', 'Solar Lights for Mangyan Community - Mirayan, Gloria', 'Community Outreach', '2025', 22, true),
  ('/assets/gallery/outreach program in Mangyan comunity Mirayan Gloria solar lights for 14 families and sacks  of rice (3).jpg', 'Solar Lights for Mangyan Community - Mirayan, Gloria', 'Community Outreach', '2025', 23, true),
  ('/assets/gallery/outreach program in Mangyan comunity Mirayan Gloria solar lights for 14 families and sacks  of rice (4).jpg', 'Solar Lights for Mangyan Community - Mirayan, Gloria', 'Community Outreach', '2025', 24, true),
  ('/assets/gallery/outreach program in Mangyan comunity Mirayan Gloria solar lights for 14 families and sacks  of rice (5).jpg', 'Solar Lights for Mangyan Community - Mirayan, Gloria', 'Community Outreach', '2025', 25, true),
  ('/assets/gallery/outreach program to mangyan community (2).jpg', 'Outreach to Mangyan Community', 'Community Outreach', '2025', 26, true),
  ('/assets/gallery/outreach program to Mangyan community.jpg', 'Outreach to Mangyan Community', 'Community Outreach', '2025', 27, true),
  ('/assets/gallery/outreach program.jpg', 'Community Outreach Program', 'Community Outreach', '2025', 28, true),
  ('/assets/gallery/outreach toBahay Aruga foundation- home for the aged.jpg', 'Outreach to Bahay Aruga Foundation', 'Community Outreach', '2025', 29, true),
  ('/assets/gallery/outreacn program to mangyan community.jpg', 'Outreach to Mangyan Community', 'Community Outreach', '2025', 30, true),
  ('/assets/gallery/tree planting activity.jpg', 'Tree Planting Activity', 'Community Outreach', '2025', 31, true),
  ('/assets/gallery/tree planting activity (2).jpg', 'Tree Planting Activity', 'Community Outreach', '2025', 32, true),
  ('/assets/gallery/tree planting.jpg', 'Tree Planting Activity', 'Community Outreach', '2025', 33, true);

-- ============================================
-- CONTACT INFO
-- ============================================
INSERT INTO contact_info (address, phone, email, office_hours, facebook_url) VALUES
  (
    'Calapan City, Oriental Mindoro, Philippines',
    '+63 123 456 789',
    'info@remicco.org',
    ARRAY['Mon - Fri: 8:00 AM - 5:00 PM', 'Sat: 8:00 AM - 12:00 PM'],
    'https://facebook.com/remicco'
  );
