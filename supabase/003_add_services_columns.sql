-- Migration to add new columns to services table
-- Run this SQL in your Supabase SQL Editor BEFORE running 002_seed_data.sql

-- Add new columns to services table
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS full_description TEXT,
ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS requirements JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS terms TEXT,
ADD COLUMN IF NOT EXISTS interest_rate VARCHAR(100),
ADD COLUMN IF NOT EXISTS loan_amount_range VARCHAR(100),
ADD COLUMN IF NOT EXISTS payment_terms VARCHAR(200),
ADD COLUMN IF NOT EXISTS contact_info TEXT;
