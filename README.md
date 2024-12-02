# Start Project

1. npm install
2. npx prisma init
3. npx prisma generate

## Updating the Database Schema

1. npx prisma generate
2. npx prisma db push

# Generating Mock Data

1. npx prisma init
2. npx prisma generate
3. npx tsc prisma/seed.ts
   To transpile your seed.ts script to JavaScript
4. node prisma/seed.js

## Features

1. Delay package to simulate a slow server.
