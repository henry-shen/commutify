Commutify is an app that displays real-time trip updates and real-time vehicle locations for transport modes in Sydney, Australia. Currenty it supports the Sydney Metro and T9 train lines.

## Getting started 

1. Clone the repo
```
$ git clone https://github.com/henry-shen/commutify.git
$ cd commutify
```
2. Start client development server
```
$cd client
Create a .env file.
Paste the following line:
REACT_APP_GOOGLE_API_KEY='[GOOGLE MAPS API KEY]'
Replace [GOOGLE MAPS API KEY] with an API key from Google Maps.
```
3. Start client development server
```
$ cd client
$ npm install
$ npm start
```
4. Start server development server
```
$ cd back-end
$ npm install
$ nodemon
```

## Client side built with

* [React](https://reactjs.org) - Front end library for building user interfaces

## Server side built with 
* [Express](https://expressjs.com/) - Next generation framework for node.js
* [mongoDB](https://docs.mongodb.com) - cross-platform document-oriented NoSQL database
* [mongoose](https://mongoosejs.com/) - mongoDB object modeling tool designed to work in an asynchronous environment

## API USED: 
  * [GoogleMaps], [OpenDataHub{https://opendata.transport.nsw.gov.au/}]
  

## Developers

* Henry shen - [GitHub](https://github.com/henry-shen) - [LinkedIn](https://www.linkedin.com/in/henry-shen/)