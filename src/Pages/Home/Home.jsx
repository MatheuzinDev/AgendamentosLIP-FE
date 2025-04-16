import HamburgerMenu from "../../Components/MenuHamburger/MenuHamburger"
import useIsMobile from "../../hooks/useIsMobile";
import Navbar from "../../Components/Navbar/Navbar";
import "../Home/Home.css"

function Home() {
  const isMobile = useIsMobile();

  return (
      <div className="page-container-home">
          {isMobile ? <HamburgerMenu /> : <Navbar />}
      </div>
  );
}

export default Home
