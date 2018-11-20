# microservice-proj
Tiny app using a basic implementation of microservice architecture, implemented in the MEAN stack. Could potentially be used as a template for simple CRUD functionality.

## Installation
```bash
git clone https://github.com/DoloMike/microservice-proj.git
cd microservice-proj/services/customers
#(yarn or npm i) for installation of dependencies

yarn
cd ../loans
yarn
cd ../../client
yarn
```

Now all the code and dependencies are installed.

## Setup
The two microservices within the `services` folder require a `.env` file at the root directory. The `.env` file you use for each service should look like this.

```env
db_user=yourval
db_pass=yourval
db_url=yourval
port=yourval
```

Make sure the client projects `src/environments/environment.ts` file has correct values for `loansApiEndpoint` and `customersApiEndpoint`. These should point at the services root url, whereever you decide to run them. Their default values for locally running are:
```javascript
{
	loansApiEndpoint: 'http://localhost:4001/',
	customersApiEndpoint: 'http://localhost:4000/'
}
```

## Running

Simply open 3 terminals and run `npm start` or `yarn start` at the root of each sub-project:

```bash
cd microservice-proj/services/customers
yarn start
```
```bash
cd microservice-proj/services/loans
yarn start
```
```bash
cd microservice-proj/client
yarn start
```

