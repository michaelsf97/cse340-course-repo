DROP TABLE IF EXISTS projects_categories CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS organization CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

ALTER TABLE organization ADD COLUMN contact_email VARCHAR(320) NOT NULL;

-- =================================================
-- Insert sample data: Organizations
-- =================================================

INSERT INTO organization (organization_id,name, description, contact_email, logo_filename)
VALUES
(1,'BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
(2,'GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods', 'contact@greenharvest.org', 'greenharvest-logo.png'),
(3,'UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiates', 'hello@unityserve.org', 'unityserve-logo.png');




-- =======================================================
-- Category Table
-- =======================================================

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    image_filename VARCHAR(255) NOT NULL
);

ALTER TABLE categories
ADD COLUMN IF NOT EXISTS description TEXT;

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
	organization_id INT NOT NULL REFERENCES organization(organization_id),
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    image_filename VARCHAR(255) NOT NULL DEFAULT 'default_project_image.png',
    link VARCHAR(320) NOT NULL DEFAULT 'https://www.example.com'
);

ALTER TABLE projects ADD COLUMN location VARCHAR(150) DEFAULT 'Unknown';
ALTER TABLE projects ADD COLUMN date DATE DEFAULT CURRENT_DATE;



CREATE TABLE projects_categories (
    project_id INT REFERENCES projects(project_id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

INSERT INTO categories (name, description, image_filename) VALUES
('Community Outreach', 'Programs that connect volunteers with local community needs.', 'volunteer.png'),
('Environmental Cleanup', 'Projects that help protect and restore the natural environment.', 'enviromental97.png'),
('Education & Tutoring', 'Educational support and tutoring for learners in the community.', 'conventions97.png'),
('Humanitarian Aid', 'Assistance for people affected by hardship and emergencies.', 'humanitarianaid97.png'),
('Human Rights & Advocacy', 'Initiatives that promote human rights and community advocacy.', 'advocacy97.png'),
('Disaster Relief & Support', 'Support for communities responding to disasters.', 'disasterrelief97.png'),
('Famine Support', 'Efforts to provide food assistance to people facing hunger.', 'famine97.png'),
('Environmental Actions', 'Actions that encourage sustainability and environmental care.', 'enviromental97.png'),
('Clean Water & Sanitation', 'Projects that improve access to clean water and sanitation.', 'sanitation97.png');


INSERT INTO projects (organization_id,name, link, image_filename, description, location, date) VALUES 
(1,'Supporting Children in Gaza', 'https://www.unicef.org/press-releases/childhood-defined-struggle-survival-gaza-strip', 'projectsunicef97.png', 'UNICEF report about children in Gaza', 'Gaza Strip', '2023-10-01'),
(1,'Childrens Rights', 'https://www.unicef.org/child-rights-convention', 'conventions97.png', 'Information about the Convention on the Rights of the Child', 'Global', '2023-10-01'),
(1, 'Education in Emergencies', 'https://www.unicef.org/education', 'education97.png', 'Providing temporary learning spaces and supplies for children affected by crises.', 'Beirut', '2026-02-10'),
(1, 'Malnutrition Treatment', 'https://www.unicef.org/nutrition', 'nutrition97.png', 'Screening and treating severe acute malnutrition in vulnerable communities.', 'Yemen', '2026-03-15'),
(1, 'Vaccination Campaign', 'https://www.unicef.org/immunization', 'vaccine97.png', 'Distributing vital polio and measles vaccines to remote areas.', 'Kinshasa', '2026-04-20'),
(2, 'Clean Water Initiative', 'https://masfe.org/water', 'waterwell97.png', 'Installing community water filtration systems for rural families.', 'La Guajira', '2026-01-25'),
(2, 'Shelter Support', 'https://masfe.org/shelter', 'shelter97.png', 'Rebuilding homes damaged by severe seasonal flooding and landslides.', 'Chocó', '2026-02-18'),
(2, 'Back-to-School Supply Drive', 'https://masfe.org/school', 'schoolsupplies97.png', 'Donating backpacks, notebooks, and uniforms to low-income students.', 'Bogotá', '2026-03-05'),
(2,'Supporting Colombian Victims', 'https://masfe.org/noticias/iglesia-jesucristo-donaciones-damnificados-colombia', 'colombiavictims97.png', 'Volunteers providing aid in Colombia', 'Colombia', '2023-10-01'),
(2,'Combating Famine', 'https://masfe.org/noticias/iglesia-jesucristo-ayudando-acabar-hambre', 'famine97.png', 'People receiving humanitarian aid', 'Various Locations', '2023-10-01'),
(3, 'Renewable Energy Transition', 'https://news.un.org/energy', 'solar97.png', 'Installing solar panels in off-grid rural community centers.', 'Nairobi', '2026-02-12'),
(3, 'Ocean Cleanup Drive', 'https://www.un.org/ocean', 'ocean97.png', 'Mobilizing volunteers to remove plastic waste from coastal areas.', 'Manila', '2026-03-28'),
(3, 'Biodiversity Protection', 'https://www.un.org/biodiversity', 'forest97.png', 'Restoring endangered native forest ecosystems and habitats.', 'Amazonia', '2026-04-15'),
(3,'Climate Action', 'https://news.un.org/en/story/2026/10/1168677', 'carbondioxide97.png', 'Industrial emissions and a report about carbon dioxide levels', 'Global', '2023-10-01'),
(3,'Water Action', 'https://www.un.org/en/focus/water-action', 'wateraction97.png', 'Mountain lake representing global water action', 'Global', '2023-10-01');

INSERT INTO projects_categories (project_id, category_id) VALUES
(1, 1), -- Park Cleanup belongs to Community Outreach
(1, 2), -- Park Cleanup also belongs to Environmental Cleanup
(2, 1), -- Food Drive belongs to Community Outreach
(3, 1), -- Community Tutoring belongs to Community Outreach
(3, 3); -- Community Tutoring also belongs to Education & Tutoring