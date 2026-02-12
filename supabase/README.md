# REMICCO Supabase Setup Guide

This guide will help you set up Supabase as the database for the REMICCO website.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Enter project details:
   - **Name**: REMICCO (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest region to your users
4. Wait for the project to be created (takes about 2 minutes)

## Step 2: Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key (a long string starting with `eyJ...`)

## Step 3: Configure Environment Variables

1. Create a `.env` file in the project root (copy from `.env.example`):

```bash
cp .env.example .env
```

2. Edit the `.env` file and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 4: Run the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the contents of `supabase/001_schema.sql` and paste it
4. Click "Run" to execute the schema creation
5. You should see "Success" message

## Step 5: Seed the Database with Initial Data

1. Still in SQL Editor, create a new query
2. Copy the contents of `supabase/002_seed_data.sql` and paste it
3. Click "Run" to insert the seed data
4. Verify by going to **Table Editor** and checking each table

## Step 6: Set Up Storage for Images (Optional but Recommended)

For production, you should upload images to Supabase Storage:

1. Go to **Storage** in your Supabase dashboard
2. Create a new bucket called `images`
3. Set the bucket to **Public**
4. Upload your images and update the URLs in the database

### Uploading Images via Dashboard:

1. Click on the `images` bucket
2. Create folders: `hero`, `gallery`, `news`
3. Upload images to respective folders
4. Update image URLs in the database tables

## Step 7: Set Up Authentication (For Admin Panel)

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider (or your preferred auth method)
3. Go to **Authentication** → **Users**
4. Click "Add User" to create an admin account
5. Enter admin email and password

## Database Tables Overview

| Table            | Description                                   |
| ---------------- | --------------------------------------------- |
| `hero_slides`    | Hero section slider images                    |
| `hero_content`   | Hero section text content                     |
| `stats`          | Statistics displayed in hero section          |
| `about_content`  | About section content (mission, vision, etc.) |
| `highlights`     | Checklist items in about section              |
| `awards`         | Awards and recognitions                       |
| `services`       | Programs and services offered                 |
| `news_articles`  | News and announcements                        |
| `events`         | Upcoming events for ticker                    |
| `gallery_images` | Photo gallery images                          |
| `contact_info`   | Contact information for footer                |
| `site_settings`  | General site configuration                    |

## Row Level Security (RLS)

The schema includes RLS policies:

- **Public users**: Can READ all content
- **Authenticated users**: Can READ, INSERT, UPDATE, DELETE all content

This means:

- Website visitors can view all content
- Only logged-in admin users can modify content

## Troubleshooting

### "Missing Supabase environment variables" Error

- Make sure `.env` file exists and has correct values
- Restart the dev server after creating/modifying `.env`

### Tables not showing data

- Check that you ran both SQL files in order
- Verify data exists in Table Editor

### Images not loading

- For local development, images are loaded from `/src/assets`
- For production, update image URLs to Supabase Storage URLs

## Next Steps

After completing this setup:

1. Run `npm run dev` to start the development server
2. The website should now load content from Supabase
3. You can modify content directly in Supabase Table Editor
4. Build the admin panel for easier content management
