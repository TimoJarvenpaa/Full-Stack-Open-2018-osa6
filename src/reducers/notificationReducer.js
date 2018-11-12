
const NotificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    case 'RESET_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setMessage = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    message
  }
}

export const resetMessage = () => {
  return {
    type: 'RESET_NOTIFICATION'
  }
}

export default NotificationReducer