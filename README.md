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
		goto('/', {replaceState: true});
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