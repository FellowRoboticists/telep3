telep3
-----------

This is version 3 of the telep server. This particular version is developed
using the MEAN Stack (Mongo, Express, Angular2 and Node).

It is intended to be a complete rewrite of the internet-side of the minion 
control system. This will a far more complete implementation than the earlier
web page was for controlling minion.

I'm very excited.

Installing and Running
======================

I'm going to assume you have Node.js, Mongo, etc installed.

Just do the following to get going:

1. Clone this repository
2. Change your current directory to the root of meanStackSPA
3. Pull in the required NPM modules (npm install)
4. Pull in the required bower components (bower install)
5. Run gulp to prep the front-end code for deliver (gulp or gulp watch)
6. Seed the database with a user (scripts/addUsers.js)
6. Start the server (DEBUG=telep:* npm start)
7. Play with the application.

The default user seeded above has the following credentials:

    email: user1@mail.com
    password: Pass1234

Feel free to play around.

Also, feel free to fork and send pull requests. I can use all the help I can get.
