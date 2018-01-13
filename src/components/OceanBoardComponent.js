import React, {Component} from 'react';
import OceanSquareComponent from './OceanSquareComponent';

function boardMaker(playerId) {
    let emptyBoard = [];
    for (let i = 1; i <= 100; i++) {
        emptyBoard.push({
            id: i,
            owner: playerId,
            contents: 'empty',
            color: 'white'
        })
    }
    return emptyBoard
}

export default class OceanBoardComponent extends Component {

    state = {
        shipsVisible: false,
    }

    componentDidMount() {
        this.props.buildBoard(boardMaker(this.props.playerId), this.props.playerId)
    }

    handleShowClick() {
        this.setState({shipsVisible: !this.state.shipsVisible})
    }

    render() {
        return (
            <div>
                <h3>Player {this.props.playerId}
                    <span style={{textTransform: 'lowercase'}}>'s</span>
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
                            />)
                        })
                        :
                        null}
                </div>
                {
                    this.props.playerId === this.props.activePlayerId && this.props.stage === 'game' ?
                        <button className={"btn"} onClick={() => this.handleShowClick()}>
                            {this.state.shipsVisible ? 'Hide My Ships' : 'Show My Ships'}
                        </button>
                        :
                        null
                }
            </div>
        )
    }
}