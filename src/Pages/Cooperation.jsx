import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
//import { useNavigate } from "react-router-dom";
import "../App.css";
import "../Detail.css";
import NavigationBar from "../Components/NavigationBar";

const CooperationList = ({ cooperationList, handleRemove }) => {
  // Menampilkan daftar negara kerja sama
  return cooperationList.length > 0 ? (
    cooperationList.map((country, i) => (
      <Card className="Country-card" key={i} onClick={() => (window.location.href = `/detailCountry/${country.name.common}`)} style={{ cursor: "pointer" }}>
        <Card.Img variant="top" src={country.flags.png} />
        <Card.Body className="Country-body">
          <Card.Title>{country.name.common}</Card.Title>
          <button onClick={() => handleRemove(country.name.common)} className="button" style={{ fontSize: "20px" }}>
            Cancel Cooperation
          </button>
        </Card.Body>
      </Card>
    ))
  ) : (
    <p>No countries have established cooperation yet.</p>
  );
};

const Cooperation = () => {
  const [cooperationList, setCooperationList] = useState([]);
  // const navigate = useNavigate();

  // Ambil data kerja sama dari localStorage saat komponen dimuat
  useEffect(() => {
    const storedCooperation = JSON.parse(localStorage.getItem("cooperationList")) || [];
    setCooperationList(storedCooperation);
  }, []);

  // Fungsi untuk menghapus negara dari daftar kerja sama
  const handleRemoveCooperation = (countryName) => {
    const updatedList = cooperationList.filter((country) => country.name.common !== countryName);
    setCooperationList(updatedList);
    localStorage.setItem("cooperationList", JSON.stringify(updatedList));
    alert(`${countryName} has been removed from the cooperation list.`);
  };

  return (
    <div className="App">
      <div className="Navbar">
        <NavigationBar />
      </div>
      <div className="App-header">
        <h1>Cooperation List</h1>
        <div className="Country-container" style={{ marginTop: "20px" }}>
          <CooperationList cooperationList={cooperationList} handleRemove={handleRemoveCooperation} />
        </div>
      </div>
    </div>
  );
};

export default Cooperation;
