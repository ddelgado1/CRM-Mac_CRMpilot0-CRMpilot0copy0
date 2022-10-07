import Navbar from "react-bootstrap/Navbar";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { Link } from 'react-router-dom';
import { getContacts, deleteContactErrorsAndRevertSearchedCustomers } from '../actions/contact.js';
import { deleteWorkerErrors } from '../actions/worker';
import { useDispatch } from 'react-redux';
/**
 * Renders the header with a sign in/out button as well as all of the page links
 */
export const PageLayout = (props) => {
    const dispatch = useDispatch();
    const isAuthenticated = useIsAuthenticated();
    

    const handleClick = (e) => {
    //To delete errors on page change and reset contacts
        dispatch(deleteContactErrorsAndRevertSearchedCustomers());
        dispatch(deleteWorkerErrors());
        dispatch(getContacts());
    }
    return (
        <>
        { isAuthenticated ?
            <Navbar bg="primary" variant="dark">
                <div className="app_header">
                    <h3><Link to="contacts" onClick={e => handleClick(e)}>View All Customers</Link></h3>
                    <h3><Link to="new_contact" onClick={e => handleClick(e)}>Create a New Customer</Link></h3>
                    <h3><Link to="search" onClick={e => handleClick(e)}>Search Customers</Link></h3>
                    <h3><Link to="new_worker" onClick={e => handleClick(e)}>Add a New Worker</Link></h3>
                    <h3><Link to="calendar" onClick={e => handleClick(e)}>View Calendar</Link></h3>
                    <h3><SignOutButton /></h3>
                </div>
            </Navbar>
                : 
            <Navbar bg="primary" variant="dark"><SignInButton /></Navbar> 
        }
                
            
            <br />
            <br />
            {props.children}
        </>
    );
};

