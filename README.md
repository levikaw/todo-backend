# ToDo-backend service

## Description
 
The service is a classic RESTfull API NestJS-application 

The service provides:

- user authorization using JWT access-token
- сreating and updating tasks
- getting all the tasks
- сreating users with `user` role 
- the user with the `admin` role is available in the app with **login:** `admin` and **password:** `admin`

Swagger documentation is available on `/api-docs` path

## For the first start 

1) copy `.env.example` and rename to `.env` (fill if needed)
2) run following cmd

*require docker
```bash
$ npm install
$ docker compose up -d
```

## Running the app

```bash
$ npm run start:dev
```
