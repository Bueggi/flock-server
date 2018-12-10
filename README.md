# Flock - Backend
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

## Introduction
Planning trips has never been easier before. Flock is the easiest way organizing trips as a group. Every member of a trip can make suggestions on three categories: Destination, Budget, Timeframe. Everyone can vote for their favorite option. As soon as the decision is made the creator can lock the voting. Any need to discuss? With the help of the chat feature communication is centralized in the app.

## Screenshots
<img src="https://github.com/Bueggi/flock-server/blob/master/first.jpg" />

## Installation
1. Clone the repo to your local machine
``` 
git clone https://github.com/Bueggi/flock-server.git
```
2. Install all dependencies
```
cd flock-server
npm i
```
3 Create a new `.env` file in the root folder and include following properties with your own values.
Read <a href="https://developers.facebook.com/docs/facebook-login/web">here</a> how to create a Facebook app and get own credentials.
```
FACEBOOK_APP_ID=''
FB_APP_SECRET={''}
FACEBOOK_CALLBACK=''
```
4. To start the server run `npm run dev`

## Tech stack
<img src="https://github.com/Bueggi/flock-server/blob/master/techstack.png" />
* <a href="https://graphql.org/">GraphQL</a>
* <a href="https://www.apollographql.com/docs/apollo-server/">Apollo Server</a>
* <a href="https://www.mongodb.com/what-is-mongodb">MongoDB</a>
* <a href="https://jestjs.io/">Jest</a>

## Authors
* Marco Kunz | <a href="https://www.linkedin.com/in/marcokunz/">linkedIn</a> | <a href="https://github.com/mrcknz">gitHub</a>
* Berta Cumellas | <a href="https://www.linkedin.com/in/berta-cumellas/">linkedIn</a> | <a href="https://github.com/bertacume">gitHub</a>
* Arturo Moreira Pintos dos Santos | <a href="https://www.linkedin.com/in/arturo-moreira-santos-381a21176/">linkedIn</a> | <a href="https://github.com/artyBMPS">gitHub</a>
* Damien Derail <a href="https://www.linkedin.com/in/damien-derail-b446932a/">linkedIn</a> | <a href="https://github.com/Damien1208">gitHub</a>

## Contribution
This project is licensed under MIT license. Feel free to fork the project and open a PR for any changes.
