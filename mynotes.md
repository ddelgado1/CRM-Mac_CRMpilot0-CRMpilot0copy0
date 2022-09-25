Need to work on making the errors in the controllers more robust (like actually throwing error codes) so that the errors are properly accounted for

## Frontend:

- General
    - Need to make a NavBar
    - Need to setup Redux persist and navigation in general
    - Admin rights
    - Need to make route names

- Contacts
    - Index
        - Need to make the workers thing work (need access to DB to accomplish that)
            - Need to use the join table for that to work
        - Need to make it so that the show page renders when the button is pressed 
    - New
        - Need to make it so that category is a dropdown like workers is
        - Need to make the submit button either throw an error or route you to the page of the individual customer (as in the :id page)
    - Show 
        - Need to make sure that you can only change notes if you have rights (are an admin or are working on it)
        - Need to fix the contactreducer so that the notes can change
        - Need to get the for loop working within the return statement (don't include notes since it's separate)
        - Destroy needs to work as well

    For the most part, contacts is looking great. There's a few final things I need to get figured out but it should be done very soon

- Workers
    - Need to work on all of it (based on how long contacts took, it shouldn't be too long)

Back end:

- Contacts
    - Create
        - Need to make sure notes gets initiated on creation
        - Need to actually get it to work (wasn't uploading to DB for some reason)
        - Need to also make sure join table gets updated so that we can utilize that information (kinda seperate since we 
        wanna make that logic work on the join table itself so we should make it its own controller maybe)
    - Update
        - Same as create with it actually uploading