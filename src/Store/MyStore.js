import { createStore } from 'redux';

const store = createStore(phones)

function phones(state = [], action){
    switch (action.type) {
        case 'SET_PHONES':
            state = {phones : action.phones}
            return state
        default:
            return state
    }
}

store.subscribe(() => {
    console.log(store.getState());
});

export default store;