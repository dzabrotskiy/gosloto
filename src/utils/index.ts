export const generateRandomNumbers = (): Array<number> => {
    return Array.from(Array(8), () => {
        return Math.floor(Math.random() * 19 + 1);
    });
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