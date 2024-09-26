# Shopping Basket

## Description

An online shopping platform that allows users to add items to a shopping basket and tracks the items that are removed before the user checks out.

## Requirements
- Users should be able to view a list of products
- Users should be able to add or remove products from the shopping basket.
- Once a user clicks the checkout button, it sends the items that had been removed from the shopping basket before checkout to the backend.


### Prerequisites

This service is built with the following tools and may require that they are installed on your environment before it can run successfully. The most important tool amongst the following is Docker. If docker is available on your environment, you do not need to have Node.js or MongoDB to run this application.

- Docker (Required)
- Nodejs (Optional)
- MongoDB


#### Environment Variables
The following environment variables are required to run this application if you would not be using Docker (With Docker, no environment variables are required). Once they have been determined, add a .env file to the root folder of the frontend and the backend folders as required.

- REACT_APP_API_URL - The Backend Base URL (Frontend - Mostly localhost:4500)
- DB_URL - A mongodb server base url. (Backend - Only required when docker is not used)
- PORT - The port of the backend server. (Backend - Optional and usually 4500)


### Initialization Steps (Docker)
To get the app up and running on a local environment, do the following:

- clone the repository with the following command:
```bash
# get app
$ git clone https://github.com/daylay92/shopping_basket.git
```
- Open the folder of the cloned repository
- Run the following command at the root of the project:
```bash
# Starts app with docker-compose
$ make up
```
- The app should now be running on port 3000, The backend of the application runs on port 4500 with all apis visible on the docs [here](http://localhost:4500/docs)
- Navigate to the browser and visit `http://localhost:3000`


###### Command Summary

```bash
# get app
$ git clone [repo](https://github.com/daylay92/shopping_basket.git)

# navigate to working directory and add environment variables
$ cd shopping_basket

# build and run services with docker-compose
$ make up
```

### Initialization Steps (Without Docker)
To get the app up and running on a local environment, do the following:

- clone the repository with the following command:
```bash
# get app
$ git clone [repo](https://github.com/daylay92/shopping_basket.git)
- Open the folder of the cloned repository
- Run the following command at the root of the project:
```bash
# Starts the backend application
$ cd backend && npm start:dev
```
- Open a new instance of your terminal at the root of the project
- Run the following command:
```bash
# Starts the backend application
$ cd frontend && npm start
```
- The app should now be running on port 3000, The backend of the application runs on port 4500 (or a PORT you set in the .env file) with all apis visible on the docs [here](http://localhost:4500/docs)
- Navigate to the browser and visit `http://localhost:3000`


###### Command Summary

```bash
# get app
$ git clone [repo](https://github.com/daylay92/shopping_basket.git)

# navigate to working directory and add environment variables
$ cd shopping_basket

# build and run services with docker-compose
$ make up
```

##### Testing (Integration Tests)
The backend of the application has some integration tests that can be ran with the following command:
```bash
# Runs the test cases on the application
$ make test
```

### API Endpoints
Once the application is up, visit `http://localhost:4500/docs` on your browser and you should see the OpenAPI documentation containing all the endpoints.


###### Other Technologies used:

- Typescript
- NestJs
- ReactJs
- MongoDB
- Swagger
- Jest

