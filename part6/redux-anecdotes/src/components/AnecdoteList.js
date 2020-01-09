import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer.js'

const AnecdoteList = (props) => {

  const anecdotes = props.anecdotesToShow

  const vote = (id) => {
    props.addVote(id)
    const anecdote = anecdotes.find(n => n.id === id)
    props.showNotification(`you voted '${anecdote.content}'`)
    setTimeout(() => {
      props.hideNotification()
    }, 5000)
  }

  return (
    <div>
      {props.anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: state.anecdotes
    .filter(anecdote =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes),
    filter: state.filter
  }
}

const mapDispatchToProps = {
  addVote,
  showNotification,
  hideNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)