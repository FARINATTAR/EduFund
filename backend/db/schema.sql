-- Create EduFund Database
CREATE DATABASE IF NOT EXISTS edufund;
USE edufund;

-- Sponsors Table
CREATE TABLE sponsors (
    sponsor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    total_donated DECIMAL(10,2) DEFAULT 0.00,
    password VARCHAR(255),
    phone VARCHAR(15),
    gender VARCHAR(10),
    dateOfBirth DATE,
    street VARCHAR(100),
    area VARCHAR(100),
    pincode VARCHAR(10),
    role VARCHAR(20),
    isVerified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Children Table
CREATE TABLE children (
    child_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    background TEXT,
    education_status TEXT
);

-- Donations Table
CREATE TABLE donations (
    donation_id INT AUTO_INCREMENT PRIMARY KEY,
    sponsor_id INT,
    child_id INT,
    amount DECIMAL(10,2) NOT NULL,
    donation_date DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (sponsor_id) REFERENCES sponsors(sponsor_id) ON DELETE SET NULL,
    FOREIGN KEY (child_id) REFERENCES children(child_id) ON DELETE SET NULL
);

-- Expenses Table
CREATE TABLE expenses (
    expense_id INT AUTO_INCREMENT PRIMARY KEY,
    child_id INT,
    category VARCHAR(50),
    amount_spent DECIMAL(10,2),
    description TEXT,
    expense_date DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (child_id) REFERENCES children(child_id) ON DELETE CASCADE
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    phone VARCHAR(15),
    gender VARCHAR(10),
    dateOfBirth DATE,
    street VARCHAR(100),
    area VARCHAR(100),
    pincode VARCHAR(10),
    role VARCHAR(20),
    isVerified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- OTP table
CREATE TABLE otps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100),
    otp VARCHAR(10),
    expires_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
