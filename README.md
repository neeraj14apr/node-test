# Node Todo App

A Node app built with MongoDB and Angular. For demonstration purposes and a tutorial.

Node provides the RESTful API. Angular provides the frontend and accesses the API. MongoDB stores like a hoarder.

## Requirements

- [Node and npm](http://nodejs.org)
- Environment specific settings are provided using [DotEnv](https://www.npmjs.com/package/dotenv).
    - Supported environment types are managed in a [configuration file](https://github.com/original4sure/node-todo/blob/master/envConfig.js) . Make sure to provide a valid environment type through your .env file.
    - A local environment has been added by default

- MongoDB: Make sure you have your own environment specific MongoDB database URI provided in your .env file. Check the supported keys [here](https://github.com/original4sure/node-todo/blob/master/config/database.js)

## Installation

1. Clone the repository: `git clone git@github.com:original4sure/node-todo.git`
2. Provide a valid .env file at root of your project. Find setup instructions [here](https://www.npmjs.com/package/dotenv) 
3. Install the application: `npm install`
4. Start the server: `node server.js`
5. View in browser at `http://localhost:8080`
