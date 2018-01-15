import React from 'react';

export default function BattleLogComponent(props) {
    function handleReset(){
        props.resetGame()
    }
    return (
        <div>
            {props.stage === "over"
            ?
                <div>
                <h1>GAME OVER</h1>
                <h4 className={'logTitle'}>
                    The winner is Player {props.winner}
                </h4>
                    <button
                        className={'btn indigo btn-large'}
                        onClick={() => handleReset()}
                    >
                        Start New Game
                    </button>
                </div>
                :
            <h4 className={'logTitle'}> Player {props.activePlayerId}'s Turn To Strike</h4>
            }
            <div className={'battleLogContainer'}>
                {props.battleLog.map((logItem, index) => {
                    return (
                        <div className={'battleLogRow'} key={index}>
                            <div style={{width: '100px'}}>{logItem.time}</div>
                            <div style={{width: '300px'}}>{logItem.sentence}</div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}