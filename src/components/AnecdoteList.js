import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setMessage, resetMessage } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  handleClick = (anecdote) => () => {
    this.props.voteAnecdote(anecdote.id)
    this.props.setMessage(`You voted '${anecdote.content}'`)
    setTimeout(() => {
      this.props.resetMessage()
    }, 5000)
  }

  render() {
    const anecdotesToShow = () => {
      const { anecdotes, filter } = this.props
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setMessage,
  resetMessage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)