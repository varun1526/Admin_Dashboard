# Admin_Dashboard
## Table of Contents
1. Introduction
2. Installation
3. Usage
4. Project Structure
5. Json server
## Introduction
This README provides instructions for setting up an Admin Dashboard using HTML, CSS, and JavaScript, with JSON-Server for login data and basic dashboard information. This simple web application allows you to create a login system using JSON-Server as the backend to authenticate users and fetch basic dashboard information.
## Features
- User Authentication using json server.
- Display basic dashboard information.
- HTML, CSS and Javascript used for the frontend.
- Two pages
  - Login Page
  - Main Page
## Installation
1. Clone the repository to your local machine
   - git clone "git@github.com:varun1526/Admin_Dashboard.git"
2. Open terminal.
3. cd data
4. Download json-server.
   - npm install -g json-server
5. Start json-server
   - json-server --watch data.json
6. Open index.html to open the login page.
7. If new user click sign up if already have account then click sign in.
8. If new user then add data and then click.
## Usage
1. When you open the index.html, you will be presented with a login screen.
2. Use the predefined credentials (or customize the login data in db.json) to log in:
   Username: varun
   Password: varun1
3.After successful login, you will be redirected to the Admin Dashboard, displaying basic information.
4. You can customize and expand the dashboard as needed by modifying the HTML, CSS, and JavaScript files.
## Project Structure
1. index.html :- It serves as the entry point for the application and contains the overall structure and layout of the dashboard.
2. main :- It contains index.html which is admin_dashboad page
3. css :- It contains login.css which is css for login page and the main folder which consists the css file for admin_dashboard main page.
4. js :- It contains login.js which is javascript file for login page and script.js javascript file for admin_dashboard main page, add.js to add consumer and buyers, product.js to add
   products to the cart.
5. asset folder :- It contains the image used for the object.
## Working
After successful login the data is pushed to session storage and after that the page is redirected to main->index.html which uses session storage data to show data of the users. When the tab is closed and the user reopen the tab if session storage is not empty the it's redirected to main page if it's then the user has to fill the sign up or sign in page.
