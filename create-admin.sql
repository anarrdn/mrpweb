-- Insert admin user
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
    -- Password: admin123 (hashed)
    '$2a$10$X7z3bZ2JQZ2JQZ2JQZ2JQOZ2JQZ2JQZ2JQZ2JQZ2JQZ2JQZ2JQZ2',
    'Admin User',
    'ADMIN001',
    'Admin Pharmacy Address',
    'admin',
    'approved',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
); 