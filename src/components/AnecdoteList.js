import React from 'react'
import PropTypes from 'prop-types'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setMessage, resetMessage } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleClick = (anecdote) => () => {
    this.context.store.dispatch(
      voteAnecdote(anecdote.id)
    )
    this.context.store.dispatch(
      setMessage(`You voted '${anecdote.content}'`)
    )
    setTimeout(() => {
      this.context.store.dispatch(resetMessage())
    }, 5000)
  }

  render() {
    const anecdotesToShow = () => {
      const { anecdotes, filter } = this.context.store.getState()
      return anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(filter.toUpperCase()))
    }
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotesToShow().sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.handleClick(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteList