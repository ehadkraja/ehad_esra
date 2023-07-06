# Project
## Author: Ehad Kraja & Esra Durovi
**Postman** url: https://elements.getpostman.com/redirect?entityId=28386942-ea53395f-9ef9-4726-aa90-626250d1e3d8&entityType=collection
<br>

**Domain:** localhost:3000<br>
**Admin Postgres:** localhost:3001


Main File is server js where the project starts. 
Docker consists of 3 containers: **app** (nodejs + expressjs), **db**(Postgres) and **db_admin**(postgres admin)

For the database we’ve created 2 tables one for users and another one for observations.
When the docker starts it copies the **database.sql** file into the db container and runs it automatically on start

There are two roles: admin and normal user both secured with jwt token
The JWT token stores the infos of the logged in user.

There are 2 files which store admin and user routes
These routes make sure that the user calling these APIs has the access

The DB querys are all in the file **db/querys.js**

To run the project you need to have docker installed.

Clone the repo and then execute<br>
```
docker-compose up -d
```
<br>

This will download the images and build them. After that will install the node_modules.
It will create the 3 containers mentioned above.

In postman all the data are send as body json and using the bearer token
