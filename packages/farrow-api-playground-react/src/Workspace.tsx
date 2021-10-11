import store from './store'
import { Provider } from 'react-redux'
import { App } from './App'

export const Workspace = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
