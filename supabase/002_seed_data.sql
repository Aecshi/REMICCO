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
TRUNCATE TABLE site_settings RESTART IDENTITY CASCADE;

-- ============================================
-- HERO CONTENT
-- ============================================
INSERT INTO hero_content (tagline, heading, heading_highlight, description, primary_button_text, primary_button_link, secondary_button_text, secondary_button_link)
VALUES (
  'Est. 2018 • Oriental Mindoro, Philippines',
  'Empowering Mindoreños Through',
  'Faith & Cooperation',
  'The Responsible and Empowered Mindoreños Credit Cooperative — aspiring to be a leading financial cooperative in Oriental Mindoro, contributing to the progress and empowerment of our members while remaining socially responsible to the community.',
  'Become a Member',
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
    'The <strong>Responsible and Empowered Mindoreños Credit Cooperative (REMICCO)</strong> was organized in 2018 through the initiative of <strong>Fr. Jimson H. Ruga</strong>, Chairman of the Board of Saklaw Foundation, Inc., a Microfinance NGO in Oriental Mindoro. Through his persistence, he convinced the Board of Trustees to organize a cooperative for the employees of the institution.',
    'The Board of Trustees and employees voluntarily contributed to the paid-up capital stock, raising <strong>₱711,000.00</strong> as starting capital. On <strong>February 3, 2018</strong>, a Pre-Registration Seminar was held at St. Augustine Seminary, attended by <strong>79 participants</strong> who elected interim officers to start the cooperative.',
    'Elected to the Board of Directors were Fr. Jimson H. Ruga, Beverlie C. Panganiban, Marjorie R. Mendoza (CPA), Dr. Iluminada M. Martin, and Nestor C. Salvacion. On <strong>March 5, 2018</strong>, the officers submitted all requirements for registration, and on <strong>April 25, 2018</strong>, the Cooperative Development Authority (CDA) officially approved REMICCO under Registration No. 9520-104000000004304.',
    'Ms. Lilia Buela extended technical assistance as part of CDA''s mobilization program, strengthening members'' and officers'' knowledge on cooperativism. CDA issued a Certificate of Compliance on April 30, 2018, and REMICCO was subsequently registered with the BIR on May 24, 2018.'
  ],
  'The ultimate goal of REMICCO is to help enrich the quality of life of Mindoreños through excellent and caring services embedded on Christian values.',
  'REMICCO Operating Policies Manual',
  'CDA Registered: April 25, 2018 • Registration No. 9520-104000000004304',
  NULL,
  'Our Vision',
  'REMICCO aspires to be a leading financial cooperative in Oriental Mindoro contributing to the progress and empowerment of our members and socially responsible to the community.',
  'Our Mission',
  'Inspired by Christian values, REMICCO commits to provide innovative financial and personal development that will undertake socio-economic activities relevant to the members'' felt need in an efficient, friendly and professional manner.'
);

