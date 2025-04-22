Dev workflow:

-   Create the controller function
-   Set up the route
-   Create the view
-   Test the feature
-   Move to the next feature

Workflow:

-   Write all routes first
-   Create empty controller functions
-   Create basic view templates
-   Implement controller logic
-   Add view details and styling

2025-04-10
Next steps:

-   Student management routes and controllers got updated: update views for student management routes/controllers to make sure that these features work end to end: create student, view student page, etc.
-   Continue to lesson management routes, build out controllers:

// Handles teacher's lesson management
module.exports = {
getNewLessonForm,
createLesson,
editLesson,
deleteLesson
}
then build out the views to test all these features. teacher can create a lesson plan for a student, view the create lesson plan form, etc.

-   then teacher can edit lesson and delete lesson
-   then teacher can edit student and delete student
-   then student can log in as student
-   student can view dashboard with lessons
-   student can view individual lessons

2025-04-11

-   view individual student page:
-   be able to add new lessons for students:
    -   display new lesson form
    -   view newly created lesson on the student's page

bigger picture:

-   rename every instance of lesson plan to lesson
-   reorganize the views to match the routes organiation? everything a teacher does is under teacher
-

2025-04-11

-   next steps:
    -   add individual lesson view
    -   clean up the date in the lesson so that what the teacher sees on the student page is just e.g., Thurs April 10 2025.
    -   make sure they are ordered by date
    -   delete all the students in the datebase because they have LessonPlans not lessons

2025-04-14

next steps:

-   clean up the date
-   add delete lessons functionality
-   delete students
-   edit lesson
-   add return to student on new lesson page

2025-04-16

-   done: add delete lessons functionality
-   todo: add student login

2025-04-17

-   done: add student login
-   todo: double check student login
-   todo: add student routes/controller/views for lessons. so how is a student's view of their own lessons different than a teachers view of that lesson
-   todo: add links on landing page for teacher login vs student login

2025-04-18

-   done: add student routes/controllers/views for lessons. a student should be able to view their individual lesson.
-   done: add links on landing page for teacher login vs student login
-   steps:
    -   add teachers and students link on landing page
    -   add login and signup routes to teachers/login, teachers/signup
    -   change the routes, do the controllers and views move places and thus update all the spots they are referenced?
    -   test to make sure the teachers still works
    -   do the same for students

2025-04-22

-   fix teacher logout button
