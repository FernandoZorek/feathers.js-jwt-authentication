# FeathersJS Base Project
## _feathers.js-jwt-authentication_
FeathersJS Base Project
This project is a base setup for a FeathersJS application. It is designed to serve as a starting point for other projects, providing a basic structure and common functionalities such as user authentication.

> feathers.js-jwt-authentication
> It is designed to serve as a starting point for
> other projects, providing a basic structure and
> common functionalities such as user authentication.

## Features

- Create API RESTful to authenticate users with jwt token;
- Create, update, detele and list users;
- Generate jwt token;


## Tech

This project uses several open source projects to function correctly::

- [Docker] - Platform for developing, shipping, and running applications using containerization;
- [Nginx] - Advanced Load Balancer, Web Server, Reverse Proxy;
- [MYSQL] -  - Relational database management system for data storage;
- [Node.js] - JavaScript runtime built on Chrome’s V8 JavaScript engine;
- [Express.js] - Fast, unopinionated, minimalist web framework for Node.js;
- [Feathers.js] - The API and Real-time Application Framework;
- [Sequelize] - A modern TypeScript and Node.js ORM for Oracle, Postgres, MySQL, MariaDB, SQLite and SQL Server, and more;

## Installation

Dillinger requires [Node.js](https://nodejs.org/) v20+ to run.

Install the dependencies and devDependencies and start the server.

```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
docker-compose up
```

### Config DB

```bash
Open DB and create schema "feathers"
```

### Creating a Test User
To create a test user, you can provisionally insert this code below on line 30 of the sequelize.js file:
```sh
await app.service('users').create({
  email: 'test@feathersjs.com',
  password: 'supersecret'
});
```

### Testing User Authentication
To test user authentication and receive a JWT (JSON Web Token), make a POST request to the /authentication route with the user’s email and password:
```sh
axios.post('http://localhost:3030/authentication', {
  strategy: 'local',
  email: 'test@feathersjs.com',
  password: 'supersecret'
})
.then(response => {
  console.log('Authenticated!', response.data);
})
.catch(error => {
  console.error('Error authenticating!', error);
});
```

### Expected return
After making the request with login and password for the authentication route, a response similar to the response below will be returned:
```sh
{
"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE3MTEyMzM1NTcsImV4cCI6MTcxMTMxOTk1NywiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiMSIsImp0aSI6IjBlOGQwNzE5LTUwYWQtNDE2NC1hNjcyLTRmOGQwMWM2ODhjMiJ9.EpbmX-0eS1SuroIQsbDUQ5DOcIE8WK16KGOaH7weYa4",
"authentication":{
  "strategy": "local",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE3MTEyMzM1NTcsImV4cCI6MTcxMTMxOTk1NywiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiMSIsImp0aSI6IjBlOGQwNzE5LTUwYWQtNDE2NC1hNjcyLTRmOGQwMWM2ODhjMiJ9.EpbmX-0eS1SuroIQsbDUQ5DOcIE8WK16KGOaH7weYa4",
  "payload":{"iat": 1711233557, "exp": 1711319957, "aud": "https://yourdomain.com",…}
},
"user":{
  "id": 1,
  "email": "test@feathersjs.com",
  "createdAt": "2024-03-23T22:30:09.000Z",
  "updatedAt": "2024-03-23T22:30:09.000Z"
  }
}
```

### Using JWT for Authentication
Once you have received your JWT (JSON Web Token) from the /authentication route, you can use it to authenticate your requests to other routes in the application. This is done by including the JWT in the Authorization header of your HTTP requests.
Here’s an example of how you can use the JWT to list users by accessing the /users route:
```sh
axios.get('http://localhost:3030/users', {
  headers: {
    Authorization: `Bearer ${your_jwt}`
  }
})
.then(response => {
  console.log('User list:', response.data);
})
```

## License

MIT
**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
[Docker]: <https://docs.docker.com/>
[Nginx]: <https://www.nginx.com/>
[MYSQL]: <https://dev.mysql.com/doc/>
[Node.js]: <https://nodejs.org/docs/latest/api/>
[Feathers.js]: <https://feathersjs.com/api/>
[Express.js]: <https://expressjs.com/en/guide/routing.html>
[Sequelize]: <https://sequelize.org/api/v6/identifiers>
