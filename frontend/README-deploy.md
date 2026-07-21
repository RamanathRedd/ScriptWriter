# Deployment notes

## Frontend
- Build with `npm run build`
- Deploy the build output to Netlify or Vercel
- Set `REACT_APP_API_URL` to your deployed backend URL

## Backend
- Deploy this folder to Render or Railway
- Make sure `DATABASE_URL` is configured in the environment
- Use a PostgreSQL database service like Supabase, Neon, or Railway Postgres
