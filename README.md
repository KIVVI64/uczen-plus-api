# uczen-plus-api
Restful API to manipulate Uczeń+ database

Based on: [node-mysql-crud-app](https://github.com/rahulguptafullstack/node-mysql-crud-app)
by: Rahul Gupta

## Run Locally

In *config* folder copy *credential-template.js* and create *credential.js* file with correct data.


Install dependencies in the project directory

`npm install`

Then start the server

`npm start` OR `nodemon start` OR `node server.js`

App is now running at [http://localhost:5000](http://localhost:5000) in the development mode.


# Endpoints

https://**kivvi.iqhs.pl/uczen-plus-api/v1**

## Teachers

| Method | Endpoint | Params | Description |
| :----- | :------- | :----- | :---------- |
| GET | /teacher | / | Retrieve all teachers  |
| GET | /teacher | /:id | Retrieve selected teacher |
| GET | /teacher | /school/:school_id | Find teacher by school id |
| POST | /teacher | / | Add new teacher |

To add teacher pass Object in params
```json
{
    "ok": <0/1>, // default: 0
    "school_id": <number>,
    "name_first": <string>,
    "name_last": <string>
}
```

## Points

| Method | Endpoint | Params | Description |
| :----- | :------- | :----- | :---------- |
| GET | /point | /:user_id | Retrieve all user points |
| POST | /point | / | Create a new points record |
| PUT | /point | /:id | Update a point status |

To add point pass Object in params
```json
{
    "user_id": <user_id>,
    "amount": <number>,
    "status": <await/approved/rejected>, // default 'await'
    "table_index": <string>,
    "table_id": <number>
}
```