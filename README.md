# SvelteKit

## table of content:

- [Introduction](#introduction)
- [Why SvelteKit](#why-sveltekit)
- [Create command for SvelteKit application](#create-command-for-sveltekit-application)
- [Routing](#routing)
  - [Routing case](#routing-case)
  - [route params](#route-params)
  - [route layout](#route-layout)
  - [route navigation programmatically](#route-navigation-programmatically)
  - [`$app/navigation` functions](#appnavigation-functions)
  - [validating params](#validating-params)
- [Fetch data](#fetch-data)
  - [types of fetch data](#types-of-fetch-data)
  - [Throw error from `load` function](#throw-error-from-load-function)

## Introduction:

SvelteKit is an application framework for building high performance web application using svelte.

## Why SvelteKit:

- File based routing
- pre-rendering
- API routes
- data fetching
- optimized production build system

## Create command for SvelteKit application:

`npm create svelte@latest learn-sveltekit`

`cd learn-sveltekit`

`npm install`

`npm run dev -- --open`

## Routing:

- All routes must be placed inside the `routes` folder within the `src` folder
- every file that corresponds to a route must be name +pages.svelte.
- svelteKit by default set a not found page. User can edit this.

### Routing case:

- imagine user need a page which URL is `/about`. then just create a folder `about`. And inside that create +page.svelte to write needed code which shows on about page.
- imagine user need a page which url is `/about/company`. Do same things for `/about` part. then create a folder under `about` folder called `company`. then in `company` folder create `+page.svelte` file.
- imagine user need a page which url is `/items/<itemId>`. Do same things for `/items` part. then create a folder under `items` folder called `[itemId]`. then in `[itemId]` folder create `+page.svelte` file.
- image user need a page which url length can be change frequently. As a example documentation page like `/docs/feature1/section2/example1`. Here nesting routing can be added frequently. For this svelteKit provide catch all route feature. for the user `docs` folder create a folder like `[...slug]`. folder name can be anything. but three dot must be maintained. And get it using `$page.params.slug`. here user can get the all routes url followed by docs like `feature1/section2/example1`.
- imagine user need a page which has optional dynamic params. For that just named folder name as `[[optionalParam]]`

### route params:

```html
<script>
	import { page } from '$app/stores';
	const itemId = $page.params.itemId;
</script>
```

### route layout:

- to create a general layout just create a file called `+layout.svelte` as a sibling of `+page.svelte`.

### route layout group:

- for make a group, create a folder named `(groupName)`. under the folder create what user need to create group layout. that folder doesn't valid in route URL.

### breaking out the layout:

- just add suffix of which layout user want in the file name. exp: `+page@(auth).svelte` (this for show auth layout) or `+page@.svelte` (this for root).

### route navigation:

just use `<a href="/about">about</a>` to navigate

### route navigation programmatically:

```html
<script>
	import { goto } from '$app/navigation';
	const gotoHome = () => {
		/**
		 * @param {String} - path string
		 * @param {Object} - { replaceState: true | false }
		 */
		goto('/', { replaceState: true });
	};
</script>

<button on:click="{gotoHome}">goto home</button>
```

### `$app/navigation` functions:

- `goto` - navigate dynamically
- `beforeNavigate` - a callback function which call before navigation initiate
- `afterNavigate` - a callback function which call after coming back to that page by clicking back button of a browser.

### validating params:

- create a folder called `params` in the `src` folder
- then create a js file at any name.
- now create a function as named `match` and export it.
- then rename the dynamic folder to `[paramKey=fileName]` which need to validate. for example: dynamic folder name is `[itemId]`. and the validate file name is `integer.js`. So renamed folder name should be `[itemId=integer]`

## fetch data:

In SvelteKit there is builtin system to fetch data. the process is given bellow.

- create a file named `+page.js` in parallel with which page data need to fetch.
- create a function named `load`. function body is given bellow.

```javascript
export const load = async (loadEvent) => {
	const { fetch } = loadEvent;
	const title = 'users list';
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	const users = await response.json();
	return { title, users };
};
```

- Now call it from `+page.svelte`. calling process is given bellow

```html
<script>
	export let data;
	const users = data.users;
</script>
```

### types of fetch data:

- client side (Universal)
- server side (server load)

### Difference between client and server load:

| client side | server side        |
| ----------- | ------------------ |
| run in both | only run in server |

#### client side:

```javascript
// +page.js
export const load = async (loadEvent) => {
	/**
	 * @property{fetch} - fetch function from the loadEvent
	 * @property{params} - params object from the loadEvent
	 * @property{url} - url object from the loadEvent
	 * @property{route} - route object from the loadEvent
	 */
	const { fetch, params, url, route } = loadEvent;
	// call api
};
```

#### server side:

```javascript
// +page.server.js
export const load = async (serverLoadEvent) => {
	/**
	 * @property{fetch} - fetch function from the serverLoadEvent
	 * @property{params} - params object from the serverLoadEvent
	 * @property{url} - url object from the serverLoadEvent
	 * @property{route} - route object from the serverLoadEvent
	 */
	const { fetch, params, url, route } = serverLoadEvent;
	// call api
};
```
### Throw error from `load` function:
When api fetching gonna fail or manually errors need to handle, then `SvelteKit` provide a feature to throw error. By throwing error shows the default error page. Otherwise user need to create a `+error.svelte` page as a sibling of data visualizing page. The process is given bellow.

```javascript
// +page.svelte
export const load = async (loadEvent) => {
  const { fetch } = loadEvent;
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  if (response.statusText === "OK") {
    const user = await response.json();
    return { user };
  }
  else {
    throw error(404, "User not found");
  }
}
```

For custom error page
```html
<!-- +error.svelte -->
<script>
  import {page} from "$app/stores";
</script>

<div>
  <h1>
    {$page.status}: {$page.error.message}
  </h1>
</div>
```