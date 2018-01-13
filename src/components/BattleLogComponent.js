import React from 'react';

export default function BattleLogComponent(props) {
    return (
        <div>
            <h4 className={'logTitle'}> Player {props.activePlayerId}'s Turn To Strike</h4>
            <div className={'battleLogContainer'}>
                {props.battleLog.map(logItem => {
                    return (
                        <div className={'battleLogRow'}>
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