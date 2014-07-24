breeze-mongo-demo
=================

A simple app demonstrating Breeze.js integration with Node.js and MongoDB

I have been experimenting with Breeze.js for some time now, but always with ASP.NET/Entity Framework. I wanted to see how well it would work with some of the other backend technologies it claims to support. So, here's a really simple example using a Node.js and MongoDB backend. Enjoy!


Running the app
---------------

1. Unzip the demo database files or create your own
2. Make sure you have MongoDB and Node installed
3. Run the database
  - Assuming you put the database files in a folder called "database": ```mongod --dbpath database```
4. Run the Node server: ```node server/server.js```
5. Open up a browser and hit ```localhost:3000```, or whatever port you specify in ```server.js```
