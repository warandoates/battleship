import React from 'react';
import HeaderComponent from './HeaderComponent'
import ShipPickerComponent from './ShipPickerComponent'

export default function GameLayoutComponent(props) {

    function handleClick(){
        props.startGame()
    }

    return (
        <div>
            <HeaderComponent/>
            <main className={"boardContainer"}>
                {props.children[0]}
                {props.stage === 'start'
                    ?
                    <button
                        className={"btn red"}
                        style={{"marginTop": "100px"}}
                        onClick={() => handleClick()}
                    >
                        Click Here To Start Game
                    </button>
                    :
                    props.stage === 'setup' ?
                    <ShipPickerComponent
                        activePlayerId={props.activePlayerId}
                        player1Ships={props.player1Ships}
                        player2Ships={props.player2Ships}
                        selectShip={props.selectShip}
                        selectedShip={props.selectedShip}
                    />
                        :
                        <h1>GAME ON!</h1>
                }
                {props.children[1]}
            </main>
        </div>
    )
}