# Apples and Oranges App

This is a [Next.js](https://nextjs.org/) project which integrates with the OpenAI GPT service to execute simple comparisons between two topics based on a prompt and a list of sources provided for each topic.

## Prerequisites for development and deployment

### OpenAI API connection

You will need a valid API key for the OpenAI API. https://platform.openai.com/docs/api-reference/authentication

### Vercel KV for data storage

This project uses Vercel KV for storage. You will need to create a Vercel KV database before deploying, using the default settings (the environment prefix should be `KV_`).

### Environment variables

The following environment variables must be provided in a `.env.development.local` file to run the app locally (or in the ambient environment when running in the cloud):

-   OPENAI_API_KEY
-   KV_REST_API_TOKEN
-   KV_REST_API_URL

If configured in Vercel, you can pull these values into your development environment using:

```bash
vercel env pull .env.development.local
```

## Development and testing

Start the development application using:

```bash
npm run dev
```

Run the tests using:

```bash
npm test
```

## Deployment to Vercel

Vercel deploys this application automatically when new changes are merged into the main GitHub branch.

If you want to deploy this to your own Vercel project, you can either use the `vercel deploy` command or setup Vercel to deploy from your GitHub fork.
