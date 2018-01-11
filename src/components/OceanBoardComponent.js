import React, {Component} from 'react';
import OceanSquareComponent from './OceanSquareComponent';

function boardMaker() {
    let emptyBoard = [];
    for (let i = 1; i <= 100; i++) {
        emptyBoard.push(0)
    }
    return emptyBoard
}

export default class OceanBoardComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.buildBoard(boardMaker(), this.props.playerId)
    }

    render() {
        return (
            <div>
                <h3>Player {this.props.playerId}</h3>
                <div className={"oceanBoard"}>
                    {this.props.playerBoard
                        ?
                        this.props.playerBoard.map((square, index) => <OceanSquareComponent key={index}/>)
                        :
                        null}
                </div>
            </div>
        )
    }
}