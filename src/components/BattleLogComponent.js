import React from 'react';

export default function BattleLogComponent(props) {
    console.log(props)
    return (
        <div>
            <h4 className={'logTitle'}> Player {props.activePlayerId}'s Turn To Strike</h4>
            <div className={'battleLogContainer'}>
                {props.battleLog.map(logItem => {
                    return (
                        <div className={'battleLogRow'}>
                            <div style={{width: '80px'}}>{logItem.time}</div>
                            <div style={{width: '320px'}}>{logItem.sentence}</div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}