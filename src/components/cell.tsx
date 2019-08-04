import * as React from 'react';
import styled, { css } from 'styled-components';

interface Props {
  cellNumber: number;
  handleCellSelect?: (index: number) => void;
}

export const Cell: React.FC<Props> = (props: Props) => {
  const [isSelected, setSelectState] = React.useState(false);
  const handleClick = () => {
    setSelectState(true);
    props.handleCellSelect(props.cellNumber);
  };
  return <CellContainer>
            <CellItem
              isSelect={isSelected}
              onClick={handleClick}>
              {props.cellNumber}
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
`;