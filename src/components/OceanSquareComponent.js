import React from 'react';

export default function OceanSquareComponent(props) {
    function handleMouseEnter() {
        if (props.data.owner === props.activePlayerId && props.stage === 'setup') {
            props.hover(props.data.id)
        }
    }

    function handleMouseLeave() {
        if (props.data.owner === props.activePlayerId&& props.stage === 'setup'){
            props.offHover(props.data.id)
        }
    }

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

    function displayInSquare() {
        if (props.data.status === 'miss') return (<div className={'resultInSquareMiss'}>x</div>);
        if (props.data.status === 'hit') return (<div className={'resultInSquareHit'}>x</div>);
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