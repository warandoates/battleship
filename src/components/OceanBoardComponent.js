import React, {Component} from 'react';
import OceanSquareComponent from './OceanSquareComponent';


export default class OceanBoardComponent extends Component {

    state = {
        shipsVisible: false,
        lostShips: []
    };

    handleShowClick() {
        this.setState({shipsVisible: !this.state.shipsVisible})
    }

    componentWillReceiveProps(newProps) {
        if (newProps && newProps.playerShips) {
            this.setState({lostShips: newProps.playerShips.filter(ship => ship.hits === ship.size)})
        }
        if (newProps.playerShips.filter(ship => ship.hits === ship.size).length === 5 && newProps.stage === "game") {
            this.props.fleetLost(this.props.playerId)
        }
    }
    render() {
        return (
            <div>
                <h3>Player {this.props.playerId}
                    <span style={{textTransform: 'lowercase'}}>'s </span>
                    Fleet</h3>
                <div
                    className={"oceanBoard"}
                    style={this.props.stage !== 'start' ? {height: '380px'} : {}}
                >
                    {this.props.playerBoard
                        ?
                        this.props.playerBoard.map((square, index) => {
                            return (<OceanSquareComponent
                                key={index}
                                data={square}
                                hover={this.props.hover}
                                offHover={this.props.offHover}
                                activePlayerId={this.props.activePlayerId}
                                playerId={this.props.playerId}
                                stage={this.props.stage}
                                assign={this.props.assign}
                                attack={this.props.attack}
                                shipsVisible={this.state.shipsVisible}
                            />)
                        })
                        :
                        null}
                </div>
                <div className={"buttonHolder"}>
                    {
                        this.props.playerId === this.props.activePlayerId && this.props.stage === 'game' ?
                            <button className={"btn"} onClick={() => this.handleShowClick()}>
                                {this.state.shipsVisible ? 'Hide My Ships' : 'Show My Ships'}
                            </button>
                            :
                            null
                    }
                </div>
                {this.props.stage === 'game' || this.props.stage === 'over' ?
                        <div>
                            <p className={"subtitleBelow"}>Ships I've Lost:</p>
                            {this.props.playerShips ?
                                this.state.lostShips.map(ship =>
                                    <div className="row graveyard">
                                        <div className={'col s6'}>
                                            {ship.name}
                                        </div>
                                        <div className="col s6">
                                            <img className={'col s6'} src={ship.imgURL} alt={"img"}/>
                                        </div>
                                    </div>
                                )
                                : null
                            }
                        </div>
                        :
                        null}
            </div>
        )
    }
}