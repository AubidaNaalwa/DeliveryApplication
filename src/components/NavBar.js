import '../styles//navBar.css';

import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'


function NavBar(props) {

    return (
        <div className="nav-wrapper">
            <div className="left-side">
                <div className="nav-link-wrapper">
                </div>
                <div className="nav-link-wrapper">
                    <div><Link to="/" >orders</Link><i className="fas fa-shopping-cart" style={{marginLeft : '0.3em'}}></i></div>
                </div>
                <div className="nav-link-wrapper">
                    <div><Link to="/Map">Map</Link><i className="fas fa-map-marker-alt" style={{marginLeft : '0.3em'}}></i></div>
                </div>
                <div className="nav-link-wrapper">
                    <div><Link to="/Scan">Scan</Link><i className="fas fa-camera" style={{marginLeft : '0.3em'}}></i></div>
                </div>
                <div className="nav-link-wrapper">
                    <div><Link to="/contact">contact</Link><i className="fas fa-id-card-alt" style={{marginLeft : '0.3em'}}></i></div>
                </div>
                
            </div>

            <div className="right-side">
                <div className="nav-link-wrapper">
                    <div onClick ={props.ordersStore.logout}><Link to="/">LogOut</Link></div>
                </div>
            </div>
        </div>
    );

}

export default inject('ordersStore')(observer(NavBar));

