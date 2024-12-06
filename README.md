# Issue Tracker

Issue Tracker is a feature-rich issue tracking application built using modern web technologies. It is designed to help teams effectively manage and resolve issues while maintaining streamlined workflows.

## Features

1. User Authentication: Secure authentication using next-auth with Prisma adapter.
2. Rich UI Components: Built with @radix-ui and tailwindcss for highly accessible and visually appealing components.
3. Form Handling: Seamless form validation using react-hook-form with zod and @hookform/resolvers.
4. Interactive Data Display: Beautiful, dynamic charts powered by recharts.
5. Markdown Support: Write and edit content with a Markdown editor using react-markdown and react-simplemde-editor.
6. Notifications: Real-time notifications with react-hot-toast.
7. Type Safety: Fully typed with TypeScript for enhanced developer experience
8. Responsive Design: Fully responsive layouts with tailwindcss.
9. Custom Styling: Tailwind configuration with the prettier-plugin-tailwindcss for consistent formatting.

# Start Project

1. npm install
2. npx prisma init
3. npx prisma generate
4. Add data to env

## Updating the Database Schema

1. npx prisma generate
2. npx prisma db push

# Generating Mock Data

1. npx prisma init
2. npx prisma generate
3. npx tsc prisma/seed.ts
   To transpile your seed.ts script to JavaScript
4. node prisma/seed.js
