import Login from "./Pages/Login/Login"
import Home from "./Pages/Home/Home"
import Agendamento from "./Pages/Agendamento/Agendamento"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/agendamento/:mesaId" element={<Agendamento />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App