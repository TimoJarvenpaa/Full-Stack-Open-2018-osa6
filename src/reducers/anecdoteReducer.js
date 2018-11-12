const generateId = () => (100000 * Math.random()).toFixed(0)

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE': {
      const old = state.filter(a => a.id !== action.id)
      const voted = state.find(a => a.id === action.id)
      return [...old, { ...voted, votes: voted.votes + 1 }]
    }
    case 'CREATE':
      return [...state, { content: action.content, id: generateId(), votes: 0 }]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const anecdoteCreation = (content) => {
  return {
    type: 'CREATE',
    content
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    id
  }
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

export default reducer