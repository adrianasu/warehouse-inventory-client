# The Warehouse Caddy
This application will help you manage and keep track of your products, 
tools or equipment in your workplace, school or warehouse. It will provide you
the location of your items inside your warehouse and the responsible person's 
information when the item's been checked out.
An item's check-out and check-in transactions are as simple as entering the item's
barcode and the employee id of the person responsible for the item.
This app includes search tools to easily find your items within your database,
lists of all items, available items, checked out items, a useful life report
and a low stock report in the case of consummables.
Try the demo and find out how easy it will be to manage your items. You'll
see there are different user's levels that will authorize a person to get
different information and execute different actions too.

## Link to app
Visit [TheWarehouseCaddy](https://warehouse-caddy.herokuapp.com/start) now.

## Screenshots
### Splash Page:
Contains demo information. You'll be directed here everytime you 
click on "Info" or "Log Out" in the menu.  
Select a user level at the bottom of the page to be auto logged-in under 
that level.

<img src="/screenshots/landing-page.jpg" width="350">

<img src="/screenshots/select-user.jpg" width="350">

### Basic User Level:
At this level, no account is needed. This user will be able to read lists
with all the items and with available items. He is allowed to use the 
search and advanced search tools.

<img src="/screenshots/basic.jpg" width="350">

<img src="/screenshots/search.jpg" width="350">

<img src="/screenshots/advanced-search.jpg" width="350">

<img src="/screenshots/list.jpg" width="350">

### Overview User Level:
When a person creates an account, this is the user level she gets.  
This user can view her account which contains the list of items
that is currently responsible for.  

<img src="/screenshots/overview.jpg" width="350">

<img src="/screenshots/my-account.jpg" width="350">


### Public User Level:
This user level can be granted only by another user holding a public  
or admin level.   
This user is allowed to read all the information (items, products,   
categories, manufacturers, employees and users) and all the necessary reports
to manage the warehouse. He is authorized to create and to update all that
information. He is also allowed to execute checkin and checkout transactions
of items and view other people's accounts.

<img src="/screenshots/public.jpg" width="350">

<img src="/screenshots/checkin.jpg" width="350">

<img src="/screenshots/account.jpg" width="350">

<img src="/screenshots/manage.jpg" width="350">

<img src="/screenshots/reports.jpg" width="350">

### Admin User Level:
Only another admin user can grant someone this level. This user has all  
permissions to read, create, update and delete all the information  
included except for updating other users' information.  

<img src="/screenshots/admin.jpg" width="350">

<img src="/screenshots/delete.jpg" width="350">

## Environment Setup
React, Node.js, Express, MongoDB, Mongoose and CSS.

## Features
* Provide the location of an item inside a warehouse.
* Provide information of the person responsible for an item when it was checked out.
* Create user account.  
* Log in using employee ID, email and password.  
* The system is configured to store and manipulate information about the app users, 
  the people that will be allowed to do checkout or checkin of the items, and other 
  information as needed including the complete description of the items.  
* Display different information and allow different actions (create, update, delete) 
  depending on the user's level.  

## Author
Adriana Suarez

