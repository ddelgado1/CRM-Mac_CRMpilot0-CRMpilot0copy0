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

Design:

- First we need to make it look good. That's our number one job
    - Remake the show page for contacts to be a table so that we can style it more easily

Others:

    - Make it so that on login, it automatically reloads to home page instead of current page
    - Change it so that you don't need to input name for user (since we already have a means of putting it in based on their email then getting that user.)

    - Set up a profile page for the workers

    - Make the calendar work


The problem that Danny was having was because he changed the DB password. The new issue, though, is if you sign in as someone not in the system, if you then switch to someone who is, you're still not allowed in. 

