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
            winner={props.winner}
            resetGame={props.resetGame}
        >
            <OceanBoardComponent
                playerId={1}
                playerBoard={props.playerOneBoard}
                hover={props.hover}
                offHover={props.offHover}
                assign={props.assign}
                attack={props.attack}
                activePlayerId={props.activePlayerId}
                stage={props.stage}
                playerShips={props.player1Ships}
                fleetLost={props.fleetLost}
            />
            <OceanBoardComponent
                playerId={2}
                playerBoard={props.playerTwoBoard}
                hover={props.hover}
                offHover={props.offHover}
                assign={props.assign}
                attack={props.attack}
                activePlayerId={props.activePlayerId}
                stage={props.stage}
                playerShips={props.player2Ships}
                fleetLost={props.fleetLost}
            />
        </GameLayoutComponent>
    )
}