Need to work on making the errors in the controllers more robust (like actually throwing error codes) so that the errors are properly accounted for

## Frontend:

- General
    - Need to make a NavBar
    - Need to setup Redux persist and navigation in general
    - Admin rights
    - Need to make route names
    - Need to beef up our validators so that people can't change things with inspect element
    - Need to make error stuff better

- Contacts
    - Index
        - Done!
    - New
        - Need to get rid of errors on page change (only did it for contacts, need to also do it for the other two)
    - Show 
        - Need to make sure that you can only change notes if you have rights (are an admin or are working on it)
        - Need to setup notes saving/displaying (update)
            - Instead of having backend return an updated notes, we could just update notes on our own on the frontend in redux so that it's essentially the same thing
        - Need to timestamp notes
            - Here's what I'm thinking: Instead of doing the save on every change, we just have a submit button so that we can properly time stamp things, but we also save what they have in session so that it doesn't get lost if page reloads or whatever (maybe a cookie
            I don't know the difference yet)
        - Destroy needs to work as well

- Workers
    - Need to work on all of it (based on how long contacts took, it shouldn't be too long)

Back end:

- Contacts
    - Update
        - Need to ensure route is correct (what with :id and whatever)