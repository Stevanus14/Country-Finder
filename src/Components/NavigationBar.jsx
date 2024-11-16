import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../Assets/world.png"; // Import gambar logo kamu

const NavigationBar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar id="nav" expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>
            <img src={logo} alt="Country Finder Logo" style={{ height: "30px", marginRight: "10px" }} />
            <b>Country Finder</b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => navigate("/")}>Countries</Nav.Link>
              <Nav.Link onClick={() => navigate("/cooperation")}>Cooperation</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
