const FilterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.input
    default:
      return state
  }
}

export const setFilter = (input) => {
  return {
    type: 'SET_FILTER',
    input
  }
}


export default FilterReducer