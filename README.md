# react-spotlight-tour

A lightweight, dependency-free React component for building step-by-step
spotlight product tours / onboarding walkthroughs. Highlights a target
element on the page and shows a card with a title, description, optional
image/video, and Next / Previous / Finish controls.

> **Note:** `react-spotlight-tour` is a placeholder package name. Rename it
> in `package.json` (and update the GitHub URLs) before publishing, since the
> name must be unique on the npm registry.

## Install

```bash
npm install react-spotlight-tour
```

`react` and `react-dom` (>=16.8, for hooks support) are peer dependencies and
must already be present in your project.

## Usage

```tsx
import { Tutorial } from "react-spotlight-tour";

function App() {
  return (
    <>
      <button id="new-project-btn">New project</button>
      <div id="sidebar">...</div>

      <Tutorial
        steps={[
          {
            followId: "new-project-btn",
            title: "Create a project",
            description: "Click here to start a new project.",
          },
          {
            followId: "sidebar",
            title: "Your workspace",
            description: "Everything you build lives here.",
            src: "/onboarding/sidebar.png",
          },
          {
            title: "You're all set!",
            description: "That's it — have fun exploring.",
          },
        ]}
        onClose={() => console.log("tour finished or dismissed")}
      />
    </>
  );
}
```

Each step card automatically positions itself next to the element referenced
by `followId` (falling back to a centered card if omitted or the element
can't be found), and repositions on scroll/resize.

## API

### `<Tutorial />`

| Prop          | Type         | Default | Description                                      |
| ------------- | ------------ | ------- | ------------------------------------------------- |
| `steps`       | `Step[]`     | —       | Required. The ordered list of steps to walk through. |
| `defaultOpen` | `boolean`    | `true`  | Whether the tour starts open.                     |
| `onClose`     | `() => void` | —       | Called when the tour is finished or dismissed.    |

### `Step`

| Field         | Type     | Description                                                        |
| ------------- | -------- | -------------------------------------------------------------------- |
| `followId`    | `string` | Optional `id` of the element to spotlight. Card centers if omitted.  |
| `title`       | `string` | Step title.                                                           |
| `description` | `string` | Step body text.                                                       |
| `src`         | `string` | Optional image or video URL. `.mp4` renders as `<video>`, else `<img>`. |

## Styling

Base styles are imported automatically when you import from the package. If
your setup (e.g. certain Next.js configurations) doesn't apply CSS imported
from `node_modules` automatically, import the stylesheet explicitly once in
your app's entry point:

```ts
import "react-spotlight-tour/styles.css";
```

Look, feel, and colors are controlled by CSS custom properties defined on
`:root` (e.g. `--tutorial-primary`, `--tutorial-bg`, `--tutorial-radius`) —
override them in your own CSS to theme the component.

## Development

```bash
npm install
npm run build   # emits dist/esm, dist/cjs, dist/types
```

## Publishing to npm

1. Update `name`, `version`, `author`, `repository`/`homepage`/`bugs` URLs in
   `package.json`, and the copyright line in `LICENSE`.
2. Make sure the chosen package name is free:
   ```bash
   npm view react-spotlight-tour
   ```
   (a 404 means it's available; pick a new name or scope it, e.g.
   `@yourusername/react-spotlight-tour`, if it's taken).
3. Log in to npm (one-time):
   ```bash
   npm login
   ```
4. From the package root, do a dry run to confirm exactly what will be
   published:
   ```bash
   npm publish --dry-run
   ```
5. Publish for real (this also runs `npm run build` automatically via the
   `prepublishOnly` script):
   ```bash
   npm publish
   # if using a scoped name and want it public:
   npm publish --access public
   ```
6. For future updates, bump the version before publishing again:
   ```bash
   npm version patch   # or minor / major
   npm publish
   ```

## License

MIT
