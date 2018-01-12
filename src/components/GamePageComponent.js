import React from 'react';
import GameLayoutComponent from './GameLayoutComponent';
import OceanBoardComponent from './OceanBoardComponent';

export default function GamePageComponent(props) {
    // console.log('>>> ', props);
    return (
        <GameLayoutComponent
            stage={props.stage}
            startGame={props.startGame}
            activePlayerId={props.activePlayerId}
            player1Ships={props.player1Ships}
            player2Ships={props.player2Ships}
        >
            <OceanBoardComponent
                playerId={1}
                buildBoard={props.buildBoard}
                playerBoard={props.playerOneBoard}
            />
            <OceanBoardComponent
                playerId={2}
                buildBoard={props.buildBoard}
                playerBoard={props.playerTwoBoard}
            />
        </GameLayoutComponent>
    )
}