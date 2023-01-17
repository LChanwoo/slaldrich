import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { redirect } from "next/dist/server/api-utils";
import { useEffect } from "react";


const clientId = process.env.OAUTH_GOOGLE_ID || "51512082009-fsl6ssmlpqu33tde8f42p8o8j0te1i57.apps.googleusercontent.com";

const GoogleButton = () => {
    console.log("clientId: ", clientId)
    const onSuccess = (res: any) => {
        console.log('[Login Success] currentUser:', res);
        // window.location.href="/";
    }   
    const onFailure = (res: any) => {
        console.log('[Login Failed] res:', res);
    }
    const onLogoutSuccess = (res: any) => {
        console.log('[Logout Success] res:', res);
    }
    return(
        <div>
            <GoogleOAuthProvider clientId={clientId!}>
            <GoogleLogin
                onSuccess={onSuccess}
                onError={()=>{console.log("error")}}
            ></GoogleLogin>
            </GoogleOAuthProvider>
        </div>
    )

};

export default GoogleButton;