import GamePageComponent from '../components/GamePageComponent'
import { connect } from 'react-redux';
import { compose } from 'recompose';

function mapStateToProps(state){
    return { ...state }
}

function mapDispatchToProps(dispatch){
    return{
        testFunction: () => dispatch({ type: "TEST" }),
        buildBoard: (newBoard, playerId) => dispatch({type: "BUILD_BOARD", newBoard, playerId})
    }
}

const connectToStore = connect(mapStateToProps, mapDispatchToProps);
export default compose(connectToStore)(GamePageComponent);
