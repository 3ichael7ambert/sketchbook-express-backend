# Sketchbook Express Backend App

## Overview

The Sketchbook App is a web application built using Express.js, PostgreSQL, and various frontend libraries for canvas drawing. This README provides an overview of the project structure, database setup, and additional developer notes.

## Project Structure

### 1. app.js

The main entry point for the Express application. It configures middleware, sets up routes, and handles errors.

### 2. db.js

Manages the PostgreSQL database connection using the `pg` library. Handles both production and non-production environments.

### 3. config.js

Contains configuration settings for the application, including the secret key, port number, and database URI. Also defines a function to get the database URI based on the environment.

### 4. routes/routes.js

Defines the routes for the application. Includes routes for retrieving, creating, and handling canvases, as well as a route for serving SVG content.

### 5. expressError.js

Defines custom error classes that extend the standard JavaScript `Error` class. These classes are used for different HTTP error statuses (404, 401, 400, 403).

## Database Setup

To set up the PostgreSQL database for the Sketchbook App, follow these steps:

```bash
createdb sketchbook-db 
psql sketchbook-db < canvas-create.sql
psql sketchbook-db < canvas-seed.sql
```

## Developer Notes

- Additional developer notes provide information on libraries and tools used in the project, including links to documentation:
  - [GSAP](https://gsap.com)
  - [Konva.js](https://konvajs.org/docs/react/index.html)
  - [Fabric.js](http://fabricjs.com)
  - [NLTK](https://www.nltk.org)
  - [Wacom STU SDK](https://developer-docs.wacom.com/docs/stu-sdk/windows-sdk/api-guide/)
  - [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
  - [HTML Elements Drawing API](https://www.htmlelements.com/docs/drawing-api/)
  - [React Canvas Draw](https://www.npmjs.com/package/react-canvas-draw)
  - [KendoReact Drawing Components](https://www.telerik.com/kendo-react-ui/components/drawing/dom-elements/#toc-getting-started/)
  - [React Konva](https://github.com/konvajs/react-konva)
  - [React Sticky Notes](https://www.npmjs.com/package/@react-latest-ui/react-sticky-notes)
  - [React Pageflip](https://www.npmjs.com/package/react-pageflip)

## Frontend Setup

Follow these steps to set up the frontend React application:

```bash
npx create-react-app sketchbook-react-frontend
npm install fabric
npm install redux react-redux
npm install axios
npm install react-canvas-draw --save
```

Feel free to explore and contribute to the Sketchbook App! If you have any questions or issues, please don't hesitate to reach out.


```bash
createdb sketchbook-db 
psql sketchbook-db < canvas-create.sql
psql sketchbook-db < canvas-seed.sql
```

https://gsap.com
https://konvajs.org/docs/react/index.html
http://fabricjs.com
https://www.nltk.org
https://developer-docs.wacom.com/docs/stu-sdk/windows-sdk/api-guide/
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
https://www.htmlelements.com/docs/drawing-api/

https://www.npmjs.com/package/react-canvas-draw

https://www.telerik.com/kendo-react-ui/components/drawing/dom-elements/#toc-getting-started/
https://github.com/konvajs/react-konva

https://www.npmjs.com/search?q=draw
https://www.npmjs.com/search?q=draw
https://www.npmjs.com/package/@react-latest-ui/react-sticky-notes


https://www.npmjs.com/package/react-canvas-draw


https://www.npmjs.com/package/react-pageflip

# PROCESS
```bash
npx create-react-app sketchbook-react-frontend
npm install fabric
npm install redux react-redux
npm install axios
npm install react-canvas-draw --save



