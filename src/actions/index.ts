export const addSelectedNumber = (number: number, field: 1 | 2) => ({
    type: 'ADD_NUMBER',
    number,
    field
});

export const clearState = () => ({
    type: 'CLEAR'
})