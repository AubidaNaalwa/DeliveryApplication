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
                            <LeafletMap locations={props.ordersStore.locations} />
                        </div>
                    

                    <div className='onMap'>

                        <div id="nearOrders">
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
                            <div className='approved'>
                                <Clock />
                            </div>

                        </div>

                        <div className='expected'>
                            <div className='orderInfo'>
                                <div className='nextCustomer'>Next Customer: {nextOrder && nextOrder.name}</div>
                                <div className='nextCustomer'>ID: {nextOrder && nextOrder.id}</div>
                                <div className='nextCustomer'>Phone Number: {nextOrder && nextOrder.phoneNumber}</div>
                                <div className='nextCustomer'>Area: {nextOrder && nextOrder.area}</div>
                            </div>
                            <div className='orderNumber'>Order Number: {nextOrder && nextOrder._id}</div>


                            <div className='total'>
                                <div>
                                <div className='expDis'>Total Distance:  {Math.floor(props.ordersStore.distance)}km</div>
                                <div className='expTime'>Total Time Workday : {timeConvert(props.ordersStore.time * 60)}</div></div>
                               <div> <img src='https://image.freepik.com/free-vector/delivery-courier-man-with-medical-protective-mask-his-face-holding-package-with-delivery-truck-delivery-during-quarantine-time_148087-145.jpg' /></div>
                            </div>


                        </div>

                    </div>

                </div> : null}
        </div>

    )

}

export default inject("ordersStore")(observer(MapContainer))