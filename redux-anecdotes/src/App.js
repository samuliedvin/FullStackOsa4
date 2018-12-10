import React from 'react';


class App extends React.Component {

  vote = (id) => () => {
    this.props.store.dispatch({
      type: 'VOTE',
      data: { id }
    })
  }

  getId = () => (100000*Math.random()).toFixed(0)

  addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    this.props.store.dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: content,
        id: this.getId(),
        votes: 0
      }
    })
    event.target.anecdote.value = ''
  }


  render() {
    const anecdotes = this.props.store.getState()
    // En tiedä pitikö tallentaa järjestys storeen. En tosin tiedä onko siitä juurikaan hyötyä. Mennään näillä: 
    const sortedAnecdotes = anecdotes.sort((a, b) => {
      if(a.votes > b.votes) return -1;
      if(a.votes < b.votes) return 1;
      return 0;
    })
    return (
      <div>
        <h2>Anecdotes</h2>
        {sortedAnecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="anecdote" /></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App