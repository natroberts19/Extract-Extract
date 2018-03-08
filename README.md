# EXTRAct-EXTRAct

## Description:

EXTRAct-EXTRAct is a web application that lets users view and leave comments on articles. It is a full stack application that uses Mongoose queries to scrape the Bored Panda website and extract the headlines for the user. Users read dynamically displayed articles in an embedded frame and can add comments. The headlines and comments are stored in a back-end Mongo database for persistent storage.

## Design Specs and Technologies:

### Responsive UI:

* Our responsive UI was achieved using **Bootstrap** elements and **Handlebars** templating and Bootstrap responsive elements including layout, forms, tables, and buttons.

### Back-end Server and Routing:

* Our back-end server is designed using **Node** and **Express.js** web server.
* The server is backed by a **Mongo database** that utilizes **Mongoose** ORM's. The Mongo database persistently stores scraped website data and user comments for each article. Mongoose is used to create the collection structure and to develop the GET and POST routing queries we use to pass information between back and front-ends. 
* Our application is live-hosted on the **Heroku** web service.

### NPM Packages:

* The **Cheerio** npm is used to scrape the Bored Panda website.
* Our middle-ware functionality is achieved through **body-parser** npm and **morgan**, which is an HTTP request logger middleware for node.js.


## See my App: 

### https://dry-meadow-29598.herokuapp.com/


