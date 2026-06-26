# Project Overview and Recording Notes

## Project Name

Online Recruitment and Job Application Management System

## Module Name

Frontend Job Portal UI (`frontend-job-portal`)

## Module Summary

This module is a modern frontend-only job portal interface built with React, Vite, React Router, Bootstrap 5, and JavaScript. It allows users to browse mock job listings, search jobs in real time, apply multiple filters, view paginated results, and open a detailed job page.

The module is designed as one part of a larger group project. It focuses only on the candidate-facing job browsing UI.

## Scope of This Module

Included:

- Job listing page
- Job details page
- Real-time search
- Location, category, employment type, and salary filters
- Pagination
- Loading state
- Empty-results state
- Mock job data
- Responsive layout for mobile, tablet, and desktop

Not included:

- Authentication
- Backend APIs
- Database operations
- Admin dashboard
- Application form submission
- Resume upload

## Technology Used

- React.js for component-based UI
- Vite for fast development and build tooling
- React Router DOM for page routing
- Bootstrap 5 for responsive layout and styling
- JavaScript for state, search, filters, and pagination

## Main Pages

### Job Listing Page

File: `src/pages/JobListingPage.jsx`

This page displays all available jobs as responsive cards. It includes:

- Search bar
- Filter panel
- Job cards
- Pagination
- Loading and empty states

### Job Details Page

File: `src/pages/JobDetailsPage.jsx`

This page displays complete information for a selected job. It includes:

- Breadcrumb navigation
- Job title, company, location, salary, category, and employment type
- Job description
- Required skills
- Experience required
- Posted date
- Back to Jobs button
- Apply Now button as UI only

## Main Components

- `Navbar.jsx` - top navigation
- `SearchBar.jsx` - search input for real-time filtering
- `FilterPanel.jsx` - filter controls
- `JobCard.jsx` - reusable job card UI
- `Pagination.jsx` - pagination controls

## Mock Data

File: `src/data/jobsData.js`

The module uses mock data with 18 jobs. Each job contains title, company, location, category, salary, employment type, posted date, description, required skills, and experience.

## Recording Script

1. Introduce the module:

   "This is the frontend job portal UI module for our Online Recruitment and Job Application Management System."

2. Explain the purpose:

   "The purpose of this module is to let users browse job openings, search for jobs, apply filters, and view detailed job information."

3. Mention the technology:

   "I built this using React.js, Vite, React Router DOM, Bootstrap 5, and JavaScript."

4. Show the listing page:

   "On the listing page, jobs are displayed in card format. Each card includes job title, company name, location, category, salary, employment type, posted date, and a View Details button."

5. Show search and filters:

   "The search bar filters jobs in real time by title, company, keywords, skills, and location. The filter panel supports location, category, employment type, and salary range."

6. Show pagination:

   "The listing page also includes pagination so the UI remains clean even when there are many jobs."

7. Show the details page:

   "When the user clicks View Details, the app opens a detailed page with job description, required skills, experience, salary, posted date, breadcrumb navigation, Back to Jobs, and an Apply Now UI button."

8. Explain scope:

   "This module is frontend-only. It does not include login, backend APIs, database operations, admin dashboard, application forms, or resume uploads."

9. Finish:

   "This module can be integrated with backend APIs later by replacing the mock job data with API responses."

## How to Run for Demo

```bash
cd frontend-job-portal
npm install
npm run dev
```

Open the local URL shown in the terminal.
