import React, {Component} from 'react';

export default class ShipPickerComponent extends Component {
    state = {
        horizontal: true,
        selectedShipName: ''
    };

    handleClickOrientation(horizontalValue) {
        this.setState({horizontal: horizontalValue})
    }

    handleClickShip(shipName, shipSize) {
        let data = {
            selectedShipName: shipName,
            selectedShipSize: shipSize,
            selectedShipHorizontal: this.state.horizontal,
        };
        this.props.selectShip(data);
        this.setState({selectedShipName: shipName})
    }

    render() {
        console.log(this.props.selectedShip)
        let theseShips = this.props.activePlayerId === 1 ? this.props.player1Ships : this.props.player2Ships;
        return (
            <div className="pickerContainer">
                <div className="row">
                    <div className="col s12">
                        <h3 style={{marginTop: '-20px', fontWeight: 'bold'}}>Player #{this.props.activePlayerId}</h3>
                        <h3>Pick A Ship To Place It</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6">
                        <button
                            className={`btn ${this.state.horizontal ? 'red' : 'grey'}`}
                            onClick={() => this.handleClickOrientation(true)}
                        >
                            Horiz.
                        </button>
                    </div>
                    <div className="col s6">
                        <button
                            className={`btn ${this.state.horizontal ? 'grey' : 'red'}`}
                            onClick={() => this.handleClickOrientation(false)}
                        >
                            Vert.
                        </button>
                    </div>
                </div>
                {theseShips.map((boat, index) => {
                    return (
                        <div key={index}>
                            <button
                                className={`row btn ${boat.available ?
                                    boat.name === this.state.selectedShipName ? 'indigo' : 'blue'
                                    :
                                    'disabled'}`}
                                onClick={() => this.handleClickShip(boat.name, boat.size)}
                            >
                                <div className="col s5" style={{textAlign: "left"}}>
                                    {boat.name}
                                </div>
                                <div className="col s7">
                                    <img
                                        src={boat.imgURL || '//via.placeholder.com/100x50'}
                                        alt={boat.name}
                                        width="150"
                                        height="40"
                                    />
                                </div>
                            </button>
                        </div>
                    )
                })}


            </div>
        )
    }
}