import * as React from 'react';
import styled from 'styled-components';
import { Cell } from '../../components/cell';
import { connect } from 'react-redux';
import * as re from 'recompose';
import { bindActionCreators } from 'redux';
import { addSelectedNumber } from '../../actions';

interface Props {
  serial: number;
  cellQuantity: number;
  selectedNumbers: any;
  addSelectedNumber: (index: number, serial: number) => void;
};

interface State {
  remainingCells: number;
  selectedCells: Set<number>;
};

export class Field extends React.Component<Props, State> {
  public state: State;
  private cells: Array<React.ReactNode>;

  constructor(props: Props) {
    super(props);
    this.state = {
      remainingCells: this.props.cellQuantity === 19 ? 8 : 1,
      selectedCells: new Set(),
    };
    let index: number = 0;
    this.cells = Array.from(Array(this.props.cellQuantity), () => {
      index++;
      return <Cell
               cellNumber={index}
               key={index}
               handleCellSelect={this.handleCellSelect}
             />
    });
  }

  private handleCellSelect = (index: number): void => {
    if (!this.state.selectedCells.has(index)) {
      this.props.addSelectedNumber(index, this.props.serial);
    }
    this.setState(prevstate => ({
      remainingCells: prevstate.selectedCells.has(index) ?
                      prevstate.remainingCells : prevstate.remainingCells - 1,
      selectedCells: prevstate.selectedCells.add(index),
    }));
  };

  render() {
    const { serial } = this.props;
    const { remainingCells } = this.state;
    return (
      <Container>
        <Header>
          <Title>{`Поле ${serial}`}</Title>
          <Description>{`Осталось отметить: ${remainingCells}`}</Description>
        </Header>
        <CellsContainer disabled={this.state.remainingCells === 0}>
          {this.cells}
        </CellsContainer>
      </Container>
    );
  }
}

export const FieldContainer = re.compose<any, Props>(
  connect(
    state => ({
      selectedNumbers: state.selectedNumbers,
    }),
    dispatch => ({
      addSelectedNumber: bindActionCreators(addSelectedNumber, dispatch)
    })
  )
)(Field);

const Container = styled.div`
  position: relative;
  width: 95%;
  height: 500px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  top: 5vh;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Title = styled.div`
  color: #000;
  font-style: normal;
  font-weight: normal;
  line-height: 22px;
`;

const Description = styled.div`
  position: relative;
  left: 2.5vw;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
`;

const CellsContainer = styled.div`
  position: relative;
  width: 100%;
  top: 7px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  pointer-events: ${(p: any) => p.disabled ? 'none' : ''};
`;