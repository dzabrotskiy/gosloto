import { SelectedNumbersI } from '../types';

export const generateRandomNumbers = (): Array<number> => {
    const result: Array<number> = [];
    for (let i = 0; i < 8; i++) {
      const temp = Math.floor(Math.random() * 19 + 1);
      if (!result.includes(temp)) {
          result.push(temp);
      } else {
          i--;
      }
    }
    return result;
};

export const getOneOrTwo = (): number => {
    return Math.floor(Math.random() * 2 + 1);
}

export const containsMoreThanFour = (array: Array<number>): boolean => {
    let count: number = 0;
    const randomArray = generateRandomNumbers();
    for (const el of randomArray) {
        if (array.includes(el)) {
            count++;
        }
    }
    return count >= 4;
};

export const getWinState = (data: SelectedNumbersI): boolean => {
    const isSecondFieldWin: boolean = data['2'][0] === getOneOrTwo();
    if (isSecondFieldWin) {
        if (containsMoreThanFour(data['1'])) {
            return true;
        }
    }
    return false;
};