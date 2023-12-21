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

## Users

| Method | Endpoint | Params | Description |
| :----- | :------- | :----- | :---------- |
| GET | /user | / | Retrieve all users |
| GET | /user | /:id | Retrieve selected user |
| POST | /user | / | Create new user account |
| PUT | /user | /:id | Update user |
| DELETE | /user | /:id | Closer user account |

To add user pass Object in params
```json
{
    "firebase_uid": <text>,
    "nick": <text>,
    "email": <text>,
    "type": <user/superuser/admin>, // default 'user'
}
```

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
| GET | /teacher | /search/:searchQuery | Find teachers where name or fact matches searchQuery |
| POST | /teacher | / | Add new teacher |
| DELETE | /teacher | /:id | Delete teacher account ;) |

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

## Teacher Comments

| Method | Endpoint | Params | Description |
| :----- | :------- | :----- | :---------- |
| GET | /teacher_comment | /:id | Retrieve specific comment |
| GET | /teacher_comment | /teacher/:teacher_id | Find comment by teacher id |
| GET | /teacher_comment | /user/:user_id | Find comment by user id |
| GET | /teacher_comment | /uid/:uid | Find comment history by uid |
| POST | /teacher_comment | / | Add new comment to teacher |

To add comment pass Object in params
```json
{
    "ok": <0/1>, // default: 0
    "checked": <0/1>, //default: 0
    "uid": <string>, //default: generated
    "teacher_id": <number>,
    "content": <string>,
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
    "user_id": <number>,
    "amount": <number>,
    "status": <await/approved/rejected>, // default 'await'
    "table_index": <string>,
    "table_id": <number>
}
```

## CLicks

| Method | Endpoint | Params | Description |
| :----- | :------- | :----- | :---------- |
| GET | /clicks | / | Retrieve clicks count |
| GET | /clicks/teacher | /:teacher_id | Retrieve all clicks assign to teacher |
| GET | /clicks/school | /:school_id | Retrieve all clicks assign to school |
| GET | /clicks/user | /:user_id | Retrieve all clicks assign to user |
| POST | /clicks | / | Create a new clicks record |

To add point pass Object in params
```json
{
    "teacher_id": <number>,
    "school_id": <number>,
    "user_id": <number>,
}
```

When adding records API return id in "data".