-- ============================================
-- HIGHLIGHTS
-- ============================================
INSERT INTO highlights (text, order_index, is_active) VALUES
  ('79 founding members since February 2018', 1, true),
  ('CDA registered — April 25, 2018', 2, true),
  ('₱711,000 starting paid-up capital', 3, true),
  ('Guided by the 5Cs of Credit', 4, true),
  ('Most Outstanding Cooperative (MIMAROPA 2023)', 5, true),
  ('1st Runner-Up — CDA National Gawad Parangal', 6, true),
  ('Core Values: Excellence, Good Governance, Discipline, Competence', 7, true),
  ('Open to residents of Oriental & Occidental Mindoro', 8, true);

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
INSERT INTO services (icon, title, description, image_url, full_description, features, requirements, terms, interest_rate, loan_amount_range, payment_terms, contact_info, order_index, is_active) VALUES
  (
    'Wallet', 
    'Regular Loan', 
    'A non-income generating loan providing financial relief to members and their families.',
    'https://images.unsplash.com/photo-1554224311-beee4ece8c35?w=800&auto=format&fit=crop',
    'The Regular Loan program is designed to provide financial relief to REMICCO members and their families. Whether for home improvement, medical expenses, or family occasions, this loan offers competitive rates based on the 5Cs of Credit: Character, Capacity, Capital, Collateral, and Conditions.',
    '["Loanable amount: 200% of paid-up capital", "Aggregate up to 300% for members in good standing", "1% diminishing interest per month", "2% service charge (pre-deducted upon release)", "Automatic salary deduction available", "Aggregate loan shall not exceed ₱300,000"]',
    '["Member in good standing (current on capital shares and loan amortizations)", "Monthly amortization not more than 60% of net take-home pay", "No pending retirement or resignation within loan term", "Duly accomplished loan application form", "Salary Deduction Agreement (for members outside SFI)", "Copy of pay slip for last 2 consecutive months (for members outside SFI)"]',
    'Interest is computed at 1% diminishing per month. A 2% service charge is pre-deducted upon release. A penalty of 2% per month is imposed on arrearages. Loan renewal allowed after payment of at least 50% of the amortization schedule.',
    '1% diminishing per month',
    'Up to 200% of paid-up capital (max ₱300,000 aggregate)',
    '6, 12, 24, or 36 months',
    'Submit your loan application to any member of the Credit Committee at the REMICCO office.',
    1,
    true
  ),
  (
    'Building', 
    'Other Loan', 
    'A loan for family needs such as educational expenses and other essential purposes.',
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop',
    'The Other Loan type may be availed by members for various family needs, including educational expenses for children and other essential family purposes. This complements the Regular Loan to ensure members have access to funds for life''s important needs.',
    '["Loanable amount: 100% of paid-up capital", "1% diminishing interest per month", "2% service charge (pre-deducted upon release)", "Can be availed alongside Regular Loan (up to aggregate limit)", "Renewal after payment of at least 30% of Other Loan"]',
    '["Member in good standing", "Monthly amortization not more than 60% of net take-home pay", "Duly accomplished loan application form", "Salary Deduction Agreement (for members outside SFI)", "Copy of pay slip for last 2 consecutive months (for members outside SFI)"]',
    'Loanable amount is 100% of paid-up capital. Aggregate of all loans shall not exceed ₱300,000. Loan renewal allowed after payment of at least 30% of Other Loan amortization.',
    '1% diminishing per month',
    'Up to 100% of paid-up capital',
    '6, 12, 24, or 36 months',
    'Submit your loan application to any member of the Credit Committee at the REMICCO office.',
    2,
    true
  ),
  (
    'HeartHandshake', 
    'Emergency Loan', 
    'Quick financial assistance for urgent needs — hospitalization, medication, funeral, and maternity expenses.',
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop',
    'The Emergency Loan is intended for a member''s urgent financial needs such as immediate and continuous medication, hospitalization expenses, funeral expenses due to sudden death of a family member, and maternity expenses. This loan is designed for fast processing to address time-sensitive situations.',
    '["Loanable amount: 100% of paid-up capital", "1% diminishing interest per month", "2% service charge (pre-deducted upon release)", "Faster processing for urgent situations", "Aggregate loan shall not exceed ₱300,000"]',
    '["Member in good standing", "Duly accomplished loan application form", "Supporting documents: hospital bill, death certificate, medical records, or maternity records", "Monthly amortization not more than 60% of net take-home pay"]',
    'Emergency loans are processed with priority. A 2% penalty per month is imposed on arrearages. All share capital and deposits may be applied to payment if the loan becomes past due.',
    '1% diminishing per month',
    'Up to 100% of paid-up capital',
    '6, 12, 24, or 36 months',
    'For emergencies, visit the REMICCO office immediately with your supporting documents.',
    3,
    true
  ),
  (
    'PiggyBank', 
    'Capital Formation', 
    'Build your financial foundation through share capital investments and savings programs.',
    'https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&auto=format&fit=crop',
    'Capital formation is a core component of REMICCO''s cooperative structure, enhancing the creditworthiness of members while contributing to the cooperative''s sustainability. As stated in Article VIII, Section 2 of the By-Laws, each member invests to build shared prosperity.',
    '["Minimum subscription: 4 shares (₱4,000) upon membership", "At least ₱3,000 capital contribution per year", "2% of annual interest on capital and patronage refund reinvested", "2% of each good procured or service acquired from the cooperative", "Capital contributes to your loan eligibility", "Annual dividends on share capital"]',
    '["REMICCO membership", "Membership fee of ₱300", "Subscribe to at least 4 shares (₱4,000 total)", "Pay at least 1 share (₱1,000) upon approval", "Capital paid on the 15th applied to current month; on the 30th applied to following month"]',
    'Members who fail to complete the required minimum share capital must re-attend the Pre-Membership Education Seminar (PMES) and pay related fees. Capital builds your cooperative equity and increases loan eligibility.',
    'Annual dividends distributed at General Assembly',
    'Minimum ₱1,000 initial share (₱4,000 total subscription)',
    'Ongoing — annual minimum of ₱3,000',
    'Visit the REMICCO office to open your membership and begin your capital contributions.',
    4,
    true
  ),
  (
    'Users', 
    'Community Development', 
    'Extending cooperative principles beyond finance through community outreach programs and activities.',
    '/assets/gallery/outreach program to Mangyan community.jpg',
    'Aside from serving its members, REMICCO extends its programs to communities through projects and activities that benefit the areas where the cooperative operates. This reflects the 7th Cooperative Principle — Concern for Community — and REMICCO''s commitment to sustainable development through policies approved by its members.',
    '["Community outreach programs for indigenous peoples", "Mangyan community support and solar light distribution", "School supplies donation programs", "Tree planting and environmental stewardship", "Bahay Aruga Foundation outreach for the elderly", "Cash assistance to Lingap Center for PDL", "Classroom donation projects in rural areas"]',
    '["Active REMICCO membership to participate", "Programs approved by the General Assembly"]',
    'Community development programs are funded through cooperative activities and approved by the General Assembly in accordance with Cooperative Principle No. 7: Concern for Community.',
    'Not applicable',
    'Not applicable',
    'Ongoing programs throughout the year',
    'Contact the REMICCO office to learn about upcoming community activities and how you can participate.',
    5,
    true
  ),
  (
    'GraduationCap', 
    'Capacity Building', 
    'Training and seminars for officers, management, and members to strengthen cooperative knowledge.',
    '/assets/gallery/management and officers seminars.jpg',
    'Pursuant to Article 44 of RA 9520 and its Implementing Rules, REMICCO ensures that its officers and members receive relevant training and education. This builds institutional strength and develops skilled cooperative leaders who can contribute effectively to the cooperative''s growth.',
    '["Mandatory training for cooperative officers (per CDA requirements)", "Pre-Membership Education Seminar (PMES) for all new members", "Management and officers seminars", "Financial literacy workshops", "Cooperative governance training", "Regular capacity-building programs aligned with CDA MC No. 2015-009"]',
    '["Active REMICCO membership", "Officers must attend CDA-required training programs", "New members must complete PMES before membership approval"]',
    'Officers are required to attend relevant trainings as mandated by CDA. New members must personally attend the Pre-Membership Education Seminar (attendance by proxy is not allowed).',
    'Not applicable',
    'Not applicable',
    'As scheduled per CDA requirements and cooperative calendar',
    'Check with the REMICCO office for the schedule of upcoming training programs and seminars.',
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
    'https://www.facebook.com/profile.php?id=100056874107356'
  );

