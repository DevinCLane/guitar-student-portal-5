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

bigger picture:

-   rename every instance of lesson plan to lesson
-   reorganize the views to match the routes organiation? everything a teacher does is under teacher
-
