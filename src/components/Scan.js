import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'
import { observer, inject } from 'mobx-react'
import Card from './Card'

class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      delay: 100,
      result: '',
    }
    this.handleScan = this.handleScan.bind(this)
  }
  async handleScan(data) {
    if (!data) {
      return
    }
    this.setState({
      result: await this.props.ordersStore.checkQrCode(data)
    })

  }
  handleError(err) {
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
    const previewStyle = {
      height: 700,
      width: 700,
    }

    return (
      <div>
        { !this.state.result ?
          <QrReader
            delay={this.state.delay}
            style={previewStyle}
            onError={this.handleError}
            onScan={this.handleScan}
          />
          : <Card order={this.state.result}  setRecieved={this.setRecieved}/>}
      </div>
    )
  }
}

export default inject("ordersStore")(observer(Test))
