import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'sweetalert2/dist/sweetalert2.css'
import { Provider } from 'react-redux'

import { GlobalStyle } from './styles/GlobalStyle';
import App from './App.tsx'
import { store } from './store/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <>
        <GlobalStyle />
        <App />
      </>
    </Provider>
  </StrictMode>,
)
