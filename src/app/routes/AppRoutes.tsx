import { Route, Routes } from "react-router"
import { Dashboard } from "../../pages/dashboard"
import { Directory } from "../../pages/directory"
import { Orders } from "../../pages/orders"
const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/directory" element={<Directory/>} />
        <Route path="/orders" element={<Orders/>} />
    </Routes>
  )
}

export default AppRoutes