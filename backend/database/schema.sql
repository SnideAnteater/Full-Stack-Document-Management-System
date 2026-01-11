-- Document Management System Database Schema

-- Create database (run this manually if needed)
CREATE DATABASE IF NOT EXISTS dms_app;
USE dms_app;

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS documents;
DROP TABLE IF EXISTS folders;

-- Folders table
CREATE TABLE folders (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Documents table
CREATE TABLE documents (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type ENUM('PDF', 'DOCX', 'TXT', 'XLSX', 'PPTX', 'IMAGE', 'OTHER') NOT NULL DEFAULT 'OTHER',
    size BIGINT UNSIGNED DEFAULT NULL COMMENT 'File size in bytes',
    folder_id VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_type (type),
    INDEX idx_folder_id (folder_id),
    INDEX idx_created_at (created_at),
    FOREIGN KEY (folder_id) REFERENCES folders(id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample data for testing
INSERT INTO folders (id, name, created_at, updated_at) VALUES
('f1', 'Projects', '2026-01-01 08:00:00', '2026-01-01 08:00:00'),
('f2', 'Reports', '2026-01-02 10:00:00', '2026-01-02 10:00:00');

INSERT INTO documents (id, name, type, size, folder_id, created_at, updated_at) VALUES
('1', 'Project Proposal.pdf', 'PDF', 2048000, NULL, '2026-01-05 10:30:00', '2026-01-05 10:30:00'),
('2', 'Financial Report.xlsx', 'XLSX', 512000, NULL, '2026-01-06 14:20:00', '2026-01-06 14:20:00'),
('3', 'Meeting Notes.txt', 'TXT', 8192, 'f2', '2026-01-07 09:15:00', '2026-01-07 09:15:00');
