import Sidebar from '@/widgets/sidebar/ui/Sidebar'
import AppRoutes from './routes/AppRoutes'
import './styles/App.css'

const App = () => {

  return (
    <div className='flex w-full'>
      <Sidebar />
      <AppRoutes />
    </div>
  )
}

export default App
