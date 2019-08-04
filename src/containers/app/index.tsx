import * as React from 'react';
import styled from 'styled-components';
import { FieldContainer } from '../field';
import { getOneOrTwo, containsMoreThanFour, generateRandomNumbers } from '../../utils';
import * as re from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearState } from '../../actions';

const magicWandImage = require('../../static/magic-wand.svg');

interface Props {
  selectedNumbers: {
    ['1']: Array<number>,
    ['2']: Array<number>
  };
  clearState: () => void;
}

export const App: React.FC<Props> = (props: Props) => {
  const [isWon, setWinState] = React.useState<boolean>(undefined);
  const showResults = () => {
    const isWin: boolean = containsMoreThanFour(props.selectedNumbers['1'])
                           && getOneOrTwo() === props.selectedNumbers['2'][0];
    setWinState(isWin);
  };

  const playAgain = () => {
    props.clearState();
    setWinState(undefined);
  };

  const handleMagicWandClick = () => {
    const randomArray = generateRandomNumbers();
    const isWin = containsMoreThanFour(randomArray) && getOneOrTwo() === getOneOrTwo();
    console.log('isWin mw: ', isWin);
    setWinState(isWin);
  };

  const isShowResultBtnDisabled: boolean = props.selectedNumbers['2'].length === 0 || props.selectedNumbers['1'].length < 8;

  const renderCard = () => {
    if (isWon == undefined) {
      return (
        <React.Fragment>
          <Header>
            <Title>Билет 1</Title>
            <MagicWand onClick={handleMagicWandClick} />
          </Header>
          <FieldContainer serial={1} cellQuantity={19} />
          <FieldContainer serial={2} cellQuantity={2} />
          <ShowResultButton onClick={showResults} disabled={isShowResultBtnDisabled}>Показать результат</ShowResultButton>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Header style={{position: 'absolute', height: '7vh'}}>
            <Title>Билет 1</Title>
            <div style={{fontSize: '2em'}} onClick={playAgain}>&larr;</div>
          </Header>
          <h2>{isWon ? 'Ого, вы выиграли! Поздравляем!' : 'Вы проиграли! :('}</h2>
        </React.Fragment>
      )
    }
  }

  return (
    <Container>
      <Card>
        {renderCard()}
      </Card>
    </Container>
  );
};

export const AppContainer = re.compose(
  connect(
    state => ({
      selectedNumbers: state.selectedNumbers,
    }),
    dispatch => ({
      clearState: bindActionCreators(clearState, dispatch)
    }),
  )
)(App);

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #4568DC 0%, #B06AB3 100%), #EF8E48;
`;

const Card = styled.div`
  position: relative;
  top: 1vh;
  width: 85vw;
  height: 65vh;
  background: #fff;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  position: relative;
  top: 0;
  flex-direction: row;
  height: 15vh;
  width: 95%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const Title = styled.h1`
  position: relative;
  font-size: 2.5vh;
  color: #000;
  font-style: normal;
  font-weight: normal;
  line-height: 22px;
`;

const MagicWand = styled.img.attrs({
  src: magicWandImage
})``;

const ShowResultButton = styled.button`
  position: relative;
  margin-bottom: 5vh;
  width: 60%;
  height: 32%;
  border: 1px solid #000;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: normal;
  font-weight: normal;
  font-size: 4vmin;
  line-height: 16px;
  opacity: 0.64;
  background: transparent;
  transition: all 0.2s ease;
  cursor: pointer;
  outline: none;
  &:hover {
    background: #000;
    color: #fff;
  }
  :disabled {
    cursor: not-allowed;
    border: 1px solid #808080;
    &:hover {
      background: #fff;
      color: #000;
    }
  }
`;