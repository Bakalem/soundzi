// import external modules
import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Spinner from "../components/spinner/spinner";

// import internal(own) modules
import MainLayoutRoutes from "../layouts/routes/mainRoutes";
import FullPageLayout from "../layouts/routes/fullpageRoutes";
import ErrorLayoutRoute from "../layouts/routes/errorRoutes";

// Main Layout
const LazyEmail = lazy(() => import("../views/email/email"));
const LazyContacts = lazy(() => import("../views/contacts/contacts"));
const LazyBlankPage = lazy(() => import("../views/pages/blankPage"));

// Full Layout
const LazyForgotPassword = lazy(() => import("../views/pages/forgotPassword"));
const LazyLogin = lazy(() => import("../views/pages/login"));
const LazyRegister = lazy(() => import("../views/pages/register"));
const LazyVerification = lazy(() => import("../views/pages/verification"));
const LazyLockScreen = lazy(() => import("../views/pages/lockScreen"));

// Error Pages
const LazyErrorPage = lazy(() => import("../views/pages/error"));

class Router extends Component {
   render() {
      return (
         // Set the directory path if you are deplying in sub-folder
         <BrowserRouter basename="/">
            <Switch>
               
               <MainLayoutRoutes
                  exact
                  path="/"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyBlankPage {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/email"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyEmail {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/contacts"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyContacts {...matchprops} />
                     </Suspense>
                  )}
               />
               <FullPageLayout
                  exact
                  path="/pages/register"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}> 
                        <LazyRegister {...matchprops} />
                     </Suspense>
                  )}
               />
               <FullPageLayout
                  exact
                  path="/pages/forgot-password"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyForgotPassword {...matchprops} />
                     </Suspense>
                  )}
               />
               <FullPageLayout
                  exact
                  path="/pages/lockscreen"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyLockScreen {...matchprops} />
                     </Suspense>
                  )}
               />
               <FullPageLayout
                  exact
                  path="/pages/login"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyLogin {...matchprops} />
                     </Suspense>
                  )}
               />
               <FullPageLayout
                  exact
                  path="/pages/verification"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyVerification {...matchprops} />
                     </Suspense>
                  )}
               />
               <ErrorLayoutRoute
                  exact
                  path="/pages/error"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyErrorPage {...matchprops} />
                     </Suspense>
                  )}
               />
               <ErrorLayoutRoute
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyErrorPage {...matchprops} />
                     </Suspense>
                  )}
               />
               
            </Switch>
         </BrowserRouter>
      );
   }
}

export default Router;
