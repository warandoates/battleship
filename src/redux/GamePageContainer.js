import GamePageComponent from '../components/GamePageComponent'
import { connect } from 'react-redux';
import { compose } from 'recompose';

function mapStateToProps(state){
    return { ...state }
}

function mapDispatchToProps(dispatch){
    return{
        buildBoard: (newBoard, playerId) => dispatch({type: "BUILD_BOARD", newBoard, playerId}),
        startGame: () => dispatch({type: "START_GAME"})
    }
}

const connectToStore = connect(mapStateToProps, mapDispatchToProps);
export default compose(connectToStore)(GamePageComponent);
