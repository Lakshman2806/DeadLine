# Deadline Helper
A basic mern app that was made while trying to learn MERN stack. Until now it just stores user specific deadlines and displays them. It also has a login and register page. U can also delete, edit, and add deadlines.
## Requirements and installation
clone the repository or download it and first run 
```
npm install
```
 and then cd into the server
```
npm install
```

## Running the app
to run the app cd into the server and run
```
npm start dev
```
and then cd back into the client and run
```
npm start
```

## Technologies used
* React
* Node
* Express
* MongoDB and mongoose for the database
* jwts for authentication
* bcrypt for password hashing
* react-router-dom for routing
* react-bootstrap for styling
* react context api for state management
* react hooks for state management

## TODO
* improve the styling and UI
* ~~add a calendar to display deadlines~~ Improve the CSS of the calendar
* ~~show deadlines in order of their due date and progress made till now~~ Now shows the deadlines in order of (100 - progress)/days left. Would do a better algorithm later
* ~~add a progress bar for each deadline~~ Did a custom one, for some reason the bootstrap one was not working


## BUGS 
* After one edit the form gets cleared. and another edit after that breaks the deadline
  Possible fixes:
    1. make a global context for it, so it can be accessed through different files or something like that
  2.Maybe just not clear the form and try to keep the contents intact (will try to do this)
