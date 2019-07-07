# Studio90srls Specifications

```json
{
  "name": "@dmike/studio90srls",
  "version": "3.0.0",
  "description": "Web Page Studio90srls",
  "author": {
    "name": "dmike",
    "email": "cipmiky@gmail.com"
  }

```

## Architect

The project re-style is based on the _ReactJs_ framwork plus the _MDC React_ library.

* _ReactJs_ https://reactjs.org/docs/
* _MDC React_ https://github.com/material-components/material-components-web-react

### Toolchain

The toolchain is the instrument that create the javascript and css bundle. There are three 
pieces inside a toolchain, the *packager manager*, a *bundle* and a *compiler*.
For this project we have

* **Package Manger**  -> Yarn
* **Bundle** -> Webpack
* **Compiler** -> babel

The webpack bundle should contains the 

* _babel-loader_ with _env_ and _react_ preset 
* _typescript_ transformer plus _fork-ts-checker-webpack-plugin_ for ts type checking
* _sass_ and _css_ loader for style
* _terser_ and _css optimize_ plugin for code optimitazion 
* _file-loader_ and _url-loader_ for image icon and fonts.

Project dependecies

* _react_ and _reactDom_
* all the MDC component used.

### Directory structure

Follow the one proposed by react create app cli.

```shell
 +-- public // All static assets
 +-- src // tsx files and sass ones
```

## Ux Structure

```scss
$primary-color: //TODO
$accent-color: //TODO
```

The first section will have a background photo name logo and location of the agency,
plus a button that scroll the broswer to the second section.

### Header

For the header will use the *MDC - top_app_bar*, with primary color, logo and agency name.
The possible actions will be:

* open the cookie rules
* switch to dark theme

### Services Section
