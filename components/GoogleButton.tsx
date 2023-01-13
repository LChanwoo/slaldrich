import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { redirect } from "next/dist/server/api-utils";
import { useEffect } from "react";


const clientId = '51512082009-ta7bqeitl13lne57snfmf4h9qtd0vm4v.apps.googleusercontent.com';

const GoogleButton = () => {
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
            <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                onSuccess={onSuccess}
                onError={()=>{console.log("error")}}
            ></GoogleLogin>
            </GoogleOAuthProvider>
        </div>
    )

};

export default GoogleButton;