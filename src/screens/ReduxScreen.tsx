import React from 'react';
import { Field } from '@/components/InteractiveField/components/Field';
import { withRedux } from '@/utils/withRedux';
import { Action } from 'redux';
import { NextMove } from 'components/NextMove';
import { TicTacToeGameState } from '@/rdx/reducer';
import { xMove, oMove } from '@/rdx/actions';

function getReduxScreenState(state: TicTacToeGameState) {
  return {
    gameField: state.gameField,
    nextMove: state.nextMove,
  };
}

interface RawReduxScreenProps {
  nextMove: string;
  gameField: string[][];
  dispatch: (action: Action & { payload?: any }) => void;
}

class RawReduxScreen extends React.Component<RawReduxScreenProps, {}>{
  onCellClick = (x: number, y: number) => {
    const action = this.props.nextMove === 'x' ? xMove : oMove;
    this.props.dispatch(action({ x, y }));
  }

  render() {
    return <div>
      <h1>Open console to observe</h1>
      <NextMove />
      <Field field={this.props.gameField} onClick={this.onCellClick} />
      <pre>{JSON.stringify(this.props, null, 2)}</pre>
    </div>
  }
}

export const ReduxScreen = withRedux(RawReduxScreen, getReduxScreenState);