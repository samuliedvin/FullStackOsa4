const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  
const counterReducer = (state = initialState, action) => {
    let changedState = null;
    switch (action.type) {
        case 'GOOD':
            const good = state.good
            changedState = { ...state, good: good +1 }
            return changedState
        case 'OK':
            const ok = state.ok
            changedState = { ...state, ok: ok +1 }
            return changedState        
        case 'BAD':
            const bad = state.bad
            changedState = { ...state, bad: bad +1 }
            return changedState        
        case 'ZERO':
            return 0
        default:
            return state
    }
}
  
export default counterReducer