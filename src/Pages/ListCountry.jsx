import { useEffect, useState } from "react";
import "../App.css";
import { getCountryList, searchCountry } from "../api";
import NavigationBar from "../Components/NavigationBar";
import { Card } from "react-bootstrap";

const ListCountry = () => {
  const [allCountry, setAllCountry] = useState([]);
  const [error, setError] = useState(null); // Menambahkan state error untuk menampilkan pesan error

  useEffect(() => {
    getCountryList().then((data) => {
      setAllCountry(data);
    });
  }, []);

  const AllCountryList = () => {
    //allCountry.length > 0 (jika ada data negara, maka akan ditampilkan)
    return allCountry.length > 0 ? (
      allCountry.map((country, i) => (
        <Card className="Country-card" key={i} onClick={() => (window.location.href = `/detailCountry/${country.name.common}`)} style={{ cursor: "pointer" }}>
          <Card.Img variant="top" src={country.flags.png} />
          <Card.Body className="Country-body">
            <Card.Title>{country.name.common}</Card.Title>
          </Card.Body>
        </Card>
      ))
    ) : (
      <p>{error || "No countries to display"}</p> // Menampilkan pesan error atau pesan default
    );
  };

  const search = async (q) => {
    try {
      if (q.length > 3) {
        const query = await searchCountry(q);
        setError(null); // Reset error ketika pencarian berhasil
        setAllCountry(query);
      } else if (q.length === 0) {
        const allCountries = await getCountryList();
        setError(null); // Reset error jika input kosong
        setAllCountry(allCountries);
      }
    } catch (error) {
      console.error("Error while searching for country: ", error);
      setError("Country not found!"); // Set pesan error jika negara tidak ditemukan
      setAllCountry([]); // Kosongkan daftar negara jika ada error
    }
  };

  // console.log({ allCountry });
  return (
    <div className="App">
      <div className="Navbar">
        <NavigationBar />
      </div>
      <div className="App-header">
        <h1>Web Country List</h1>
        <input placeholder="Search by name.." className="Country-search" onChange={({ target }) => search(target.value)} />
        <div className="Country-container">
          <AllCountryList /> {/* Memanggil komponen sebagai JSX */}
        </div>
      </div>
    </div>
  );
};

export default ListCountry;
