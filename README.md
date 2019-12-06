# mongo-scraper
## Overview
This ReactJS full stack app uses Cheerio to scrape the New York Times website, mongoose to start articles into a database, and ReactJS to render a UI that lets users save and comment on their favorite articles.

## Technologies and Dependencies
- JavaScript
- [Cheerio] (https://www.npmjs.com/package/cheerio)
- ReactJS
- Bootstrap and React-Bootstrap
- [Mongoose] (https://mongoosejs.com/)
- Node.js and Express

## Getting Started

To download and test this app, you will need the Node Packet Manager installed.  For more information, visit: <https://www.npmjs.com/get-npm>

You will also need Node.js installed.  For more information, visit <https://nodejs.org/en/download/>

### Installing

To install, access the Github page <https://github.com/sjconst/mongo-scraper>.  You may fork the repository and then clone it to your computer.  

Next, you will need to download the required NPM packages, on both the client and root foolders. Because these packages are listed as dependencies already in the package.json file, you may install these packages by typing `npm install` on the command line.

This app uses MySQL. You will need to set up your remote database by uploading the information in the `schema.sql` file located in the models folder. 