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

    componentDidMount() {
        this.props.buildBoard(boardMaker(this.props.playerId), this.props.playerId)
    }

    render() {
        return (
            <div>
                <h3>Player {this.props.playerId}</h3>
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
                        />)})
                        :
                        null}
                </div>
            </div>
        )
    }
}