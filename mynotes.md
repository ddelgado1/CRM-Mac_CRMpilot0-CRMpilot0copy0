Need to work on making the errors in the controllers more robust (like actually throwing _**proper**_ error codes) so that the errors are properly accounted for
Also need to make it so that we have a proper join table with cascading (most likely) (need to figure out how to get this working [probably stack exchange])

## Frontend:

- General
    - Update redux to toolkit
    - Admin rights
    - Need to beef up our validators so that people can't change things with inspect element
    - Need to make error stuff better

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
    - Done with the stuff that isn't microsoft related

- Calendar
    - Need to work on all of it

Back end:

- Workers
    - Done with the stuff that isn't microsoft related

- Calendar
    - All of it

So for the calendar and login, we just use microsoft toolkit to make the easy thing. For adding events, we need to make our own page that makes calls to the backend where we use the api to do this
Now that I have access to the calendar (which we should put in its own component), we just need to make a means of adding new events