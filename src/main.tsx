import { createRoot } from 'react-dom/client'
import Provider from './app/provider/provider.tsx'
import App from './app/App.tsx'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
    <Provider>
      <App />
    </Provider>,
)
