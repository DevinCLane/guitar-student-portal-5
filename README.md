# Guitar Student Portal

A application for guitar teachers to manage their students, create lesson plans, and share lesson plans with their students

## API design

## Routes

### Teacher Dashboard

| Method | Path                  | Description                                |
| ------ | --------------------- | ------------------------------------------ |
| `GET`  | `/teachers/dashboard` | View teacher's dashboard with all students |

### Student Management

| Method   | Path                                | Description                     |
| -------- | ----------------------------------- | ------------------------------- |
| `GET`    | `/teachers/student/:studentId`      | View individual student profile |
| `GET`    | `/teachers/student/new`             | Display add student form        |
| `POST`   | `/teachers/student`                 | Create new student              |
| `GET`    | `/teachers/student/:studentId/edit` | Display edit student form       |
| `PUT`    | `/teachers/student/:studentId/`     | Update student                  |
| `DELETE` | `/teachers/student/:studentId`      | Delete student                  |

### Lesson Management

| Method   | Path                                                 | Description              |
| -------- | ---------------------------------------------------- | ------------------------ |
| `GET`    | `/teachers/student/:studentId/lesson/new`            | Display new lesson form  |
| `POST`   | `/teachers/student/:studentId/lesson`                | Create new lesson        |
| `GET`    | `/teachers/student/:studentId/lesson/:lessonId`      | View individual lesson   |
| `GET`    | `/teachers/student/:studentId/lesson/:lessonId/edit` | Display edit lesson form |
| `PUT`    | `/teachers/student/:studentId/lesson/:lessonId`      | Update lesson            |
| `DELETE` | `/teachers/student/:studentId/lesson/:lessonId`      | Delete lesson            |

Same as above, but shown by resource hierarchy:

```
/teachers
    /dashboard
    /student
        /new
        /:studentId
        /:studentId/edit
        /:studentId/lesson
            /new
            /:lessonId
            /:lessonId/edit
```

## Installation instructions

`npm install`

---

## Things to add

-   Create a `.env` file in config folder and add the following as `key = value`
    -   PORT = 2121 (can be any port example: 3000)
    -   DB_STRING = `your database URI`
    -   CLOUD_NAME = `your cloudinary cloud name`
    -   API_KEY = `your cloudinary api key`
    -   API_SECRET = `your cloudinary api secret`

---

## Run

`npm start`
