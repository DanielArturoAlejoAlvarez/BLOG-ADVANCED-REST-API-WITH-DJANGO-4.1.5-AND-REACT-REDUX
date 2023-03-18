import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import RootReducer from './redux/reducers'

const initialState = {}

const middleware = [thunk]

const store = createStore(
    RootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store