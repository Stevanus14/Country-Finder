import { useEffect, useState } from "react";
import "../App.css";
import { getCountryList, searchCountry } from "../api";
import NavigationBar from "../Components/NavigationBar";
import { Card } from "react-bootstrap";

const ListCountry = () => {
  const [allCountry, setAllCountry] = useState([]);
  const [error, setError] = useState(null);

  //untuk mengambil data negara ketika dimuat
  useEffect(() => {
    getCountryList().then((data) => {
      setAllCountry(data);
    });
  }, []);

  const AllCountryList = () => {
    //allCountry.length > 0 (jika ada data negara, maka akan ditampilkan)
    /* i adalah index dan key{i} dibutuhkan react untuk mengidentifikasi setiap elemen dalam list yang di-render */
    return allCountry.length > 0 ? (
      allCountry.map((country, i) => (
        <Card className="Country-card" key={i} onClick={() => (window.location.href = `/detailCountry/${country.name.common}`)} style={{ cursor: "pointer" }}>
          <Card.Img variant="top" src={country.flags.png} />
          <Card.Body className="Country-body" style={{ alignContent: "center" }}>
            <Card.Title className="Country-title" style={{ marginBottom: "0" }}>
              {country.name.common}
            </Card.Title>
          </Card.Body>
        </Card>
      ))
    ) : (
      <p>{error || "No countries to display"}</p> // menampilkan pesan error atau pesan default
    );
  };

  const search = async (q) => {
    try {
      if (q.length > 3) {
        const query = await searchCountry(q);
        setError(null); // reset error saat pencarian berhasil
        setAllCountry(query); //update state allCountry dengan hasil pencarian
      } else if (q.length === 0) {
        //saat input search kosong maka akan tampilkan semua list negara lagi
        const allCountries = await getCountryList();
        setError(null); // reset error jika input kosong
        setAllCountry(allCountries);
      }
    } catch (error) {
      console.error("Error while searching for country: ", error);
      setError("Country not found!"); // set pesan error jika negara tidak ditemukan
      setAllCountry([]); // kosongkan daftar negara jika ada error
    }
  };

  // console.log({ allCountry });
  return (
    <div className="App">
      <div className="Navbar">
        <NavigationBar />
      </div>
      <div className="App-header">
        <h1>List of Countries</h1>
        <input placeholder="Search by name.." className="Country-search" onChange={({ target }) => search(target.value)} />
        <div className="Country-container">
          <AllCountryList />
        </div>
      </div>
    </div>
  );
};

export default ListCountry;
