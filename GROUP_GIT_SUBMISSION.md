# Group Git Submission Guide

Use this guide when adding the `frontend-job-portal` folder to your group Git repository.

## Folder to Submit

Submit this folder:

```text
frontend-job-portal/
```

Do not manually upload `node_modules`, `dist`, `.vite`, or log files. They are ignored in `.gitignore`.

## Option 1: If This Folder Is Already Inside the Group Repo

From the group repository root, run:

```bash
git status
git add frontend-job-portal
git commit -m "Add frontend job portal UI"
git push origin main
```

If your group uses another branch name, replace `main` with that branch name.

## Option 2: If the Group Repo Is in Another Folder

Copy the `frontend-job-portal` folder into the group repository root. Then run:

```bash
cd path/to/group-repo
git status
git add frontend-job-portal
git commit -m "Add frontend job portal UI"
git push origin main
```

## Before Pushing

Run these commands inside `frontend-job-portal`:

```bash
npm install
npm run build
```

If the build passes, the module is ready to submit.

## Recommended Pull Request Description

```text
Added frontend Job Portal UI module.

Includes:
- Responsive job listing page
- Job details page
- Real-time search
- Location, category, employment type, and salary filters
- Pagination
- Loading and empty-results states
- Mock job data

Scope:
- Frontend only
- No authentication
- No backend APIs
- No database operations
- No admin dashboard
- No application form or resume upload
```
