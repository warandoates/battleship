import React from 'react';
import GameLayoutComponent from './GameLayoutComponent';
import OceanBoardComponent from './OceanBoardComponent';

export default function GamePageComponent(props) {
    return (
        <GameLayoutComponent
            stage={props.stage}
            startGame={props.startGame}
            activePlayerId={props.activePlayerId}
            player1Ships={props.player1Ships}
            player2Ships={props.player2Ships}
            selectShip={props.selectShip}
            selectedShip={props.selectedShip}
            battleLog={props.battleLog}
        >
            <OceanBoardComponent
                playerId={1}
                buildBoard={props.buildBoard}
                playerBoard={props.playerOneBoard}
                hover={props.hover}
                offHover={props.offHover}
                assign={props.assign}
                activePlayerId={props.activePlayerId}
                stage={props.stage}
            />
            <OceanBoardComponent
                playerId={2}
                buildBoard={props.buildBoard}
                playerBoard={props.playerTwoBoard}
                hover={props.hover}
                offHover={props.offHover}
                assign={props.assign}
                activePlayerId={props.activePlayerId}
                stage={props.stage}
            />
        </GameLayoutComponent>
    )
}