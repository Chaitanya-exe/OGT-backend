# OGT-backend
This is the code for the OGT backend api, which has been worked upon for a while. The project is not completed yet there still some features left to be add.

## Models
There are models or schemas for the data neccessary like user details, project details, conversation, authentication etc...

## Routes 
Routes for the various endpoints to request and recieve the data from the api.

## controllers 
The main operations on the data is done through the controllers, they are just basically functions which will take user request as an argument and perform some operation and send back the reesponse to the user.

##Authentication
The API is also equipped with JWT(jsonwebtoken) a NodeJS library to authenticate users upon login which is based on the tokenization of the login session which means less hassle on the server side to handle the login session.
