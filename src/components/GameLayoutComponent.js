import React from 'react';
import HeaderComponent from './HeaderComponent'
import ShipPickerComponent from './ShipPickerComponent'
import BattleLogComponent from './BattleLogComponent'

//Renders layout and has logic for what to show on the screen based on game stage
export default function GameLayoutComponent(props) {

    function handleClick() {
        props.startGame()
    }

    return (
        <div>
            <HeaderComponent/>
            <main className={"boardContainer"}>
                {props.children[0]}
                {//At Start of game, middle of page shows button to start
                    props.stage === 'start'
                    ?
                    <button
                        className={"btn red btn-large"}
                        style={{"marginTop": "100px"}}
                        onClick={() => handleClick()}
                    >
                        Click Here To Start Game
                    </button>
                    :
                    //during setup, we show the ship picking tool
                    props.stage === 'setup' ?
                        <ShipPickerComponent
                            activePlayerId={props.activePlayerId}
                            player1Ships={props.player1Ships}
                            player2Ships={props.player2Ships}
                            selectShip={props.selectShip}
                            selectedShip={props.selectedShip}
                        />
                        : //during the GAME and OVER stages we display the game logs
                        <BattleLogComponent
                            stage={props.stage}
                            activePlayerId={props.activePlayerId}
                            battleLog={props.battleLog}
                            winner={props.winner}
                            resetGame={props.resetGame}
                        />
                }
                {props.children[1]}
            </main>
        </div>
    )
}