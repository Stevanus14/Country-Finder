import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/world.png";

const NavigationBar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar id="nav">
        <Container>
          <Navbar.Brand>
            <img src={logo} alt="Country Finder Logo" style={{ height: "30px", marginRight: "10px" }} />
            <b>Country Finder</b>
          </Navbar.Brand>
          <Nav>
            <Nav.Link onClick={() => navigate("/")} className="nav-link">
              Countries
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/cooperation")} className="nav-link">
              Cooperation
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
