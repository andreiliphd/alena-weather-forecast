# Sentiment Analysis App

## Overview
An app can make weather forecasts, get image of a city and get coordinates of the city(internally).
# Dependencies
1. Build dependencies.
```
    "express": "^4.17.1" - server for API
    "dotenv": "^8.2.0" - secret data storage
    "nodemon": "2.0.4" - online update on file change
    "webpack": "^4.35.3" - bundler
    "webpack-cli": "^3.3.5" - CLI for bundler
    "js-datepicker": "5.16.0", - date frontend functionality
    "axios": "0.20.0" - http and https requests

```
2. Production dependencies.
```
    "@babel/core": "^7.12.3" - JavaScript compiler
    "@babel/preset-env": "^7.12.1" - JavaScript compiler presets
    "babel-loader": "^8.2.1" - loader for JavaScript files
    "css-loader": "^5.0.1" - loads css
    "del-webpack-plugin": "1.2.0" - deletes dist folder before build
    "html-webpack-plugin": "^3.2.0", - handles html
    "jest": "^26.6.3" - JavaScript testing framework
    "mini-css-extract-plugin": "^0.9.0" - exctracts CSS
    "node-sass": "^5.0.0", - SASS compiler
    "optimize-css-assets-webpack-plugin": "^5.0.4" - css optimizer
    "sass-loader": "^10.1.0" - SASS loader
    "style-loader": "^2.0.0" - loads styles
    "terser-webpack-plugin": "^1.4.5" - JavaScript minifier
    "webpack-dev-server": "^3.11.0" - development server for WebPack
    "webpack-hot-middleware": "^2.25.0" - hot reaload and recompile of WebPAck
    "workbox-webpack-plugin": "^5.1.4" - Service Worker setup for WebPack
    "supertest": "6.0.1" - Node JS testing framework

```
## Instructions
1. Install NodeJS.
```
sudo apt install nodejs
```
2. Install npm.
```
sudo apt install npm
```
3. Install dependencies.
```
npm install
```
4. Build.
```
npm run build
```
4. Run in Web Development Mode.
```
npm run dev
```
5. Run in Production Mode.
```
npm run start
```
6. You can run Unit Tests.
```
npm run test
```

## Comments
Optional requirement:
```
Instead of just pulling a single day forecast, pull the forecast for multiple days.
```