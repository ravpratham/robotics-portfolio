// This file contains the structure for assignments
// In future, this will be replaced with API calls to Supabase

export const assignmentsData = [
  {
    id: 1,
    title: 'Assignment 1',
    description: 'Content will be updated soon',
    content: null,
    images: [],
    links: [],
    files: [],
    status: 'empty',
    createdAt: null,
    updatedAt: null
  },
  {
    id: 2,
    title: 'Assignment 2',
    description: 'Content will be updated soon',
    content: null,
    images: [],
    links: [],
    files: [],
    status: 'empty',
    createdAt: null,
    updatedAt: null
  }
];

// Future Supabase table structure reference:
/*
CREATE TABLE assignments (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT,
  images TEXT[], -- Array of image URLs
  links TEXT[], -- Array of reference links
  files TEXT[], -- Array of file URLs
  status VARCHAR(50) DEFAULT 'empty',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
*/
