[![Run Unit Tests](https://github.com/emanuelmassafera/nodejs-solid-api/actions/workflows/run-unit-tests.yml/badge.svg)](https://github.com/emanuelmassafera/nodejs-solid-api/actions/workflows/run-unit-tests.yml)

<h1 align="center">Node.js SOLID API</h1>

<p align="center">A simple Node.js RESTful API designed to reinforce SOLID concepts</p>

---

### About

This repository was designed to reinforce SOLID concepts. The idea was to create a simple RESTful API using Node.js and TypeScript following SOLID concepts. 

---

### Features

#### Functional Requirements

- [x] It must be possible to register;
- [x] It must be possible to authenticate;
- [x] It must be possible to get the profile of a logged in user;
- [x] It must be possible to obtain the number of check-ins performed by the logged in user;
- [x] It must be possible for the user to obtain his check-in history;
- [x] It must be possible for the user to search for nearby gyms (up to 10km);
- [x] It should be possible for the user to search for gyms by name;
- [x] It must be possible for the user to check-in at a gym;
- [x] It must be possible to validate a user's check-in;
- [x] It must be possible to register a gym;

#### Business Rules

- [x] The user must not be able to register with a duplicate email;
- [x] The user cannot make 2 check-ins on the same day;
- [x] The user cannot check-in if he is not close (100m) to the gym;
- [x] The check-in can only be validated up to 20 minutes after being created;
- [x] Check-in can only be validated by administrators;
- [x] The academy can only be registered by administrators;

#### Non-Functional Requirements

- [x] User password must be encrypted;
- [x] The application data must be persisted in a PostgreSQL database;
- [x] All data lists need to be paginated with 20 items per page;
- [x] The user must be identified by a JWT (JSON Web Token);

---

### How to run

#### Prerequisites

Before starting, you will need to have the following tools installed on your machine: [Git](https://git-scm.com/), [Node.js](https://nodejs.org/en/) and [Postgres](https://www.postgresql.org/). You can choose to run the database using [Docker/Docker Desktop](https://docs.docker.com/get-docker/).

It will also be necessary to create a .env file. You should check the [.env.template](https://github.com/emanuelmassafera/nodejs-solid-api/blob/main/.env.example).

#### Running the application

```bash
# Clone this repository
$ git clone https://github.com/emanuelmassafera/nodejs-solid-api.git

# Access the project folder via the terminal/cmd
$ cd nodejs-solid-api

# Install dependencies
$ npm install

# Run the migrations
$ npx prisma migrate dev

# Run the server
$ npm run start:dev

# The server will start at port:3333
```

---

### Author

<img style="border-radius: 50%;" src="https://avatars1.githubusercontent.com/u/65625500?s=460&u=eb9e300de61698fc8531949a451ce2f0e9da46f9&v=4" width="100px;" alt=""/>
<sub>Emanuel Massafera</sub>

<b></b>

[![Badge](https://img.shields.io/static/v1?label=&message=Emanuel&color=blue&style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/emanuelmassafera/)](https://www.linkedin.com/in/emanuelmassafera/) [![Badge](https://img.shields.io/static/v1?label=&message=emanuel301@live.com&color=0078D4&style=flat-square&logo=Microsoft-Outlook&logoColor=white&link=mailto:emanuel301@live.com)](mailto:emanuel301@live.com)

---

## License

This repository is licensed by **MIT LICENSE**. For detailed information, read the file [LICENSE](https://github.com/emanuelmassafera/nodejs-solid-api/blob/main/LICENSE). 

Made with ♥ by Emanuel Massafera :wave: [Get in touch!](https://www.linkedin.com/in/emanuelmassafera/)
