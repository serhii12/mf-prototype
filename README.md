# goUrban new Dashboard

## Intro

- Dashboard uses microfrontends to chunk the app into smaller app using entities as the app separator.
- Structure consists of a container app and remotes apps.
- Container app is in charge of putting together all the remotes as well as handling some of the most important parts of the app like css variables, auth etc...

```bash
# Running a container with a remote
# When remote is created, script to run that remote in isolation with container present is created
# To run the script use:

npm run remotes:{remote_name}

# remote_name refers to the name of the created remote. Example: 'customers'
```

## Creating a new remote

```bash
# Script to create a new remote is used to generate all neccessary configurations and boilerplate
# To create a new remote use:

npm run new-remote --on_port={port} --remote_name={remote_name}

# port refers to port where this frontend will be create and its configuration set
# *KEEP IN MIND:* Ports should be unique** and should be the same as other Microfrontend app
# Remote name is used to create Files, Folders and configuration like paths and imports
```

## Test environment

```bash
# Tests are written in container app
# To be able to test and entire app, you will need to start container with all its microfrontends app together
# To run the script use:

npm run run test_environment
```

## Git flow

- Create your feature branch from develop like following:

```bash

feature|issue|bug/{task_number}
# Example: issue/12005

```

- Create Pull request to develop for code review and QA.

# React

## Environment

This project uses:

- [Microfrontends](https://micro-frontends.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/)
- [ESlint](https://eslint.org/)
- [Storybook](https://storybook.js.org/)
- [CSSModules](https://github.com/css-modules/css-modules)

As we want to do and maintain high quality code, please
check all those tools above and use them in feature development of this project.

## Starting the app

- Clone the repository
- Create .env file with the following

```bash
# Keep in mind this might change!

HOST=gourban-staging2.localhost
HTTPS=true
REACT_APP_TENANT_SERVICE_URL="https://AUTH_ENV.tenant.gourban.services"

```

- Run `$ npm install` inside container and remote directories to install all required dependencies
- Setup IDE to support ESLint, Prettier
- Run `$ npm run storybook` to run storybook
- Run `$ npm run start` to start development in complete isolation,
- Run `$ npm run remotes:{remote_name}` to start development for specified microfrontend with container in parallel,

# Rules

- (JSX|TSX) Components must always be capitalized, if its multi-word use camelcase. Example: `Button.tsx` `LineChart.tsx`
- Only reusable components should be under `src/components` directory.
- If some screen/component needs a chunk of code in a separate component which is not reusable, dont create it under `src/components` but rather create a components folder under that screen which represents that that component is only used there.
- Sidebar (navigation) panel should always be 1:1 with screens folder, where each screen represents sidebar route.
- If the file is a plain js, use lowercase, if its multi word use snakecase. `something.ts` `something_else.ts`
- Since we are using modular css, each component/screen that requires css modifications should be create under that component/screen with `.module.scss` extension
- Each component/screen should have `{ComponentName|ScreenName}.tsx` file and `index.ts` file which is used to default export that component. This is used because of some ESLint rules and some configurations that should only be done before exporting the component to keep the logic component clean.
- Please keep the storybook up to date, when ever you update or create and new reusable component, go to `src/stories` and update/create story for that component
- Keep all things related to redux in redux folder. Redux folder is structured like following:

```bash
# Redux files should try to keep their structure based on entities, ofcourse that wont be the case all the time
# Keys like Auth etc.. are not entities but they should have their own key
# Structure example:

screens
  |
  ------ Example
  |         |
  |         ------- Example.tsx
  |         |
  |         ------- index.ts
redux
  |
  ------ actions -> Used to export action functions that trigger redux state change.
  |         |
  |         ------- example.actions.ts
  |
  ------ reducers -> Used to manipulate redux state for that entity based on action provided
  |         |
  |         ------- example.reducer.ts
  |
  ------ selectors -> Used to get curtain value from redux
  |         |
  |         ------- example.selectors.ts
  |
  ------ index.ts -> Used for redux configuration, applying middlewares etc....
```

- To keep things unified, and to keep Typescript types and enums in the same fashion TS folder is present that should follow the same structure

```bash
# Structure example:

screens
  |
  ------ Example
  |         |
  |         ------- Example.tsx
  |         |
  |         ------- index.ts
redux
  |
  ------ actions -> Used to export action functions that trigger redux state change.
  |         |
  |         ------- example.actions.ts
  |
  ------ reducers -> Used to manipulate redux state for that entity based on action provided
  |         |
  |         ------- example.reducer.ts
  |
  ------ selectors -> Used to get curtain value from redux
  |         |
  |         ------- example.selectors.ts
  |
  ------ index.ts -> Used for redux configuration, applying middlewares etc....
  |
  |
  |
  ts
  |
  ------ enums -> Used to define constants with Typescript
  |        |
  |        ------ example.enums.ts
  |
  ------ types -> Used to define interfaces and types
  |        |
  |        ------ example.types.ts
```
