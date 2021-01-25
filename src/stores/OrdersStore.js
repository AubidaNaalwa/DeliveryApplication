import { observable, action, makeObservable, computed } from 'mobx'
import axios from "axios";
import L from "leaflet";

export default class OrdersStore {
    constructor() {
        this.orders = []
        this.currentUser = {
            
        }
        this.islogIn = false
        this.locations = []
        this.lat = 32.073582
        this.lan = 34.788052
        this.distance = 0
        this.time = 0
        makeObservable(this, {
            distance: observable,
            time: observable,
            lat: observable,
            lan: observable,
            orders: observable,
            locations: observable,
            getOrders: action,
            currentUser: observable,
            islogIn: observable,
            setReceived: observable,
            login: action,
            logout: action,
            totalReceived: computed,
            totalNotReceivedYet: computed,
            getLocations: action,
            checkLocalStorage: action,
            setLocalStorage: action,
            emptyLocalStorage: action,
            updateLocation: action,
            getNextOrder : action,
            updateDistTime: action,
            checkQrCode:action
        })
    }

    updateDistTime(distance ,time){
        this.distance = distance
        this.time = time
    }

    checkLocalStorage() {
        const userName = JSON.parse(localStorage.getItem('userName'));
        if (!userName) {
            this.islogIn = false
            this.currentUser = {}
            return
        }
        this.islogIn = true
        this.currentUser = userName
    }


    setLocalStorage(userName) {
        localStorage.setItem('userName', JSON.stringify(userName))
        this.islogIn = true
        this.currentUser = userName
    }

    emptyLocalStorage() {
        localStorage.clear()
        this.islogIn = false
        this.currentUser = {}
        this.orders = []
        this.locations = []
    }

    async getOrders() {
        let orders = await axios.post('http://localhost:8080/orders', this.currentUser)
        this.orders = orders.data.packages
        this.getLocations()
    }

    login(isLogIn, input) {
        if (isLogIn) {
            this.setLocalStorage(input)
            this.getOrders()
        } else {
            alert("userName or password is not correct!")
        }
    }

    logout = () => {
        this.emptyLocalStorage()
    }

    async setReceived(orderId) {
        await axios.post('http://localhost:8080/setReceived', { id: orderId })
        this.getOrders()
    }

    get totalReceived() {
        let c = 0;
        for (let order of this.orders) {
            if (order.received) { c++ }
        }
        return c;
    }

    get totalNotReceivedYet() {
        return this.orders.length - this.totalReceived;
    }

    async getLocations() {
        this.locations = this.orders.filter(o => !o.received).
            map(v => { return L.latLng(parseFloat(v.lat), parseFloat(v.lan)) })
        this.locations.unshift( L.latLng(parseFloat(this.lat), parseFloat(this.lan)))
    }

    updateLocation = async () => {

        navigator.geolocation.getCurrentPosition(
            (position) =>{
                this.lat = position.coords.latitude;
                this.lan = position.coords.longitude;
                axios.post('http://localhost:8080/DeliveryWorker/location', { ...this.currentUser, lat :this.lat, lan:this.lan })
            },
            function errorCallback(error) {
               
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    }

    async checkQrCode(id){
        await this.getOrders()
        let orderQR
        this.orders.forEach(order =>{
          if(order._id === id){
            orderQR = order
            return
          }
        })
        return orderQR
    }

      getNextOrder = async ()=>{
        await this.getOrders()
        let nextOrder
        let min={lat :0 ,lan:0}
        const ppp = this.orders.filter(o => !o.received).forEach(order =>{
            if(!nextOrder){
                nextOrder = order
                min = {lat :Math.abs(this.lat - order.lat), lan:Math.abs(this.lan - order.lan)}
                return
            }
            if(min.lat < Math.abs(this.lat - order.lat) && min.lan < Math.abs(this.lan - order.lan)){
                nextOrder = order
                min = {lat :Math.abs(this.lat - order.lat), lan:Math.abs(this.lan - order.lan)}
                return
            }
        })
        console.log(nextOrder)
        return nextOrder
    }
}
