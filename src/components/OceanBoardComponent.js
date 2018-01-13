import React, {Component} from 'react';
import OceanSquareComponent from './OceanSquareComponent';

function boardMaker(playerId) {
    let emptyBoard = [];
    for (let i = 1; i <= 100; i++) {
        emptyBoard.push({
            id: i,
            owner: playerId,
            contents: 'empty',
            color: 'white',
            status: 'fresh'
        })
    }
    return emptyBoard
}

export default class OceanBoardComponent extends Component {

    state = {
        shipsVisible: false,
        lostShips: []
    }

    componentDidMount() {
        this.props.buildBoard(boardMaker(this.props.playerId), this.props.playerId)
    }

    handleShowClick() {
        this.setState({shipsVisible: !this.state.shipsVisible})
    }

    componentWillReceiveProps(newProps){
        if(newProps && newProps.playerShips){
        this.setState({lostShips: newProps.playerShips.filter(ship => ship.hits === ship.size)})
        }
        if (newProps.playerShips.filter(ship => ship.hits === ship.size).length === 5){
        this.props.fleetLost(this.props.playerId)
        }
    }


    render() {
        return (
            <div>
                <h3>Player {this.props.playerId}
                    <span style={{textTransform: 'lowercase'}}>'s </span>
                    Fleet</h3>
                <div className={"oceanBoard"}>
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
            </div>
        )
    }
}