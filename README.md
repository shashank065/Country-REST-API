# Country REST API Project

This is a RESTful API project that includes authentication and various features for interacting with country data.

## Table of Contents

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Components](#components)
- [Features](#features)
- [Usage](#usage)
- [License](#license)

## Installation
 

## API Installation Instructions with Docker Compose

Follow these steps to set up and run the API using Docker Compose on your local machine.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- [Docker](https://www.docker.com/get-started) installed (version 24.0.5)
- [Docker Compose](https://docs.docker.com/compose/install/) installed (version 1.29.2)
- [Git](https://git-scm.com/) installed (optional)

### Clone the Repository

If you have Git installed, you can clone the repository using the following command:


   ```shell
   git clone https://github.com/your-username/Country-REST-API
```
Alternatively, you can download the source code as a ZIP file and extract it to your local directory.

###  Navigate to the Project Directory

Navigate to the project directory:

```bash
cd Country-REST-API
```

### Start the API with Docker Compose

To start the API and its dependencies defined in the `docker-compose.yml` file, run the following command:

```bash
sudo docker-compose up --build
```

This command will build the Docker image and start the containers. The API should now be running and accessible.

### Access the API

You can access the API at `http://localhost:3000`. 


## API Installation Instructions With Node js and PostgresSql 
Follow these steps to set up and run the API on your local machine.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed (version 16)
- [npm](https://www.npmjs.com/) (Node Package Manager) installed
- [Git](https://git-scm.com/) installed (optional)
- [PostgreSql](https://www.postgresql.org/) installed (latest)
### Clone the Repository

If you have Git installed, you can clone the repository using the following command:

```bash
git clone https://github.com/your-username/cd Country-REST-API
```

Alternatively, you can download the source code as a ZIP file and extract it to your local directory.

### Install Dependencies

Navigate to the project directory:

```bash
cd Country-REST-API
```

Install the project dependencies using npm:

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root directory and configure environment variables such as database connection ,  secret keys. Make sure to include  required environment variables specified 

```env
POSTGRES_HOST= db
POSTGRES_DB= yourdbname
POSTGRES_USER= yourdbuser
POSTGRES_PASSWORD= yourdbpassword
JWT_SECRET= 'your_secret_key'
PORT=3000
```

### Start the API

To start the API server, run the following command:

```bash
npm run dev
```

The API should now be running locally on port 3000 (or the port specified in your `.env` file).

The API will be accessible at http://localhost:3000.






## Project Structure

    
    country-rest-api/
    │
    ├── controllers/
    │   ├── authController.js   (Authentication controller)
    │   ├── countryController.js   (Country-related operations controller)
    │   middleware/
    │   ├── authenticateToken.js
    │
    ├── models/
    │   ├── User.js   (User model for authentication)
    │
    ├── routes/
    │   ├── authRoutes.js   (Authentication routes)
    │   ├── countryRoutes.js   (Country-related routes)
    │
    ├── app.js   (Main application file)
    │
    ├── config/
    ├── package.json
    └── Dockerfile
    └── docker-compose.yml
    └── .env (if you are not using docker)


## Components

The project consists of several key components that handle various aspects of the REST API functionality:

### Controllers

- **authController.js**: Responsible for user authentication, including registration and login. This controller also generates authentication tokens for users.

- **countryController.js**: Handles country-related operations, including finding a country by name, filtering, sorting, and listing all countries. This controller communicates with the REST Countries API to fetch data.

### Models

- **User.js**: Defines the user model for authentication. It includes user-related fields such as username and password.

### Routes

- **authRoutes.js**: Contains routes for user authentication, including registration and login. This module is responsible for generating and validating authentication tokens.

- **countryRoutes.js**: Includes routes for country-related operations. It provides endpoints for finding countries, filtering by various criteria, and sorting the results.

### Main Application File

- **app.js**: This is the main application file. It sets up the Express application, configures middleware, and handles routing. It's the core of the application's functionality.


### Package Configuration

- **package.json**: Lists project dependencies and defines scripts for running and managing the application.

### Docker Configuration

- **Dockerfile**: Contains instructions for building a Docker image of the application. This Docker configuration ensures portability and containerization of the REST API.

These components work together to provide the functionality of the REST API, including authentication, country data retrieval, and error handling.


## Features


1. Authentication: Provides a secure way to generate valid authentication tokens based on user credentials (username/password).
2. Endpoint Protection: Secures all API endpoints with authentication, returning authentication errors if the auth token is not present or invalid.
3. Detailed Country Information: Retrieves comprehensive information about a specific country by providing its name as a parameter.
4.  List of Countries: Fetches a list of all countries' names based on filters (population/area/language) and supports sorting (asc/desc) with built-in pagination.
5. JSON Responses: Returns data in JSON format for easy consumption.
Error Handling: Implements robust error handling for cases where requests to the REST Countries API fail or encounter errors.

## Usage
### Authentication

####  Register a User and Get a Token

To obtain an authentication token, make a POST request to the following endpoint:

```shell
curl -X POST -H "Content-Type: application/json" -d '{"username": "your_username", "password": "your_password"}' http://localhost:3000/auth/register
```

Response


```shell
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJpYXQiOjE2OTUwNDEzODF9.XDyoQrcv353p_Jv-eV2qVgk8rmLPKVJ9MAJCfA2sNuo"
}
```

Include your username and password in the request body. Upon successful authentication, you will receive an authentication token in the response.


####  Login a User and Get a Token

To obtain an authentication token, make a POST request to the following endpoint:

```shell
curl -X POST -H "Content-Type: application/json" -d '{"username": "your_username", "password": "your_password"}' http://localhost:3000/auth/login
```

Response


```shell
{
	"token": "token"
}
```

### Country Data
####  Fetch Detailed Country Information with Token in Header

To make a GET request with a token in the header, you need to include the token in the Authorization header as a bearer token. Assuming you have the token from the login response, you can use it like this:

```shell
curl -H "Authorization: Bearer your_token" http://localhost:3000/api/country/{country-name}
```

Replace `{country-name}` with the name of the country you want to fetch details for. Ensure that you include the authentication token in the request headers.

####  Retrieve List of Filtered Countries with Token in Header


To fetch a list of all countries, apply filters, sorting, and pagination using the following endpoint:

```shell
curl -H "Authorization: Bearer your_token" http://localhost:3000/api/countries?language=English&population=10000&area=500&sort=name&order=desc&page=1&limit=10
```

Response 


```shell
{
	"metadata": {
		"total": 53,
		"page": 1,
		"limit": 10,
		"filter": {
			"language": "English",
			"population": "10000",
			"area": "500"
		},
		"order": "desc",
		"sort": "name"
	},
	"countryNames": [
		"Zimbabwe",
		"Zambia",
		"Vanuatu",
		"United States",
		"United Kingdom",
		"Uganda",
		"Turks and Caicos Islands",
		"Trinidad and Tobago",
		"Tonga",
		"Tanzania"
	]
}
```

You can provide query parameters to filter, sort, and paginate the results. Remember to include the authentication token in the request headers.

Supported query parameters:
- `language`: Filter by language.
- `population`: Filter by population.
- `area`: Filter by area.
- `sort`: Sort the results by `name`, `population`, or `area`. (name is by default) 
- `order`: Sorting order (`asc` or `desc`).(`asc` is by default) 
- `page`: Page number for pagination.(`1` is by default) 
- `limit`: Number of items per page.(`10` is by default) 

## License

This project is licensed under the [MIT License](LICENSE).

The MIT License is a permissive open-source license that allows you to use, modify, distribute, and sublicense the code in both open-source and proprietary projects. It imposes very few restrictions on how you can use the software, making it a flexible choice for most projects.

### MIT License Summary

- **Permission**: This software and associated documentation files (the "Software") can be used, copied, modified, merged, published, distributed, sublicensed, and/or sold with no restrictions.

- **Conditions**: The MIT License requires that you include the original copyright notice and disclaimers in all copies or substantial portions of the Software.

- **Liability**: The Software is provided "as is," and the author or copyright holder shall not be liable for any damages or liabilities arising from its use.

For the full text of the MIT License, please refer to the [LICENSE](LICENSE) file included in this repository.
