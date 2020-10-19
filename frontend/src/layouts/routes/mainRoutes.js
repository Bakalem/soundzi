// import external modules
import React from "react";
import { Route, Redirect } from "react-router-dom";

// import internal(own) modules
import MainLayout from "../mainLayout";

function userExist() {
   return localStorage.getItem('user')  ? true : false;
}

function isUserActif() {
   let user = localStorage.getItem('user');
   if(user) {
      user = JSON.parse(user);
      return user.status === 'actif';
   }
   return false;
}

function isUserNotVerified() {
   let user = localStorage.getItem('user');
   if(user) {
      user = JSON.parse(user);
      return user.status === 'notVerified';
   }
   return false;
}
//&& localStorage.getItem('user').status === 'actif'
//
const MainLayoutRoute = ({ render, ...rest }) => {
   return (
      <Route
         {...rest}
         render={matchProps => (
            userExist() && isUserActif() ? (
               <MainLayout>{render(matchProps)}</MainLayout>
            ) : (
               userExist() && isUserNotVerified() ? (
                  <Redirect to={{ pathname: '/pages/verification',}} />
               ) : (
                  <Redirect to={{ pathname: '/pages/login',}} />
               )
            )
         )}
      />
   );
};

export default MainLayoutRoute;
