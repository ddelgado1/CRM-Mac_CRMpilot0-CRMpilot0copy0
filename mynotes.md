Need to work on making the errors in the controllers more robust (like actually throwing error codes) so that the errors are properly accounted for

## Frontend:

- General
    - Need to make a NavBar
    - Need to setup Redux persist and navigation in general
    - Admin rights
    - Need to make route names
    - Need to beef up our validators so that people can't change things with inspect element

- Contacts
    - Index
        - Done!
    - New
        - Done!
    - Show 
        - Need to make sure that you can only change notes if you have rights (are an admin or are working on it)
        - Need to fix the contactreducer so that the notes can change
        - Need to get the for loop working within the return statement (don't include notes since it's separate)
        - Destroy needs to work as well

    - Actions
        - Need to make it so that we only push location on successful dispatch

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