import {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Select from 'react-select';

import '../components.scss';
import "./calendar scsses/styles.scss"; //Just how to style it ya know?

const CreateEvent = () => {
    const [eventData, setEventData] = useState(
        {
            subject: '',
            body: {
              contentType: 'HTML',
              content: ''
            },
            start: {
                dateTime: '',
                timeZone: ''
            },
            end: {
                dateTime: '',
                timeZone: ''
            },
            location: {
                displayName: ''
            },
            reminderMinutesBeforeStart: null,
            attendees: [],
            isOnlineMeeting: false
          });

    const [selected, setSelected] = useState({}); //This determines what has and hasn't been selected yet with the people involved

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const calendar_connections = useSelector((state) => state.calendar.connected_people); //These are your contacts on outlook with their names and emails
    const errors = useSelector((state) => state.errors.error);

    const hasRenderedRef = useRef(false); //This determines if it's been rendered yet so we don't risk navigating on render

    useEffect(() => {
        //Navigates to the index page on the change of searched_customers
        if (hasRenderedRef.current === true && Object.keys(errors).length === 0){
            navigate("/calendar");
        };
        
    }, [errors, navigate]);
   
    const handleSubmit = (e) => {
        //Handles submitting the form
        e.preventDefault();
        hasRenderedRef.current = true;
        // dispatch(searchCustomers(customer, selected, workerContacts.tables_ordered_by_customer))
        
    }

    const handleChange = (e) => {
        //Handle change for all elements that aren't the Select component
        const newKey = e.target.id;
        const newValue = e.target.value;
        if (newKey === "reminderMinutesBeforeStart" && newValue === "Default"){
            // We leave nothing here since we want nothing to happen here
        }
        else{
            setEventData(oldState => ({ ...oldState, [newKey]: newValue}));
        }
    }

    const handleSelect = (e) => {
        //Handle change for the Select component
        setSelected(e);
    }
    return(
        <>
            <h1>Search</h1>
            <form id="event_creation_form" onSubmit={handleSubmit}>
                <label>
                    Add a title:
                    <input type="text" defaultValue={eventData.subject} id="subject" onChange={e => handleChange(e)}></input>
                </label>
                <label>
                    Invite Attendees: 
                    {/* <input type="text" defaultValue={eventData.contact_name} id="contact_name" onChange={e => handleChange(e)}></input>
                     */}
                     {/* Here we will use the suggested search component to search for users based on your contacts */}
                </label>

                <label>
                    What times?: 
                    {/* <input type="text" defaultValue={eventData.contact_name} id="contact_name" onChange={e => handleChange(e)}></input>
                     */}
                     {/* Here we will use the date picker component to set the times and have a switch component to set all day or not */}
                </label>
                <label>
                    Location:
                    <input type="text" defaultValue={eventData.location.displayName} id="location" onChange={e => handleChange(e)}></input>
                </label>

                <label>
                    Remind me: 
                    <select id="reminderMinutesBeforeStart" onChange={e => handleChange(e)} defaultValue={'Default'}>
                        <option value="Default"> Don't remind me </option>
                        <option value="0">At time of event</option>
                        <option value="15">15 minutes before</option>
                        <option value="30">30 minutes before</option>
                        <option value="60">1 hour before</option>
                        <option value="120">2 hours before</option>
                        <option value="720">12 hours before</option>
                        <option value="1440">1 day before</option>
                        <option value="1440">1 day before</option>
                        <option value="10080">1 week before</option>
                    </select>
                </label>

                <label>
                    Description:
                    <input type="textarea" defaultValue={eventData.body.content} id="body_text" onChange={e => handleChange(e)}></input>
                </label>

            <button type="submit" onClick={e => handleSubmit(e)} className="submit_new_button">Submit</button>
            </form>
        </>
    )
}

export default CreateEvent;



