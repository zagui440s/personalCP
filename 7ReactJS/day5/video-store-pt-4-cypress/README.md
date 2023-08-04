# Video Store

## Usage

Install dependencies

```sh
npm install
```

Run dev server

```sh
npm run dev
```

## Assignment

### Goal

Update the video store from it's starting point by integrating `react-router`. Our goal is to update the same-page details panel approach we currently have to have a seperate `<HomePage />` and `<DetailsPage />` that are on different urls and managed by `react-router`.

### Sub Goals

1. Add `react-router-dom` as a dependency to the project, create a `BrowserRouter` object and integrate it into `main.jsx`. Initially just set `<App />` as your root.

2. Update `router.jsx` to serve `<HomePage />` on index. Utilize `<Outlet />` within `<App />` to serve up the complete Home Page on `/`.

3. Update any page that uses `useContext` to use `useOutletContext` instead, and pass the relevant data through `<Outlet />`.

4. Refactor the `<HomePage />` to remove the `<DetailsPanel />`. Update `<DetailsPanel />` to become `<FilmPage />` and give it a unique path in `router.jsx` matching `/film/<film-id>`

5. Update `<InventoryItem />` to redirect to the appropriate `<FilmPage />` on click.

6. Refactor `<FilmPage />` to work with the param and the OutletContext to work as expected. Also include a `<Link />` to return to the Home Page.

### Example Solution

A solution is provided for you in the `solution` branch, definitely use it to look at the desired goal, but otherwise only look at the code when you are stuck.

Switch the the branch with:

```sh
git checkout solution
```

> You may need to first commit any un-commited work on `main`

Just like in main, install and run dev to see the desired output:

```sh
npm install
npm run dev
```
