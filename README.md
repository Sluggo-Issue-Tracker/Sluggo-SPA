# sluggo-spa
The single-page-application frontend for Sluggo written in Vue.js and
TypeScript.

## Project setup

### nvm setup (optional)
```
nvm install --lts
nvm use --lts
```

### Install packages
```
yarn
```

### Run the Application
When setting up the project, be sure to do the following:
* Run the SluggoAPI server (available from 
https://github.com/Sluggo-Issue-Tracker/Sluggo-API) at 127.0.0.1:8000 (should be
default port configuration).

Then run:
```
yarn run serve
```

You may access the SPA instance from http://127.0.0.1:8080 in your browser.

Be sure to use this address, using localhost:8080 will result in CORS errors.

Ideally, this will be privately configurable later.

### Compiles and minifies for production
```
yarn run build
```

### Run your unit tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Key Technologies
* node v14.17.5
* [Sluggo-API](https://github.com/Sluggo-Issue-Tracker/Sluggo-API)
* [Boxicons](https://boxicons.com/) (icon pack)
* [Bulma](https://bulma.io/) (Css framework)
* [Vue v3](https://v3.vuejs.org/guide/introduction.html)
