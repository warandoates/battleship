import React from 'react';
import HeaderComponent from './HeaderComponent'
import ShipPickerComponent from './ShipPickerComponent'

export default function GameLayoutComponent(props) {
    console.log(props)
    return (
        <div>
            <HeaderComponent/>
            <main className={"boardContainer"}>
                {props.children[0]}
                <ShipPickerComponent/>
                {props.children[1]}
            </main>
        </div>
    )
}