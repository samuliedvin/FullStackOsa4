import React from 'react'
import ReactDOM from 'react-dom'


class App extends React.Component {
    
    klik = (nappi) => () => {
        this.props.store.dispatch({type: nappi})
    }

    average = () => {
        const good = this.props.store.getState().good
        const ok = this.props.store.getState().ok
        const bad = this.props.store.getState().bad
        const result = (good - bad) / (good + ok + bad)
        return isNaN(result) ? 'ei ääniä annettu' : result;
    }

    positive = () => {
        let good = this.props.store.getState().good
        let ok = this.props.store.getState().ok
        let bad = this.props.store.getState().bad
        let result = 100 * good / (good + ok + bad)
        return isNaN(result) ? 'ei ääniä annettu' : result + ' %';
    }

    render() {
        const Statistiikka = () => {
            const palautteita = 1
          
            if (palautteita === 0) {
              return (
                <div>
                  <h2>statistiikka</h2>
                  <div>ei yhtään palautetta annettu</div>
                </div>
              )
            }
          
            return (
              <div>
                <h2>statistiikka</h2>
                <table>
                  <tbody>
                    <tr>
                      <td>hyvä</td>
                      <td>{this.props.store.getState().good}</td>
                    </tr>
                    <tr>
                      <td>neutraali</td>
                      <td>{this.props.store.getState().ok}</td>
                    </tr>
                    <tr>
                      <td>huono</td>
                      <td>{this.props.store.getState().bad}</td>
                    </tr>
                    <tr>
                      <td>keskiarvo</td>
                      <td>{this.average()}</td>
                    </tr>
                    <tr>
                      <td>positiivisia</td>
                      <td>{this.positive()}</td>
                    </tr>
                  </tbody>
                </table>
          
                <button>nollaa tilasto</button>
              </div >
            )
          }

        return (
        <div>
            <h2>anna palautetta</h2>
            <button onClick={this.klik('GOOD')}>hyvä</button>
            <button onClick={this.klik('OK')}>neutraali</button>
            <button onClick={this.klik('BAD')}>huono</button>
            <Statistiikka />
        </div>
        )
    }
}

export default App