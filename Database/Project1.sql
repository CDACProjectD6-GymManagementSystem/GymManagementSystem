-- Create Database
CREATE DATABASE GYM;
USE GYM;

-- Users Table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    mobile_number VARCHAR(15) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    subscription_id INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted CHAR(1) DEFAULT 'N',
    X1 FLOAT DEFAULT NULL,
    X2 VARCHAR(255) DEFAULT NULL,
    INDEX (email),
    INDEX (mobile_number),
    INDEX (subscription_id)
);

-- Admin Table
CREATE TABLE admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    mobile_number VARCHAR(15) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted CHAR(1) DEFAULT 'N',
    X1 FLOAT DEFAULT NULL,
    X2 VARCHAR(255) DEFAULT NULL,
    INDEX (mobile_number)
);

-- Receptionist Table
CREATE TABLE receptionist (
    receptionist_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    mobile_number VARCHAR(15) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted CHAR(1) DEFAULT 'N',
    X1 FLOAT DEFAULT NULL,
    X2 VARCHAR(255) DEFAULT NULL,
    INDEX (email),
    INDEX (mobile_number)
);

-- Packages Table
CREATE TABLE packages (
    package_id INT AUTO_INCREMENT PRIMARY KEY,
    package_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    duration_in_days INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted CHAR(1) DEFAULT 'N',
    extra_float_field FLOAT DEFAULT NULL,
    extra_varchar_field VARCHAR(255) DEFAULT NULL,
    INDEX (package_name)
);

-- Trainers Table
CREATE TABLE trainers (
    trainer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    expertise VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    mobile_number VARCHAR(15) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted CHAR(1) DEFAULT 'N',
    X1 FLOAT DEFAULT NULL,
    X2 VARCHAR(255) DEFAULT NULL,
    INDEX (email),
    INDEX (mobile_number)
);

-- Gym Members Table
CREATE TABLE gym_members (
    membership_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    payment_status ENUM('paid', 'pending') DEFAULT 'pending',
    payment_method VARCHAR(50),
    transaction_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted CHAR(1) DEFAULT 'N',
    X1 FLOAT DEFAULT NULL,
    X2 VARCHAR(255) DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX (user_id),
    INDEX (status)
);

-- Mapping Table: gym_member_trainers (NEW TABLE)
CREATE TABLE gym_member_trainers (
    gym_member_trainer_id INT AUTO_INCREMENT PRIMARY KEY,
    membership_id INT NOT NULL,
    trainer_id INT NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (membership_id) REFERENCES gym_members(membership_id) ON DELETE CASCADE,
    FOREIGN KEY (trainer_id) REFERENCES trainers(trainer_id) ON DELETE CASCADE,
    UNIQUE (membership_id, trainer_id) -- prevent duplicate assignment
);

-- Gym Member Packages Table
CREATE TABLE gym_member_packages (
    gym_member_package_id INT AUTO_INCREMENT PRIMARY KEY,
    membership_id INT NOT NULL,
    package_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (membership_id) REFERENCES gym_members(membership_id) ON DELETE CASCADE,
    FOREIGN KEY (package_id) REFERENCES packages(package_id) ON DELETE CASCADE
);

-- Payments Table
CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    membership_id INT NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(10,2) NOT NULL,
    payment_status ENUM('paid', 'pending') DEFAULT 'pending',
    payment_method VARCHAR(50),
    transaction_id VARCHAR(100),
    X1 FLOAT DEFAULT NULL,
    X2 VARCHAR(255) DEFAULT NULL,
    FOREIGN KEY (membership_id) REFERENCES gym_members(membership_id) ON DELETE CASCADE
);

-- Gym Equipments Table
CREATE TABLE gym_equipments (
    equipment_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    quantity INT NOT NULL,
    last_maintenance_date DATE NOT NULL,
    next_maintenance_date DATE NOT NULL,
    is_deleted CHAR(1) DEFAULT 'N',
    X1 FLOAT DEFAULT NULL,
    X2 VARCHAR(255) DEFAULT NULL,
    INDEX (name),
    INDEX (last_maintenance_date),
    INDEX (next_maintenance_date)
);
