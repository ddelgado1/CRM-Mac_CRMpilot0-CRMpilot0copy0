Need to work on making the errors in the controllers more robust (like actually throwing _**proper**_ error codes) so that the errors are properly accounted for
Also need to make it so that we have a proper join table with cascading (most likely) (need to figure out how to get this working [probably stack exchange])

## Frontend:

- General
    - Update redux to toolkit
    - Need to make error stuff better
    - Need to beef up our validators so that people can't change things with inspect element (need to figure out what this means lol)
    

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
    - Just have to do the create event thing then we're done!
        - My concern with this is that it doesn't make sense from a functionality standpoint. It is way easier to just go to the outlook website and create the event there. I can, I guess, comprehend having the calendar there but I just don't 
        think my website will be more efficient than just opening a new tab