-- =====================================================
-- Drop existing tables to ensure clean execution
-- =====================================================
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS organization CASCADE;

-- =====================================================
-- Organization Table
-- =====================================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- =====================================================
-- Projects Table
-- =====================================================
CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL REFERENCES organization(organization_id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    link VARCHAR(320) NOT NULL,
    image_filename VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    date DATE NOT NULL
);

-- =====================================================
-- Insert Sample Data: Organizations
-- =====================================================
INSERT INTO organization (name, description, contact_email, logo_filename) VALUES 
('UNICEF', 'Humanitarian and developmental assistance to children and mothers worldwide.', 'contact@unicef.org', 'unicef_logo.png'),
('Ayuda Humanitaria', 'Community development and emergency humanitarian aid initiatives.', 'support@ayuda.org', 'aid_logo.png'),
('United Nations', 'International organization promoting global peace, security, and cooperation.', 'info@un.org', 'un_logo.png');

-- =====================================================
-- Insert Sample Data: Projects (15 total, exactly 5 per organization)
-- =====================================================
INSERT INTO projects (organization_id, name, link, image_filename, description, location, date) VALUES 
-- Organization 1 (UNICEF)
(1, 'Supporting Children in Gaza', 'https://www.unicef.org/press-releases/childhood-defined-struggle', 'default_project_image.png', 'Humanitarian support and aid for children in Gaza.', 'Gaza', '2026-01-05'),
(1, 'Childrens Rights', 'https://www.unicef.org/child-rights-convention', 'conventions97.png', 'Information and advocacy on child rights globally.', 'New York', '2026-01-15'),
(1, 'Education in Emergencies', 'https://www.unicef.org/education', 'education97.png', 'Providing temporary learning spaces for children in crises.', 'Beirut', '2026-02-10'),
(1, 'Malnutrition Treatment', 'https://www.unicef.org/nutrition', 'nutrition97.png', 'Screening and treating severe acute malnutrition in vulnerable communities.', 'Yemen', '2026-03-15'),
(1, 'Vaccination Campaign', 'https://www.unicef.org/immunization', 'vaccine97.png', 'Distributing vital polio and measles vaccines to remote areas.', 'Kinshasa', '2026-04-20'),

-- Organization 2 (Humanitarian Aid Organization)
(2, 'Clean Water Initiative', 'https://www.thechurchnews.com/living-faith/2026/10/22/water-is-life-church-lds-donation-clean-water-french-polynesia-tanzania-jamaica/', 'waterwell97.png', 'Installing community water filtration systems for rural families.', 'La Guajira', '2026-01-25'),
(2, 'Shelter Support', 'https://masfe.org/shelter', 'shelter97.png', 'Rebuilding homes damaged by severe seasonal flooding and landslides.', 'Choco', '2026-02-18'),
(2, 'Back-to-School Supply Drive', 'https://www.thechurchnews.com/living-faith/2026/09/23/school-donations-tonga-brazil-paraguay-rwanda-guatemala-philippines/', 'schoolsupplies97.png', 'Donating backpacks, notebooks, and uniforms to low-income students.', 'Bogota', '2026-03-05'),
(2, 'Supporting Colombian Victims', 'https://masfe.org/noticias/iglesia-jesucristo-donaciones-damnifica', 'default_project_image.png', 'Support for local victims and families affected by disasters.', 'Bogota', '2026-01-10'),
(2, 'Combating Famine', 'https://masfe.org/noticias/iglesia-jesucristo-ayudando-acabar-hambre', 'famine.png', 'Food distribution and sustainable agriculture initiatives.', 'Cali', '2026-01-20'),

-- Organization 3 (United Nations)
(3, 'Renewable Energy Transition', 'https://news.un.org/energy', 'solar97.png', 'Installing solar panels in off-grid rural community centers.', 'Nairobi', '2026-02-12'),
(3, 'Ocean Cleanup Drive', 'https://www.un.org/ocean', 'ocean97.png', 'Mobilizing volunteers to remove plastic waste from coastal areas.', 'Manila', '2026-03-28'),
(3, 'Biodiversity Protection', 'https://www.un.org/biodiversity', 'forest97.png', 'Restoring endangered native forest ecosystems and natural habitats.', 'Amazonia', '2026-04-15'),
(3, 'Climate Action', 'https://news.un.org/en/story/2026/10/1168677', 'carbondioxide97.png', 'Industrial actions, carbon tracking, and environmental policies.', 'Geneva', '2026-01-05'),
(3, 'Water Action', 'https://www.un.org/en/focus/water-action', 'wateraction97.png', 'Mountain lake protection, glacier preservation, and water conservation.', 'Nairobi', '2026-01-22');