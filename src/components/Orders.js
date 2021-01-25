import React, { useEffect, useState } from 'react';
import { observer, inject } from 'mobx-react'
import Order from './Order'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../styles/orders.css';

function Orders(props) {

      
    const [search, setSearch] = useState("")
    const [select, setSelect] = useState("")

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleSelect = (e) => {
        setSelect(e.target.value)
    }


    useEffect(() => {
        props.ordersStore.getOrders();
    }, [])

    const summRecived = () => {
        let counter = 0;
        props.ordersStore.orders.forEach(v => v.received ? counter++ : counter)
        return counter
    }


    const percentage = Math.floor(100 / props.ordersStore.orders.length * summRecived())
    return (

        <div className="ordersComp">
            {props.ordersStore.orders.length > 0 ?
                <div>
                    <div id="search-nav">
                        <input
                            placeholder="Search"
                            id="search"
                            value={search}
                            onChange={handleSearch}
                        />

                        <div className="dropdown dropdown-dark">
                            <select name="two" className="dropdown-select" value={select} onChange={handleSelect}>
                                <option value="">Select…</option>
                                <option value="name">Name</option>
                                <option value="area">Area</option>
                                <option value="received">Received</option>
                                <option value="not received">Not Received</option>
                            </select>
                        </div>
                    </div>

                    <div className="ordersContainer">
                        <div id='orderTable'>

                            <div id="header" >
                                <span>Customer Id</span>
                                <span>Customer Name</span>
                                <span>Date</span>
                                <span>Phone Number</span>
                                <span>Order Id</span>
                                <span>Area</span>
                                <span>Received</span>
                            </div>

                            <div id='orders'>

                            { select === 'received' 
                                    ? props.ordersStore.orders.filter(fd => fd[select]).map(o => <Order key={o._id} order={o} />)
                                    :  select === 'not received' ?
                                        props.ordersStore.orders.filter(fd => !fd['received']).map(o => <Order key={o._id} order={o} />)
                                        : (!select)
                                            ? props.ordersStore.orders.map(o => <Order key={o._id} order={o} />)
                                            : props.ordersStore.orders.filter(fd =>
                                                fd[select]
                                                    .toUpperCase()
                                                    .toLowerCase()
                                                    .includes(search))
                                                .map(o => <Order key={o._id} order={o} />)
                                }
                            </div>
                        </div>


                        <div className="circle">
                            <div id="title">Orders Delivered</div>
                            <CircularProgressbar
                                value={percentage}
                                text={`${percentage}%`}
                                styles={buildStyles({
                                    rotation: percentage / 100,
                                    strokeLinecap: 'butt',
                                    textSize: '20px',
                                    pathTransitionDuration: 0.5,
                                    pathColor: `rgba(260, 0, 0, ${percentage / 100})`,
                                    textColor: '#f88',
                                    trailColor: '#d6d6d6',
                                    backgroundColor: '#3e98c7',
                                })} />
                               
                            <img className='imgDel' src='https://image.freepik.com/free-vector/delivery-service-person-with-mask_23-2148494581.jpg' />

                        </div>

                    </div>

                </div>


                : null}


        </div>
    )

}

export default inject("ordersStore")(observer(Orders))