# Open Source Lens

## Setup

This application calls the GitHub API, which means you need to provide it an API token. For the application to work correctly, you need to follow [these steps to generate your token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token).
After you've done that, you need to create a `.env` file

```sh
touch .env
```
And populate it with the `GITHUB_TOKEN` value;

```
GITHUB_TOKEN=<your token goes here>
```

## Deployment

First, build your app for production:

```sh
npm run build
```
The build command runs the tests and will not continue to the build process if tests fail.

Then run the app in production mode:

```sh
npm start
```

## Languages, frameworks, and libaries used

- Node
- Typescript
- Vite
- Remix
- CSS modules for styling

## Potential TODOs:

- Animations
- Component testing
- Tackle known issues:
	- Lack of UI error handling when a fetch to the APIs happen
	- Use of features like `Suspense` and `Error Boundaries`
	- Better state handling
	- Refactor of CSS 
