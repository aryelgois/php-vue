> Bundling Vue.js components with webpack for use in PHP applications
>
> Based on post by Michał Męciński: [Using Vue.js components in PHP applications][post]


# Intro

This repository is intended to be a skeleton for new PHP projects using [Vue.js]
in the front-end.


# Setup

1. You may clone this repository and go to step 2, or you can:

 ```bash
# create a new repository
git init
# create repository manifest files
touch LICENSE README.md
# add a Initial commit
git add .
git commit -m 'Initial commit'
# [optional] change to a development branch
git checkout -b develop
# add this repository remote and fetch its data
git remote add aryelgois/php-vue https://github.com/aryelgois/php-vue.git
git fetch aryelgois/php-vue
 ```

 * Then you can squash:

  ```bash
git merge --squash aryelgois/php-vue/master -X ours
git commit -m 'Import aryelgois/php-vue'
  ```

 * Or merge and have a compound history:

  ```bash
git merge aryelgois/php-vue/master -X ours # --allow-unrelated-histories (for git >2.9)
  ```

2. Install dependencies

 ```bash
cd webpack
npm install
 ```


# Usage

## Development

It is recommended to use the webpack-dev-server with the hot module replacement
for a better experience:

```bash
cd webpack
npm run dev
```

It will be using http://localhost:8080 to serve the required files. Apache might
be running on port 80, but there is a configuration telling the browser not to
block the AJAX requests to 8080.


## Production

Generate minified files for production:

```bash
cd webpack
npm run build
```

They are placed at `public/assets/`, so configure PHP to use them in the pages.
The example automatially use them if `assets.json` exists.

The production server does not need the `webpack/` directory.


# Workflow

## Root component

Since the Vue [runtime-only][Runtime-vs-Runtime-only] build is being used, you
can not include templates in the HTML or in JavaScript. They must be in `*.vue`
files, compiled by webpack.

So, you create a root component for your application and use `webpack/main.js`
to render it. e.g.:

```js
// ...

new Vue({
  el: '#app',
  render: h => h(App)
});
```

And you can not target the `<body>`, because the target element is replaced by
the component. Use a child element to fill the whole body. Also, the `<script>`
including the bundle needs to be after such element.


## New components

Create [Single File Components] in `webpack/components/` and add them in
`webpack/main.js`:

```js
// ...
import MyComponent from './components/MyComponent.vue';

// ...
Vue.component('my-component', MyComponent);

// ...
```


## Comunication with PHP

Use AJAX to exchange data with the PHP server, with [vue-resource].


[post]: https://codeburst.io/using-vue-js-components-in-php-applications-e5bfde8763bc
[Vue.js]: https://vuejs.org
[Runtime-vs-Runtime-only]: https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
[Single File Components]: https://vuejs.org/v2/guide/single-file-components.html
[vue-resource]: https://www.npmjs.com/package/vue-resource
