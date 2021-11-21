import React from 'react';
import { Link } from 'react-router-dom'
import './sidebar.css';
import logo from '../../assets/images/logo.png';
//import sidebar_items from '../../assets/JsonData/sidebar_routes.json'
import sidebar_items from '../../assets/JsonData/sidebar_icon';

const SidebarItem = props => {
    const active = props.active ? 'active' : ''
    return (
        <div className="sidebar__item">
            <div className={`sidebar__item-inner ${active}`}>
                {props.icon}
                <span className="d-inline-block ms-3 text-light">
                    {props.title}
                </span>
            </div>
        </div>
    )
}

const  Sidebar = props => {
    const activeItem = sidebar_items.findIndex(item => item.route === props.location.pathname)
    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                <img src={logo} alt="company logo " className=""/>
                {/* <h2 className="text-center text-info me-5 fs-1">Joy</h2> */}
                <p className="ms-2 mt-3 text-light">Make Your Future</p>
            </div>
            { 
                sidebar_items.map((item, index) => (
                    <Link to={item.route} key={index}>
                    <SidebarItem
                        title={item.display_name}
                        icon={item.icon}
                        active={index === activeItem}
                    />
                </Link>
                ))
            }
        </div>    
    )
}

export default Sidebar
