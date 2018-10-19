# Auth 0 React/Redux POC/Demo

This repo has three sub-packages:

* redux-data-service: A redux wrapper for the common auth0 api actions that can be run as a standalone demo.
* react-ui: A simple React UI that makes use of the redux data service and bb ui components to demo interaction with various types of API
* mock-api: a dead simple node express server with 3 api endpoints to allow testing of authorization to those endpoints.

## Running the demo:

### Redux Data Service Only

* `cd packages/redux-data-service`
* `yarn install`
* `yarn demo`

### React UI with Mock API calls

Build and Link the Data Service Component
* `cd packages/redux-data-service`
* `yarn install`
* `yarn build`
* `yarn link`

Run the React UI
* `cd packages/react-ui`
* `yarn install`
* `yarn link bb-auth-data-service`
* `yarn demo`

Run the Mock api
* `cd packages/mock-api`
* `yarn install`
* `yarn start`

## Example Users:

local.teacher@dbconnection.com
local.user@dbconnection.com
tester.test@test99.com
