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

## Schools

| Method | Endpoint | Params | Description |
| :----- | :------- | :----- | :---------- |
| GET | /school | / | Retrieve all schools  |
| GET | /school | /:id | Retrieve selected school |
| POST | /school | / | Add new school |
| PUT | /school | /:id | Update school data |

To add/edit school pass Object in params
```json
{
    "ok": <0/1>, //default: 0
    "checked": <0/1>, //default: 0
    "name_full": <string>,
    "name_colloquial": <string>,
    "type": <string>,
    "address": <string>,
    "woj": <string>,
    "city": <string>,
    "website": <string>,
    "contact": <string>
}
```

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
    "checked": <0/1>, //default: 0
    "school_id": <number>,
    "name_first": <string>,
    "name_last": <string>
}
```

## Teacher Facts

| Method | Endpoint | Params | Description |
| :----- | :------- | :----- | :---------- |
| GET | /teacher_facts | /:id | Retrieve specific fact |
| GET | /teacher_facts | /teacher/:teacher_id | Find facts by teacher id |
| GET | /teacher_facts | /user/:user_id | Find facts by user id |
| GET | /teacher_facts | /uid/:uid | Find fact history by uid |
| POST | /teacher_facts | / | Add new fact to teacher |

To add fact pass Object in params
```json
{
    "ok": <0/1>, // default: 0
    "checked": <0/1>, //default: 0
    "uid": <string>, //default: generated
    "teacher_id": <number>,
    "table": <powiedzenie/ciekawostki/inne>,
    "content": <string>,
    "user_id": <number>
}
```

## Teacher Info

| Method | Endpoint | Params | Description |
| :----- | :------- | :----- | :---------- |
| GET | /teacher_info | /:id | Retrieve specific info |
| GET | /teacher_info | /teacher/:teacher_id | Find all info by teacher id |
| GET | /teacher_info | /user/:user_id | Find info added by user id |
| POST | /teacher_info | / | Add new info to teacher |

To add info pass Object in params
```json
{
    "ok": <0/1>, // default: 0
    "checked": <0/1>, //default: 0
    "teacher_id": <number>,
    "property": <string>,
    "value": <string>,
    "user_id": <number>
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

When adding records API return id in "data".