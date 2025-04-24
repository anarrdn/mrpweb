-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    pharmacy_id VARCHAR(255),
    pharmacy_address TEXT,
    role VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    is_premium BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert admin user with bcrypt hashed password (admin123)
INSERT INTO users (
    email,
    password,
    name,
    pharmacy_id,
    pharmacy_address,
    role,
    status,
    is_premium,
    created_at,
    updated_at
) VALUES (
    'admin@example.com',
    '$2a$10$YourHashedPasswordHere',
    'Admin User',
    'ADMIN001',
    'Admin Pharmacy Address',
    'admin',
    'approved',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
) ON CONFLICT (email) DO NOTHING; 