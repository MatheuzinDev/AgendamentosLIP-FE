import Login from "./Pages/Login/Login"
import Home from "./Pages/Home/Home"
import Agendamento from "./Pages/Agendamento/Agendamento"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Historico from "./Pages/Historico/Historico"
import PedidosSupervisor from "./Pages/PedidosSupervisor/PedidosSupervisor"
import QrCode from "./Pages/QrCode/QrCode"
import Perfil from "./Pages/Perfil/Perfil"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/agendamento/:mesaId" element={<Agendamento />} />
        <Route
          path="/pedidos-supervisor"
          element={
            <ProtectedRoute allowedRoles={['SUPERVISOR']}>
              <PedidosSupervisor />
            </ProtectedRoute>
          }
        />
        <Route path="/qrcode" element={<QrCode />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App