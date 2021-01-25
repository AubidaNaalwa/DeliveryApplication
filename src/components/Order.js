import React, { useEffect, useState } from 'react';
import { observer, inject } from 'mobx-react'
import '../styles/order.css';
import ReactSnackBar from "react-js-snackbar";

function Order(props) {

    const [sh, setSh] = useState({show: false, showing: false})




    const getFormmatedDate = date => {
        date = new Date(date);
        let day = date.getDate() - 1;
        const month = date.toLocaleString('en-us', { month: 'long' });
        let year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    };


    const haveReceived = (id) => {

        if (sh.Showing) return;
        setSh({show: true, showing:true})
        setTimeout(() => {
          setSh({show: false, showing:false});
        }, 2000);

        if (!props.order.received) {
            props.ordersStore.setReceived(id)
        }
    }


    return (
        <div>
            <div className="order" >
                <span>{props.order.id}</span>
                <span>{props.order.name}</span>
                <span>{getFormmatedDate(props.order.date)}</span>
                <span>{props.order.phoneNumber}</span>
                <span>{props.order._id}</span>
                <span>{props.order.area}</span>
                <span onClick={() => haveReceived(props.order._id)}>
                    <ReactSnackBar Icon={<span>🦄</span>} Show={sh.show}>
                        The order has been received!
                    </ReactSnackBar>
                    {props.order.received ? <i className="fas fa-check" /> : <div id='check'>-</div>}</span>
            </div>
        </div>
    )

}

export default inject("ordersStore")(observer(Order))