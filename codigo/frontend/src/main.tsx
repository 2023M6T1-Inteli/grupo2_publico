import ReactDOM from 'react-dom/client'
import App from './router/router'
import GlobalStyle from './components/GlobalStyle/GlobalStyle'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <GlobalStyle />
    <App />
  </BrowserRouter>
)