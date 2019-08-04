export const addSelectedNumber = (number: number, field: 1 | 2) => ({
    type: 'ADD_NUMBER',
    number,
    field
});

export const addAllNumbers = (data) => ({
    type: 'ADD_ALL_NUMBERS',
    data,
});

export const clearState = () => ({
    type: 'CLEAR'
})