import React from "react";
import { GoogleLogin } from "react-google-login";

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  const clientId = "420207200140-rd3v2vhavlkgbmut1vsrarnsdafcg9c8.apps.googleusercontent.com";

  const handleSuccess = (response) => {
    console.log("Login Success:", response);
    onSuccess(response);
  };

  const handleFailure = (error) => {
    console.error("Login Failure:", error);
    onFailure(error);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy={"single_host_origin"} // Ensure this is set correctly
      redirectUri="http://localhost:3000" // Ensure this matches the redirect URI in Google Cloud Console
    />
  );
};

export default GoogleLoginButton;
