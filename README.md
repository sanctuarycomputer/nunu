# Nu Nu

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [The Stack](#the-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [VSCode Extenstions](#vscode-extensions)
- [Project Need To Know's](#project-need-to-knows)
  - [Styleguide](#styleguide)
- [Our Git Process](#our-git-process)
  - [Branch Naming Conventions](#branch-naming-conventions)
- [Important Links](#important-links)
  - [Project Wiki](#project-wiki)
  - [Code Style](#code-style)
- [Questions?](#questions)

<!-- ABOUT THE PROJECT -->

## About The Project

This is a relaunch of the old XXXI as a new community space for hosting events, workshops, shared / sharing knowledge, and store.

### The Stack

Here are the major frameworks, programming languages, software and libraries we are using on this project:

#### Dev

- [Liquid](https://shopify.github.io/liquid/)
- [Basement CSS](https://basement.sanctuary.computer/)
- Shopify Bookings
- [Accentuate Custom Fields for Shopify](https://www.accentuate.io/)

#### Design

We are using [Figma](https://www.figma.com) for our design comps.
[Here](https://www.figma.com/file/eZqowMWKoITGsLcqNbuVBO/XXXI-2.0?node-id=169%3A269) is the link to the design files. If you need access, please contact XXIX.

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

You need the following libraries and software before you can get the project up and running. Please install them using the steps provided.

- brew

```sh
brew install node
```

- yarn

```sh
brew install yarn
```

### Installation

1. Clone the repo

```sh
git clone https://github.com/sanctuarycomputer/nunu.git
```

To spin up the front-end, follow these steps:

1. Install NPM packages

```sh
yarn install
```

2. Spin up the project

```sh
yarn start
```

### Development

**NOTE:** If you're currently running `theme watch` from a different feature, **please kill that process before following the below steps!**

1. Create a feature branch in Git (`feature/843-product-grid`)
2. Login to the Shopify Admin, navigate to `Online Store -> Themes` and duplicate a theme. Name it the same as your branch name, click Customize and grab its ID from the URL bar.
3. Set that ID in your `theme/.env` file as `DEVELOPMENT_THEME_ID`.
4. Run `yarn deploy` to ensure your theme is now in sync with the compiled assets.
5. You're now ready to develop! Run `yarn watch`, and changes to the local files will be compiled and sync'd to your new theme.
6. In order to preview your development theme, head to the Shopify Admin, find your theme, and under `Actions` click `Preview`.

### Deployment

**NOTE:** The following process will ensure we never overwrite the production theme accidentally.

1. Preview the theme you would like to set live
2. Under `Actions`, click `Duplicate`.
3. Rename the duplicated theme `Production #{n+1}` (the live theme should be `Production #{n}`)
4. Under `Actions`, click `Publish`.

### VSCode Extensions

We highly recommend using VSCode for this project and adding the following extensions:
<List extensions here>

If you are not using VSCode, please check to see if you editor has an equivalent for the listed extentions and install.

## Project Need-To-Know's

### Styleguide

View Default Page style guide at /pages/default-page-style-guide

## Our Git Process

To learn more about Sanctuary's Git best practices, click [here](https://www.notion.so/garden3d/Git-best-practices-039a1aa4b86649d184bb3ea71efbef25)

### Branch Naming Conventions

When naming branches, please use the following structure:

- For new features: `feature/<issue-number>-<feature-name-seprated-using-dashes>`
- For updates to existing features: `update/<issue-number>-<feature-name-seprated-using-dashes>`
- For bug fixes: `bugfix/<issue-number>-<bug-name-seprated-using-dashes>`

## Important Links

### Project Wiki

//TO-DO: Add Project Wiki

### Code Style

https://www.notion.so/garden3d/Code-Style-4a5e5835bbab44dd982e4f36d6933e50

## Questions?

If you have dev-related questions about this project you can contact:
Conor Davidson
Sebastian Odell
Christine Kim
