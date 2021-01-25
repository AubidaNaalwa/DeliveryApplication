import React, { useEffect, useState } from 'react';
import { observer, inject } from 'mobx-react'
import '../styles/map.css';
import LeafletMap from './MapComponents/LeafletMap'
import Clock from './Clock'

function MapContainer(props) {

    const [nextOrder, setNextOrder] = useState({})

    setInterval(() => {
        props.ordersStore.updateLocation()
    }, 10000);

    const replaceOrder = async () => {
        const order = await props.ordersStore.getNextOrder()
        setNextOrder(order)
    }
    useEffect(() => {
        props.ordersStore.updateLocation()
        props.ordersStore.getOrders()
        replaceOrder()
    }, [])

    const timeConvert = function (n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return rhours + " hour(s) and " + rminutes + " minute(s).";
    }


    return (
        <div>
            {props.ordersStore.locations.length > 0 ?
                <div className='mapContainer'>
                    <div id="mapid">
                        <LeafletMap locations={props.ordersStore.locations} nextOrder ={nextOrder} />
                    </div>
                    <div className='onMap'>
                        <div id="nearOrders">
                            <div className='approved'>
                                <Clock />
                            </div>
                            <div className='near'>
                                <div>
                                    <div className='ordersLeft'>ORDERS LEFT</div>
                                    <div className='orderNumLeft'>{props.ordersStore.totalNotReceivedYet}</div>
                                </div>
                                <div>
                                    <div className='recOrder'> ORDERS HAS BEEN RECEIVED </div>
                                    <div className='orderNum'>{props.ordersStore.totalReceived}</div>
                                </div>
                            </div>
                        </div>
                        <div className='expected'>
                            <div className='orderInfo'>
                                <table>
                                    <tr>
                                        <th>Next Customer</th>
                                        <td>{nextOrder && nextOrder.name}</td>
                                    </tr>
                                    <tr>
                                        <th>ID</th>
                                        <td>{nextOrder && nextOrder.id}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone Number</th>
                                        <td>{nextOrder && nextOrder.phoneNumber}</td>
                                    </tr>
                                    <tr>
                                        <th>Area</th>
                                        <td>{nextOrder && nextOrder.area}</td>
                                    </tr>
                                    <tr>
                                        <th>Order Number</th>
                                        <td>{nextOrder && nextOrder._id}</td>
                                    </tr>

                                </table>

                            </div>
                            <div className='total'>
                                <div>
                                    <div className='expDis'>Total Distance:  {Math.floor(props.ordersStore.distance)}km</div>
                                    <div className='expTime'>Total Time : {timeConvert(props.ordersStore.time * 60)}</div>
                                </div>
                                <div> <img src='https://image.freepik.com/free-vector/delivery-courier-man-with-medical-protective-mask-his-face-holding-package-with-delivery-truck-delivery-during-quarantine-time_148087-145.jpg' /></div>
                            </div>
                        </div>
                    </div>
                </div> : null}
        </div>
    )

}

export default inject("ordersStore")(observer(MapContainer))