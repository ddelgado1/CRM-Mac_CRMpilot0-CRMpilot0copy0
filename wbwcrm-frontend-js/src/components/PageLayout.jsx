import { useRef, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { Link, Outlet } from 'react-router-dom';
import { getContacts, deleteContactErrorsAndRevertSearchedCustomers } from '../actions/contact.js';
import { deleteWorkerErrors, setCurrentWorker } from '../actions/worker';
import { deleteCalendarErrors } from "../actions/calendar";
import { useDispatch, useSelector } from 'react-redux';
import { useMsal } from "@azure/msal-react";
/**
 * Renders the header with a sign in/out button as well as all of the page links
 */
export const PageLayout = (props) => {
    const dispatch = useDispatch();
    const workers = useSelector((state) => state.workers);

    const userIsInSystemRef = useRef(false); // Even if the user has an account within the allowances of what we have for microsoft, we will use this to determine if they are valid (as in they are saved to the database). If not, we won't render anything

    const isAuthenticated = useIsAuthenticated();
    //The eslint thing is here since we don't need instance and I don't want the whole warning thing
    //eslint-disable-next-line
    const { instance, accounts } = useMsal();
    
    useEffect(() => {
        //This useEffect's purpose is to determine if the user with the username of the person signing in is valid
        if (workers.workers.length !== 0 && accounts.length !== 0 && Object.keys(workers.current_worker).length === 0){
            const findWorker = workers.workers.filter(worker => worker.email === accounts[0].username)
            if (findWorker.length !== 0){
                userIsInSystemRef.current = true;
                dispatch(setCurrentWorker(findWorker[0]))
            }
        }
    }, [accounts, workers, dispatch])

    const handleClick = (e) => {
    //To delete errors on page change and reset contacts
        dispatch(deleteContactErrorsAndRevertSearchedCustomers());
        dispatch(deleteWorkerErrors());
        dispatch(deleteCalendarErrors());
        dispatch(getContacts());
    }
    return (
        <>
        { isAuthenticated && userIsInSystemRef.current ?
        <div>
            <Navbar bg="primary" variant="dark">
                <div className="app_header">
                    <h3><Link to="contacts" onClick={e => handleClick(e)}>View All Customers</Link></h3>
                    <h3><Link to="calendar" onClick={e => handleClick(e)}>View Calendar</Link></h3>
                    {workers.current_worker.admin === 1 && <h3><Link to="new_contact" onClick={e => handleClick(e)}>Create a New Customer</Link></h3>}
                    <h3><Link to="search" onClick={e => handleClick(e)}>Search Customers</Link></h3>
                    {workers.current_worker.admin === 1 && <h3><Link to="new_worker" onClick={e => handleClick(e)}>Add a New Worker</Link></h3>}
                    <h3 id="sign_out_button"><SignOutButton /></h3>
                </div>
            </Navbar>
            <Outlet />
        </div>
                : 
        <div>
            <Navbar bg="primary" variant="dark"><SignInButton /></Navbar>
            {userIsInSystemRef.current ? <p>Welcome to the WBW CRM! Please sign in</p> : <p>You are not within this system and as such are not elligible to use this site</p>}
        </div>
        }
            <br />
            <br />
            {props.children}
        </>
    );
};

