# TreS_frontend

# Project TreS

This is frontend part of TreS project that will help you build whole website. Instruction describes how to clone and run the project on your local machine.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## How to Run

This react application

- Clone this repository
  git clone https://github.com/DNO-inc/TreS_frontend.git

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000/](http://localhost:3000/) to view it in your browser.
The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### Built With:

- vite - Build tool

## 📘 Documentation: Generating Documentation with TypeDoc

This project uses [TypeDoc](https://typedoc.org/) to automatically generate documentation from JSDoc/TypeDoc style comments.

### 🔧 Documentation Structure

Components, hooks, utilities should be documented via multiline comments in TypeDoc format:

```ts
/**
* Component to display a login modal window.
*
* @component
* @param {boolean} open - The state of the modal window opening.
* @param {Dispatch<SetStateAction<boolean>>} setOpen - The function to update the state of the opening.
* @param {() => void} handleSignUn - Callback to switch to the registration window.
* @returns {JSX.Element} The login modal window.
*/
const LogInModal: FC<LogInModalProps> = ({ open, setOpen, handleSignUn }) => {
...
}
```

## 📁 Structure

All documentation is generated from the code in `src/`. Documentation is generated only for files that contain appropriate comments.

---

> 💡 Remember to keep comments up to date when changing the logic of the component.

## Authors:

Team:

- [@yaroslavUsenko](https://github.com/yaroslavUsenko)
- [@artemlytvynov](https://github.com/artemlytvynov)
