import React from 'react';

// Individual square / position. There are 100 of these per ocean board
export default function OceanSquareComponent(props) {

    // Handles hovering over square - only of interest during setup
    function handleMouseEnter() {
        if (props.data.owner === props.activePlayerId && props.stage === 'setup') {
            props.hover(props.data.id)
        }
    }

    // Handles removing cursor from square - only of interest during setup
    function handleMouseLeave() {
        if (props.data.owner === props.activePlayerId&& props.stage === 'setup'){
            props.offHover(props.data.id)
        }
    }

    // Handles clicking specific square on screen. Assigning during SETUP. Attacking during GAME.
    function handleClick() {
        if(props.data.stage === "over") return;
        if (props.data.owner === props.activePlayerId) {
            if (props.stage === 'setup') {
                props.assign(props.data.id);
            }
        }
        else{
            if(props.stage === 'game'){
                props.attack(props.data)
            }
        }
    }

    // Decides content of a square on screen (red and grey x's based on hit/miss)
    function displayInSquare() {
        if (props.data.status === 'miss') return (<div className={'resultInSquareMiss'}>x</div>);
        if (props.data.status === 'hit') return (<div className={'resultInSquareHit'}>x</div>);
        return null;
    }

    return (
        <div>
            {props.playerId === props.activePlayerId
            && (props.stage === 'setup' || props.shipsVisible !== false)
                ?
                <div
                    className={"oceanSquare"}
                    style={{backgroundColor: props.data.color}}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                >
                    {displayInSquare()}
                </div>
                :
                <div
                    className={"oceanSquare"}
                    style={{backgroundColor: "#0f0f7f"}}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                >
                    {displayInSquare()}
                </div>
            }
        </div>
    )
}