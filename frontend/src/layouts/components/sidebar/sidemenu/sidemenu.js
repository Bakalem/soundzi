// import external modules
import React, { Component } from "react";

import {
   Home,
   Mail,
   Users
} from "react-feather";
import { NavLink } from "react-router-dom";

// Styling
import "../../../../assets/scss/components/sidebar/sidemenu/sidemenu.scss";
// import internal(own) modules
import SideMenu from "../sidemenuHelper";

class SideMenuContent extends Component {
   render() {
      return (
         <SideMenu className="sidebar-content" toggleSidebarMenu={this.props.toggleSidebarMenu}>

            <SideMenu.MenuSingleItem>
               <NavLink to="/" exact >
                  <i className="menu-icon">
                     <Home size={18} />
                  </i>
                  <span className="menu-item-text">Home</span>
               </NavLink>
            </SideMenu.MenuSingleItem>
            <SideMenu.MenuSingleItem badgeColor="danger" badgeText="6">
               <NavLink to="/email" activeclassname="active">
                  <i className="menu-icon">
                     <Mail size={18} />
                  </i>
                  <span className="menu-item-text">Email</span>
               </NavLink>
            </SideMenu.MenuSingleItem>
            <SideMenu.MenuSingleItem>
               <NavLink to="/contacts" activeclassname="active">
                  <i className="menu-icon">
                     <Users size={18} />
                  </i>
                  <span className="menu-item-text">Contacts</span>
               </NavLink>
            </SideMenu.MenuSingleItem>

         </SideMenu>
      );
   }
}

export default SideMenuContent;
