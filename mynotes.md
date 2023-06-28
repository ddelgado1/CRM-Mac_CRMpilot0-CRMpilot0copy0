<<<<<<< HEAD
Need to fix it so that it doesn't ask the user for their name, just does that through outlook

Add the functionality for the admin to add new people to accounts

calendar function 

Drop downs for sections we don't need
=======
## Frontend:

- General
    - Update redux to toolkit
    - For database.js in /wbwcrm-backend/util, need to make an environment variable for password rather than having it in plaintext

- Contacts
    - Index
        - Done!
    - New
        - Done!
    - Show 
        - Gotta make it so that the current customer is saved in session so we don't need to worry about them reloading the page and having it be blank
    - Search 
        - Done!

- Workers
    - Done!

- Calendar
    - Just have to do the create event thing then we're done!
    - Also need to implement recurring events in my calendarDisplay component!

Back end:

Done!
>>>>>>> d2dc2fe594b5583649d3d98e47ef173b886419a5

Things to do:

First thing is that right now, we need to switch it up from admin of DB to admin of groups that Danny set up. In doing so, we will essentially make having users be a moot point. As such, we should set it up so that the DB for the backend workerContacts gets sent the Azure user id for the join table rather than the DB table id. Ultimately, the goal is to make the DB only have two tables: customers and worker customers
Design:


Others:

    - Make it so that on login, it automatically reloads to home page instead of current page

    - Make the calendar work




Notes for dad:

- Ask about the abbreviations