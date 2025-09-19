import { createRoot } from 'react-dom/client'
import Provider from './provider/provider.tsx'
import App from './App.tsx'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
    <Provider>
      <App />
    </Provider>,
)
