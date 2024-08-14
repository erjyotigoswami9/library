import { legacy_createStore, combineReducers } from 'redux'
import { data_reducer } from './dataReducer'

const rootReducer = combineReducers({
    data : data_reducer ,
})

export const store = legacy_createStore(rootReducer) ;