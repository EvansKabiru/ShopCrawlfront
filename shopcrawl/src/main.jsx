import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider
      clientId={
        "414872029170-3u2c5nboldvniesjmkgm0fhtc54a0mld.apps.googleusercontent.com"
      }
    >
      ...
      <App />
    </GoogleOAuthProvider>
    ;
  </StrictMode>
);
