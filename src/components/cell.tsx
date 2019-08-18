import * as React from 'react';
import styled, { css } from 'styled-components';
import { SelectedNumbersI } from '../types';
const { useEffect } = React;

interface Props {
  cellNumber: number;
  handleCellSelect?: (index: number) => void;
  serial: number;
}

export const Cell: React.FC<Props> = (props: Props) => {
  const { serial, cellNumber } = props;
  const [isSelected, setSelectState] = React.useState(false);
  useEffect(() => {
    
  }, []);
  const handleClick = () => {
    setSelectState(true);
    props.handleCellSelect(cellNumber);
  };
  return <CellContainer>
            <CellItem
              isSelect={isSelected}
              onClick={handleClick}
              id={`field${serial}-${cellNumber}`}
            >
              {cellNumber}
            </CellItem>
         </CellContainer>
};

const CellContainer = styled.div`
  box-sizing: border-box;
  border-radius: 5px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CellItem = styled.button`
  border: 1px solid #ddd;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
  cursor: pointer;
  outline: none;
  ${p => css`
    width: ${p.isSelect ? '34px' : '40px'};
    height: ${p.isSelect ? '34px' : '40px'};
    background: ${p.isSelect ? '#ffd205' : 'transparent'};
  `}
  &.active {
    width: 34px;
    height: 34px;
    background: #ffd205;
  }
`;