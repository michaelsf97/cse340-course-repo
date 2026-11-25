-- Roles table defines available roles.

CREATE TABLE roles (
role_id SERIAL PRIMARY KEY,
role_name VARCHAR(50) UNIQUE NOT NULL,
role_description TEXT
);

-- INSERT some roles to the role TABLE.

INSERT INTO roles (role_name, role_description) VALUES 
('user', 'Standard user with basic access'),
('admin', 'Administrator with full system access');


SELECT * FROM roles;

-- Users Table defines available users with respective role

CREATE TABLE users (
users_id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
password_hash VARCHAR(255) NOT NULL,
role_id INT REFERENCES roles(role_id),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a test user records with valid role_id(either 1 for user or 2 for admin). You can use a placeholder password hash 
('placeholder_hash').

INSERT INTO users(user_id, users_name, email, password_hash, role_id)
VALUES (1, 'Test User', 'testuser@example.com', 'placeholder_hash', 1),
(2, 'Test Admin', 'testadmin@example.com', 'placeholder_hash', 2);

SELECT 
users_id,
users_name,
email,
role_name,
role_description

FROM users u
JOIN roles r ON u.role_id = r.role_id;

-- DELETE the test user
DELETE FROM users WHERE email = 'testuser@example.com', 'testadmin@example.com';