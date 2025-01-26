# Microfrontends

### mf means MicroFrontends

This repo is currently only for development environment.

## Structure

### Host

- **apps**
  - **app**: Next.js app with routing pages and a notify endpoint API that calls `fetchBundles` from `bundles-manager/fetchBundles`, which updates the bundles state.
- **libs**
  - **bundles-manager**: Calls each of the micro frontends, gets current bundles, and saves them in the remote folder that can be used by the host app.

### mf-dashboard and mf-profile

- **apps**
  - **app**: Next.js app that exposes static bundles to be used by the host app.
- **public-components**
  - **[componentName]**: The components to be compiled and exposed by the `mf-[mf-name]-app`.
- **notify-script**: When the components are compiled, it notifies the host so the state of the components (bundles) is up to date in the host.

## Commands

### Host

- `npm run build-remote`: Builds the JS fetchBundles and then executes it. (Explained in Host [**bundles-manager**](#structure))
- `npm run dev`: Runs the Next.js host app.

### mf-dashboard and mf-profile

- `npm run dev`: Serves the Next.js `mf-[mf-name]-app` static bundles.
- `npm run build`: Compiles the components, copies the compiled bundles to the public folder of `mf-[mf-name]-app`, and notifies the host. (IMPORTANT - The Next.js `mf-[mf-name]-app` should be running so the host can fetch the bundles)
