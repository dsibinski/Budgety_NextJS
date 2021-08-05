![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=budgety-three)


This is a repository of Budgety app.
The documentation can be found on Notion: https://dsibinski.notion.site/Budgety-38ba6937a6d34c379d6ec495fbc5d244

The app is deployed here: https://budgety-three.vercel.app/

## About the app

This is a [Next.js](https://nextjs.org/) project.

In order to run the development server:

```bash
npm run dev
# or
yarn dev
```

## Backend

Budgety app uses Firebase as backend.
In order to use it with your Firebase, create `.ENV` file and create all necessary values:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_DATABASE_URL=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# for firebase-admin
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```
