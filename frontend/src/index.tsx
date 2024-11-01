import React from "react";
import { createRoot } from "react-dom/client";
import {GoogleOAuthProvider} from "@react-oauth/google"
import App from "./App";

const root = createRoot(document.getElementById("root") as HTMLElement)
const clientId = ():string => {
    const value = process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID
    
    if(!value){ 
    throw console.error(`Enironment Variable REACT_APP_GOOGLE_OAUTH_CLIENT_ID is Undefined`);
    return ""}
    else {
    return value 
    } 
}

root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={clientId()}>
        <App/>
        </GoogleOAuthProvider>
    </React.StrictMode>
)