-- ============================================
-- SITE SETTINGS (About Page Extended Content)
-- ============================================

-- Goal and REMICCO Acronym
INSERT INTO site_settings (key, value) VALUES
  ('about_goal', '{"text": "The ultimate goal of REMICCO is to help enrich the quality of life of Mindoreños through an excellent and caring services embedded on Christian values.", "acronym": [{"letter": "R", "meaning": "Respond to the need of members"}, {"letter": "E", "meaning": "Enhance competence, professionalism and spirituality among officers, management and staff"}, {"letter": "M", "meaning": "Manage economic viability of cooperative"}, {"letter": "I", "meaning": "Installation, operation and maintenance of other social services identified and approved by the general assembly"}, {"letter": "C", "meaning": "Conform to the globally accepted performance standard"}, {"letter": "C", "meaning": "Conduct any related activity geared towards the member''s self-governance and sufficiency to improve their socio-economic well-being"}, {"letter": "O", "meaning": "Observe good governance"}]}'::jsonb);

-- Core Values
INSERT INTO site_settings (key, value) VALUES
  ('about_core_values', '["Excellent and caring service", "Good governance", "Discipline", "Competence"]'::jsonb);

-- Cooperative Principles
INSERT INTO site_settings (key, value) VALUES
  ('about_cooperative_principles', '[{"number": 1, "title": "Voluntary and Open Membership", "description": "Cooperatives are voluntary organizations, open to all persons able to use their services and willing to accept the responsibilities of membership, without gender, social, racial, cultural, political or religious discrimination."}, {"number": 2, "title": "Democratic Member Control", "description": "Cooperatives are democratic organizations that are controlled by their members who actively participate in setting their policies and making decisions. Men and women serving as elected representatives, directors or officers are accountable to the membership. In primary cooperatives, members have equal voting rights of one-member, one-vote."}, {"number": 3, "title": "Member Economic Participation", "description": "Members contribute equitably to, and democratically control, the capital of their cooperatives. At least part of the capital is the common property of the cooperative. Members allocated surpluses for developing the cooperative by setting up reserves, benefitting members in proportion to their patronage, and supporting other activities approved by the membership."}, {"number": 4, "title": "Autonomy and Independence", "description": "Cooperatives are autonomous, self-help organizations controlled by their members. If they enter into agreements with other organizations, including government, or raise capital from external sources, they shall do so on terms that ensure democratic control of their members and maintain their cooperative autonomy."}, {"number": 5, "title": "Education, Training and Information", "description": "Cooperatives shall provide education and training for their members, elected and appointed representatives, managers and employees, so that they can contribute effectively and efficiently to the development of their cooperatives."}, {"number": 6, "title": "Cooperation Among Cooperatives", "description": "Cooperatives serve their members most effectively and strengthen the cooperative movement by working together through local, national, regional and international structures."}, {"number": 7, "title": "Concern for Community", "description": "Cooperatives work for the sustainable development of their communities through policies approved by their members."}]'::jsonb);

