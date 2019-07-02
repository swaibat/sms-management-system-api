# Property-Pro-Lite-Api
[![Build Status](https://travis-ci.org/swaibat/Property-Pro-Lite-Api.svg?branch=develop)](https://travis-ci.org/swaibat/Property-Pro-Lite-Api)
[![Coverage Status](https://coveralls.io/repos/github/swaibat/Property-Pro-Lite-Api/badge.svg?branch=develop)](https://coveralls.io/github/swaibat/Property-Pro-Lite-Api?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/446b99e027bef069bb71/maintainability)](https://codeclimate.com/github/swaibat/Property-Pro-Lite-Api/maintainability)

Property Pro Lite is a platform where people can create and/or search properties for sale or rent.

## Folder structure
Within Property-Pro-Lite-Api folder you WIll find the following directories and files. Cross check in any of the file misses the app may have a problem while bieng excetuted

```
            Property-Pro-Lite-Api/
                    │
                    ├── api/
                    │   ├── models/
                    │   ├── data/
                    │   ├── helpers/
                    │   ├── middleware/
                    │   └── routes
                    ├── tests/
                    ├── .babelrc
                    ├── .eslintrc.js
                    ├── .gitignore
                    ├── .travis.yml
                    ├── README.md
                    ├── index.js
                    └──package.json
```
## Getting Started
By running the following command Property-Pro-Lite-Api will be automatically downloaded to your local machine so lets get started.

```
git clone https://github.com/swaibat/quick-credit-ui.git
```

### Prerequisites

before you install the software make sure you have the following already installed on your machine

- nodejs get it [here](https://nodejs.org)
- Nodemon installed globally by runing `npm i nodemon -g`


### Installing api

A step by step series of examples that tell you how to get a development env running
1. run
```
npm i 
```
To install all the necessary packages on your local computer

2. To start your sever
```
npm start
```
this will start your application and run on **port 3000**

## Running the tests

TO run the test for the api 
```
npm run test 
```
3. ### Endpoints and methods

So now you can access the following routes using provided methods
## Required Features

- User can  **sign up**
- User can **login**
- User (agent) can post a property advert.
- User (agent) can update the details of a property advert.
- User (agent) can mark his/her posted advert as sold.
- User (agent) can delete an advert.
- User can view all properties.
- User can view all properties of a specific type - 2 bedroom, 3 bedroom, mini flat etc.
- User can view a specific property.


## API-ENDPOINTS

- V1

`- POST /api/v1/auth/signup Create user account`

`- POST /api/v1/auth/signin Login a user`

`- POST /api/v1/property create a new property`

`- GET /api/v1/property Get all property`

`- GET /api/v1/property/<:id> Get property by Id`

`- GET /api/v1/property?type='3bedrooms' Get all property of specific type`

`- PATCH /api/v1/property/<:id> update a single property`

`- PATCH /api/v1/property/<:id>/sold mark property as sold`

`- DELETE /api/v1/property/<:id> Delete a single property`


## Pivotal Tracker story board

[https://www.pivotaltracker.com/n/projects/2354057](https://www.pivotaltracker.com/n/projects/2354057)

## gh-pages UI

You can see a hosted version of the template at [https://swaibat.github.io/Property-Pro-Lite/](https://swaibat.github.io/Property-Pro-Lite/)

## API URL

The API is currently in version 1 (v1) and is hosted at
[https://Property-Pro-Lite-Api.herokuapp.com/](https://Property-Pro-Lite-Api.herokuapp.com/)

## API Documentation

[https://Property-Pro-Lite-Api.herokuapp.com/documentation](https://Property-Pro-Lite-Api.herokuapp.com/documentation)



or you can view the completed tests on server via [coveralls](https://coveralls.io/github/swaibat/Property-Pro-Lite-Api-v1?branch=develop)

### Break down into end to end tests

these tests specifically targets the following
1. All the **http methods** to ease api usage and avoid errors in the code.
2. all Errors to easily identify error message and course of error.
3. Tests for Admin Access to specific routes to avoid other users Access to admin routes.
4. check whetther the tokens are posted successfully
5. All **status codes** to make sure all error and success are catered for

## Author

* **Rumbiiha Swaibu** - *Initial work* - [swaibat](https://github.com/swaibat)