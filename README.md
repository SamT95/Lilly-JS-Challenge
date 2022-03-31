# Javascript Recruitment Task

Javascript recruitment task

## Introduction

This takehome task was developed in order to test the basic skillset of a JavaScript developer.

The task consists of backend and frontend functionalities.

You aren’t expected to spend more than 30-60 minutes on this task (we respect your time, you don’t have to complete the task).

You are free to use the internet but must solve this task yourself.

During your interview you will be asked to present (in any way you like) your thought process on how you when about completing this task.

## How to use

Install Git and NodeJS on your system.

Create a repo in your github account (do not fork via github!).

Then clone the contents of this repo into it:
```sh
git clone https://github.com/ethull/recruitment-js-challenge.git
cd recruitment-js-challenge
git remote rename origin upstream
git remote add origin https://github.com/your_github_account/your-repo.git
git push -u origin
```

Install backend dependencies with npm.

Run the backend service, and serve static files with npm.

Once complete share your github repo url with your company contact.

Then prepare whatever method you would like to present.

## The application

The goal of the application is to display how stock prices change over time.

In this starter template you get:
* A backend application written in `node.js` that serves information about stocks (for the last 10 hours).
* A frontend template that renders an empty chart and static spinner.

Getting stock data has a **10% chance of failure** (by design). The application needs to account for that.

## Mission objectives

* Make the spinner rotate using CSS3.
* Query the backend for list of available stocks.
* Query the backend for data about each stock.
* Hide the spinner after all data is loaded.
* Log to the console the result stock data in a structured way.
* Fix backend (app.js) to return a meaningful error message when stock data cannot be retrieved (now the request just hangs!).

Additional (if you have time)
* Plot the stock data on the chart (as a line chart).

## Constraints

* You are **not** to modify the code in `stocks.js`
* The stocks API is designed to return errors sometimes. The application should gain the ability to cope with that.
* You can use the provided mini-API for canvas operations, but you can also use other solution.