-- Organizational Structure
INSERT INTO site_settings (key, value) VALUES
  ('about_org_structure', '{"description": "The highest governing and policy-making body of the cooperative is the General Assembly. Currently, REMICCO has five (5) Board of Directors and 18 committee officers.", "bodies": ["General Assembly", "Board of Directors", "Audit Committee", "Election Committee", "Mediation and Conciliation Committee", "Credit Committee", "GAD Committees", "Education & Training Committee", "Ethics Committee", "Other Committees", "Management Staff", "Secretary", "Treasurer"]}'::jsonb);

-- Founding Leadership
INSERT INTO site_settings (key, value) VALUES
  ('about_leadership', '{"board_of_directors": ["Fr. Jimson H. Ruga", "Beverlie C. Panganiban", "Marjorie R. Mendoza, CPA", "Dr. Iluminada M. Martin", "Nestor C. Salvacion"], "officers": [{"name": "Fr. Jimson H. Ruga", "position": "Chairman of the Board"}, {"name": "Dionisia C. Adalia", "position": "Treasurer"}, {"name": "Lourdes L. Alarde", "position": "Secretary"}, {"name": "Frederick R. Villanueva", "position": "Manager"}]}'::jsonb);

-- Membership Criteria
INSERT INTO site_settings (key, value) VALUES
  ('about_membership', '{"eligibility": "Membership is open to all residents of the Province of Oriental and Occidental Mindoro who are private and government employees and have personally completed the required Pre-Membership Education Seminar (PMES).", "requirements": ["Application for membership shall be made in writing with recent 1x1 ID picture, one (1) government issued ID and/or one (1) company ID.", "Applicants shall undergo a Pre-Membership Education Seminar (PMES). Attendance by proxy is not allowed.", "A membership fee of ₱300 shall be collected upon submission of membership application.", "Applicants shall subscribe to at least four (4) shares with a total value of ₱4,000.00 and pay at least one (1) share or ₱1,000.00.", "Capital contribution paid on the 15th of the month is applied as paid-up capital for the current month. Payment on the 30th is applied the following month.", "Pledge to undertake the responsibilities of members and uphold the by-laws, policies, guidelines, rules and regulations.", "Use or anticipate using the services of the cooperative."], "termination": {"special_circumstances": "Death, insanity, permanent incapacity, or judicial declaration of insolvency. In case of death or insanity, the next-of-kin may assume duties and responsibilities.", "voluntary": "A member may withdraw by giving sixty (60) days notice to the Board of Directors.", "involuntary": "A member may be terminated by majority vote of the Board for failure to patronize services, comply with obligations, violating by-laws, or acts prejudicial to the cooperative."}}'::jsonb);

-- Spirituality
INSERT INTO site_settings (key, value) VALUES
  ('about_spirituality', '{"patron_saint": "The Patron Saint of REMICCO is Saint Mark the Evangelist. The symbol of St. Mark is a Winged Lion.", "symbol": "Winged Lion", "symbol_meaning": "The Lion with wings symbolizes courage, strength, and freedom. It is a representation of the power of the soul and its ability to break away from earthly confines to soar through the heavens.", "aspects": [{"name": "Courage", "description": "A lion with wings symbolizes the strength of character and courage to overcome fear and stand up for one'\''s convictions."}, {"name": "Strength", "description": "It personifies the inner strength necessary to push through insurmountable obstacles and remain unbowed in the face of adversity."}, {"name": "Freedom", "description": "A lion with wings symbolizes the freedom of the spirit, allowing it to move freely and explore uncharted paths."}, {"name": "Power", "description": "It expresses the powerful energy of the soul, which is capable of achieving great things."}]}'::jsonb);
