import React from 'react';

export default function OceanSquareComponent(props) {

    function handleMouseEnter(){
        if(props.selectedShip) console.log(props.selectedShip)
    }

    return (
        <div>
            <div
                className={"oceanSquare"}
                onMouseEnter={handleMouseEnter}
            >
            </div>
        </div>
    )
}