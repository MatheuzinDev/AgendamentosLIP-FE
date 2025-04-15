import Logo from "../../Components/Logo/Logo"
import FormLogin from "../../Components/FormLogin/FormLogin"
import "../Login/Login.css"

function Login() {
  return (
    <>
      <div className="page-container">
        <Logo />
        <FormLogin />
      </div>
    </>
  )
}

export default Login
