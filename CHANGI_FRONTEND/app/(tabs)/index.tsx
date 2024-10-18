import { Redirect } from "expo-router";
import React from "react";

/**
 * This component is the entry point for the application and is responsible for
 * redirecting the user to the navigation page.
 *
 * The purpose of this component is to provide a clear entry point for the app
 * and to ensure that the user is always redirected to the correct page when
 * they open the app.
 *
 * @returns {JSX.Element} The redirect component that redirects the user to
 *                        the navigation page.
 */
export default function IndexPage(): JSX.Element {
  return <Redirect href="/navigation" />;
}
