import React from "react";
import { useRouteError } from "react-router-dom";

// Define an interface for the expected error structure
interface RouteError {
  statusText?: string;
  message?: string;
}

// Define the ErrorPage component
export default function ErrorPage() {
  const error = useRouteError() as RouteError; // Type assertion

  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message || "Unknown error"}</i>
      </p>
    </div>
  );
}
