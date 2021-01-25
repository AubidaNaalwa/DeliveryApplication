import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'
import { observer, inject } from 'mobx-react'
import Card from './Card'
import ReactSnackBar from "react-js-snackbar";

class Test extends Component {

  constructor(props) {
    super(props)
    this.state = {
      delay: 100,
      result: '',
      show: false,
      showig: false,
      message: false

    }
    this.handleScan = this.handleScan.bind(this)
  }
   handleScan = async(data)=> {
    if (!data) {
      
      return
    }
   const order =  await this.props.ordersStore.checkQrCode(data)
   setTimeout(() => {
    this.setState({show: false, showing: false})
  }, 2000);

   if(!order){
     this.setState({message: "This order is not yours", show: true, showing: true})
    return
   }
    if(order.received){
      this.setState({message: "The order has been recieved", show: true, showing: true})
      return
    }
    this.setState({
      result: order
    })

  }
  handleError =(err)=> {
    this.setState({
      result: "",
    })
  }

  setRecieved = (id) => {
    this.props.ordersStore.setReceived(id)
    this.setState({
      result: "",
    })
  }
  render() {
 
    return (
      <div>
        <h3>Please scan the barcode</h3>
         <h2 className='subTitle'>and get the card</h2>
        
        { !this.state.result ?
          <QrReader 
            delay={this.state.delay}
            onError={this.handleError}
            onScan={this.handleScan}
            
          />

          : <Card order={this.state.result}  setRecieved={this.setRecieved}/>}
           <h2 className='subTitle2'>Thank You!</h2>
           <ReactSnackBar Icon={<span>🦄</span>} Show={this.state.show}>
                            {this.state.message}
            </ReactSnackBar>
      </div>
    )
  }
}

export default inject("ordersStore")(observer(Test))
