# sluggo-spa
The single-page-application frontend for Sluggo written in Vue.js and
TypeScript.

## Project setup
```
npm install
```

### Run the Application
When setting up the project, be sure to do the following:
* Run the SluggoAPI server (available from 
https://github.com/slugbotics/SluggoAPI) at 127.0.0.1:8000 (should be
default port configuration).

Then run:
```
npm run serve
```

You may access the SPA instance from http://127.0.0.1:8080 in your browser.

Be sure to use this address, using localhost:8080 will result in CORS errors.

Ideally, this will be privately configurable later.

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
