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
    scopes: ["User.Read", "Calendars.Read", "Calendars.ReadWrite", "Calendars.Read.Shared"]
  };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
  };