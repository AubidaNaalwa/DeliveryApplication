import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import Routing from "./RoutingMachine";
import { observer, inject } from 'mobx-react'
class LeafletMap extends Component {
  state = {
    zoom: 10,
    isMapInit: false
  };

  updateDistanceAndTime= (distance, time)=>{
    this.props.ordersStore.updateDistTime(distance,time)
  }

  saveMap = map => {
    this.map = map;
    this.setState({
      isMapInit: true
    });
  };


  render() {
    const position = []
    position.push(this.props.ordersStore.lat)
    position.push(this.props.ordersStore.lan)

    return (
      <Map center={position} zoom={this.state.zoom} ref={this.saveMap}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {this.state.isMapInit && <Routing map={this.map} locations={this.props.locations} updateDistTime = {this.updateDistanceAndTime} nextOrder ={this.props.nextOrder} />}
      </Map>
    );
  }
}

export default inject("ordersStore")(observer(LeafletMap))
