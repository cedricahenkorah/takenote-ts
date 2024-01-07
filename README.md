# TakeNotes App

## Overview

This project is a TypeScript (TS) rebuild of [takenotes_frontend](https://github.com/cedricahenkorah/takenote-ts.git) that allows users to create, save and organize their notes seamlessly. In addition to basic note-taking functionality, the application is designed to include advanced features later in the future such as grouping notes into folders, sharing notes with others, and recording notes through speech-to-text technology. This README provides an overview of the application, installation instructions, usage guidelines, and a roadmap for future enhancements.

Backend repository for reference: https://github.com/cedricahenkorah/takenote_server.git

![Landing Page Screenshot](src/assets/home_screenshot.jpeg)

## Table of Contents

- [Installation and Set up](#installation)
- [Usage](#usage)
- [Future Additions](#future-additions)
- [Contributing](#contributing)

## Installation

1. **Clone the repository**

```shell
git clone https://github.com/cedricahenkorah/takenote-ts.git
```

2. **Navigate to the project directory**

```shell
cd takenote-ts
```

3. **Install dependencies**

```shell
npm install
```

4. **Run the application**

```shell
npm run dev
```

## Usage

live web version: https://takenote-five.vercel.app/

- This repo is still being updated and has not been deployed yet to the live url

1. **Create an account**

- Create an account with your email, username and password

2. **Create a note**

- Click on the add a note button to create a new note
- Enter the title, lable and body(notes) of your note and click on save to create your new note

3. **View a note**

- Click on a note in the list to view its content

4. **Delete a note**

- Click on the delete icon on the note in the list to delete the note

## Future Additions

- UI updates
- Edit notes
- Record notes with speech to text functionality
- Organize notes into folders
- Share and collaborate on notes with other users

## Contributing

- Create an issue or look through the current issues to see which one(s) you can tackle (optional)
- Fork or clone the project
- Create and push your own branch and make a PR for review

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
