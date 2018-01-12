import React from 'react';

export default function OceanSquareComponent(props) {
    function handleMouseEnter() {
        if (props.data.owner === props.activePlayerId) props.hover(props.data.id)
    }

    function handleMouseLeave() {
        if (props.data.owner === props.activePlayerId) props.offHover(props.data.id)
    }

    function handleClick() {
        if (props.data.owner === props.activePlayerId) {
            if (props.stage === 'setup') {
                props.assign(props.data.id);
            }
        }
    }

    return (
        <div>
            {props.playerId === props.activePlayerId ?
                <div
                    className={"oceanSquare"}
                    style={{backgroundColor: props.data.color}}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                >
                </div>
                :
                <div
                    className={"oceanSquare"}
                    style={{backgroundColor: "#0f0f7f"}}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                >
                </div>
            }
        </div>
    )
}