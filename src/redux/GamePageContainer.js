import GamePageComponent from '../components/GamePageComponent'
import { connect } from 'react-redux';
import { compose } from 'recompose';

function mapStateToProps(state){
    return { ...state }
}

function mapDispatchToProps(dispatch){
    return{
        buildBoard: (newBoard, playerId) => dispatch({type: "BUILD_BOARD", newBoard, playerId}),
        startGame: () => dispatch({type: "START_GAME"}),
        selectShip: (data) => dispatch({type: "SELECT_SHIP", data}),
        hover: (id) => dispatch({type: "HOVER", id}),
        offHover: (id) => dispatch({type: "OFF_HOVER", id}),
        assign: (id) => dispatch({type: "ASSIGN", id})
    }
}

const connectToStore = connect(mapStateToProps, mapDispatchToProps);
export default compose(connectToStore)(GamePageComponent);
