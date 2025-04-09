## 🚀 Documentation generation

### 1. Start generation

```bash
npm run docs
```

> This is the command that runs TypeDoc according to the configuration in `typedoc.json` or `package.json`.

### 2. Where to look for the result?

The generated documentation will be located in the directory:

```
docs/
```

Open `docs/index.html` in your browser to view the full documentation site.

## 🧱 Comment requirements

- Describe all input props, returns, functions, hooks, variables.
- Use `@component`, `@param`, `@returns`, `@interface`, `@type`, `@example`, etc.
- Also document components in `memo`, hooks and classes (`extends Component`).

## ✅ Documentation example

```ts
/**
* Error boundary component for catching errors in React.
*
* @component
* @param {ReactNode} children - Nested components.
* @returns {JSX.Element} Error component or children.
*/
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
...
}
```

## 📁 Structure

All documentation is generated from the code in `src/`. Documentation is generated only for files that contain appropriate comments.

---

> 💡 Remember to keep comments up to date when changing the logic of the component.
