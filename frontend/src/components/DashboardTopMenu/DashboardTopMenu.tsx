import React from 'react';
import './DashboardTopMenu.sass'
import logo from '../../assets/images/violetLogo.svg'

const DashboardTopMenu = () => {

    const dashboardMenuItems = {
        matches: [
            { value: '1000000', name: 'UNSEEN MATCHES' },
            { value: '60', name: 'NEW SINCE JANUARY 5TH' },
            { value: '1 day', name: 'last match' }
        ],
        names: [
            { color: '#8E0B03', name: 'Removed' },
            { color: '#8E6F03', name: 'Detected copies' },
            { color: '#48519D', name: 'Reported' }
        ]
    }

    return (
        <div className="DashboardTopMenuContainer">


            <div className="dash_menu_logo">
                <img src={logo} alt="logo"/>
            </div>


            <div className="dash_menu_name">Detections Amount</div>


            <div className="dash_menu_matches_container">
                {
                    dashboardMenuItems.matches.map((m, id) => {
                        return (
                            <div key={id} className="matches_item_container">
                                <div className="matches_value">{m.value}</div>
                                <div className="matches_name">{m.name}</div>
                            </div>
                        )
                    })
                }
            </div>


            <div className="dash_menu_detected_items_container">
                {
                    dashboardMenuItems.names.map((n, id) => {
                        return (
                            <div key={id} className="detected_items_container">
                                <div style={{backgroundColor: `${n.color}`}} className="detected_items_dot"/>
                                <div style={{color: `${n.color}`}} className="detected_items_name">{n.name}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default DashboardTopMenu;