-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- =================================================
-- Insert sample data: Organizations
-- =================================================

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local chartities and service initiates', 'hello@unityserve.org', 'unityserve-logo.png');

SELECT * FROM organization


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
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    image_filename VARCHAR(255) NOT NULL DEFAULT 'default_project_image.png',
    link VARCHAR(320) NOT NULL DEFAULT 'https://www.example.com'
);

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


INSERT INTO public.projects (name, link, image, description) VALUES 
('Supporting Children in Gaza', 'https://www.unicef.org/press-releases/childhood-defined-struggle-survival-gaza-strip', 'projectsunicef97.png', 'UNICEF report about children in Gaza'),
('Childrens Rights', 'https://www.unicef.org/child-rights-convention', 'conventions97.png', 'Information about the Convention on the Rights of the Child'),
('Supporting Colombian Victims', 'https://masfe.org/noticias/iglesia-jesucristo-donaciones-damnificados-colombia', 'colombiavictims97.png', 'Volunteers providing aid in Colombia'),
('Combating Famine', 'https://masfe.org/noticias/iglesia-jesucristo-ayudando-acabar-hambre', 'famine97.png', 'People receiving humanitarian aid'),
('Climate Action', 'https://news.un.org/en/story/2026/10/1168677', 'carbondioxide97.png', 'Industrial emissions and a report about carbon dioxide levels'),
('Water Action', 'https://www.un.org/en/focus/water-action', 'wateraction97.png', 'Mountain lake representing global water action');

INSERT INTO projects_categories (project_id, category_id) VALUES
(1, 1), -- Park Cleanup belongs to Community Outreach
(1, 2), -- Park Cleanup also belongs to Environmental Cleanup
(2, 1), -- Food Drive belongs to Community Outreach
(3, 1), -- Community Tutoring belongs to Community Outreach
(3, 3); -- Community Tutoring also belongs to Education & Tutoring