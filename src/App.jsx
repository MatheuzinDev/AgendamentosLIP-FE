import Login from "./Pages/Login/Login"
import Home from "./Pages/Home/Home"
import Agendamento from "./Pages/Agendamento/Agendamento"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Historico from "./Pages/Historico/Historico"
import PedidosSupervisor from "./Pages/PedidosSupervisor/PedidosSupervisor"
import QrCode from "./Pages/QrCode/QrCode"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/agendamento/:mesaId" element={<Agendamento />} />
        <Route path="/pedidos-supervisor" element={<PedidosSupervisor />} />
        <Route path="/qrcode" element={<QrCode />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App