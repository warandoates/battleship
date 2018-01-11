import React from 'react';
import GameLayoutComponent from './GameLayoutComponent';
import OceanBoardComponent from './OceanBoardComponent';

export default function GamePageComponent(props){
        return (
           <GameLayoutComponent>
               <OceanBoardComponent playerId={1} buildBoard={props.buildBoard} playerBoard={props.playerOneBoard} />
               <OceanBoardComponent playerId={2} buildBoard={props.buildBoard} playerBoard={props.playerTwoBoard}/>
           </GameLayoutComponent>
        )
}