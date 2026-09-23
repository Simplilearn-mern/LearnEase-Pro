LearnEase Pro

Created by Gayatri Singh

LearnEase Pro is a role-based learning management application that supports Admin, Faculty, and Learner workflows.

Technologies Used

React

Node.js

Express.js

JavaScript

Vite

MongoDB / Database used by the application

Project Structure
LearnEase-Pro/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── client/
│   ├── package.json
│   ├── package-lock.json
│   ├── src/
│   ├── public/
│   └── ...
│
├── .gitignore
└── README.md

Application Setup
1. Start the Backend

Open a terminal and navigate to the backend folder:

cd backend


Install the dependencies:

npm install


Start the Node.js server:

nodemon server.js


Keep the backend terminal running.

2. Start the Frontend

Open another terminal and navigate to the client folder:

cd client


Install the dependencies:

npm install


Start the React application:

npm run dev


Open the URL displayed by Vite in your browser.

External User Workflow

External users can sign up and log in to the application.

After successful login, users are redirected based on their assigned role.

Learners can view available course details and access only the features permitted for their account.

Admin Workflow

Admin users are redirected to the Admin Dashboard after login.

Admins can:

Add new courses.

Update existing courses.

Delete courses.

View faculty details.

View learner details.

Approve or reject learner course access requests.

Faculty Workflow

Faculty users are redirected to the Faculty Dashboard after login.

Faculty members can:

View course details.

View assigned courses.

Update course information.

Learner Workflow

Learners can:

Create an account and log in.

View available course details.

Request access to courses.

Check course request status.

Access approved courses.

Provide feedback and ratings for courses.

Course Access Request Workflow

The learner selects a course and sends a course access request.

The request status is displayed as:

Pending

Approved

Rejected

The admin reviews the request.

The admin approves or rejects the request.

The learner can view the updated request status.

Approved learners can access the course.

Rejected learners can only view the rejected status.

Feedback and Rating Workflow

Learners who have access to courses can submit:

Course feedback.

Course ratings.

Feedback and ratings are stored and displayed with the respective course details.

Troubleshooting

If an error occurs while testing the application:

Create a new user account.

Add a new course.

Create a new course access request.

Test the workflow again.

Development Commands
Backend
cd backend
npm install
nodemon server.js

Frontend
cd client
npm install
npm run dev

Author

Gayatri Singh
