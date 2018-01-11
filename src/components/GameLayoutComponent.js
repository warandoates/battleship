import React from 'react';
import HeaderComponent from './HeaderComponent'


export default function GameLayoutComponent(props) {
    return (
        <div>
            <HeaderComponent/>
            <main className={"boardContainer"}>
              {props.children[0]}
              {props.children[1]}
            </main>
        </div>
    )
}