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
    name VARCHAR(150) NOT NULL
);

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE projects_categories (
    project_id INT REFERENCES projects(project_id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

INSERT INTO categories (name) VALUES
('Community Outreach'),
('Environmental Cleanup'),
('Education & Tutoring')

INSERT INTO projects (name, description) VALUES
('Park Cleanup', 'Join us to clean up local parks and make them beautiful!'),
('Food Drive', 'Help collect and distribute food to those in need.'),
('Community Tutoring', 'Volunteer to tutor students in various subjects.')

INSERT INTO projects_categories (project_id, category_id) VALUES
(1, 1), -- Park Cleanup belongs to Community Outreach
(1, 2), -- Park Cleanup also belongs to Environmental Cleanup
(2, 1), -- Food Drive belongs to Community Outreach
(3, 1), -- Community Tutoring belongs to Community Outreach
(3, 3); -- Community Tutoring also belongs to Education & Tutoring