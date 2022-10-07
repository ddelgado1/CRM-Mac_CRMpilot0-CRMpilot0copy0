**PageLayout.jsx**
import React from "react";
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
            <Navbar bg="primary" variant="dark">
                
                <a className="navbar-brand" href="/">MSAL React Tutorial</a>
                { isAuthenticated ? 
                <div >
                    <h3><Link to="contacts" onClick={e => handleClick(e)}>View All Customers</Link></h3>
                    <h3><Link to="new_contact" onClick={e => handleClick(e)}>Create a New Customer</Link></h3>
                    <h3><Link to="search" onClick={e => handleClick(e)}>Search Customers</Link></h3>
                    <h3><Link to="new_worker" onClick={e => handleClick(e)}>Add a New Worker</Link></h3>
                    <SignOutButton />
                </div>
                : <SignInButton /> }
                
            </Navbar>
            <h5><center>Welcome to the Microsoft Authentication Library For React Tutorial</center></h5>
            <br />
            <br />
            {props.children}
        </>
    );
};

**ProfileData.jsx**
import React from "react";

/**
 * Renders information about the user obtained from Microsoft Graph
 */
export const ProfileData = (props) => {
    return (
        <div id="profile-div">
            <p><strong>First Name: </strong> {props.graphData.givenName}</p>
            <p><strong>Last Name: </strong> {props.graphData.surname}</p>
            <p><strong>Email: </strong> {props.graphData.userPrincipalName}</p>
            <p><strong>Id: </strong> {props.graphData.id}</p>
        </div>
    );
};

**SignInButton.jsx**
import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import Button from "react-bootstrap/Button";

function handleLogin(instance) {
    instance.loginRedirect(loginRequest).catch(e => {
        console.error(e);
    });
}

/**
 * Renders a button which, when selected, will redirect the page to the login prompt
 */
export const SignInButton = () => {
    const { instance } = useMsal();

    return (
        <Button variant="secondary" className="ml-auto" onClick={() => handleLogin(instance)}>Sign in using Redirect</Button>
    );
}

**SignOutButton.jsx**
import React from "react";
import { useMsal } from "@azure/msal-react";
import Button from "react-bootstrap/Button";

function handleLogout(instance) {
    instance.logoutRedirect().catch(e => {
        console.error(e);
    });
}

/**
 * Renders a button which, when selected, will redirect the page to the logout prompt
 */
export const SignOutButton = () => {
    const { instance } = useMsal();

    return (
        <Button variant="secondary" className="ml-auto" onClick={() => handleLogout(instance)}>Sign out using Redirect</Button>
    );
}

**authConfig.js**
export const msalConfig = {
    auth: {
      clientId: "53a6aa66-b05b-4605-b437-033d18b11e3f",
      authority: "https://login.microsoftonline.com/c72c1d30-f413-4410-9663-8e8e1dd5fd43", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
      redirectUri: "http://localhost:3000",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
   scopes: ["User.Read"]
  };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
  };


**graph.js**
import { graphConfig } from "./authConfig";

/**
 * Attaches a given access token to a Microsoft Graph API call. Returns information about the user
 */
export async function callMsGraph(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(graphConfig.graphMeEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}