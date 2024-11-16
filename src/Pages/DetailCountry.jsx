import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Detail.css";

const DetailCountry = ({ detail, isInCooperation, handleOfferCooperation }) => {
  return (
    <section className="container-detail">
      <div className="button-detail-page">
        <div>
          <button onClick={() => window.history.back()} className="button">
            Back
          </button>
        </div>
        <div>
          <button
            onClick={handleOfferCooperation}
            className="button"
            disabled={isInCooperation} // tombol dimatikan jika sudah ada kerja sama
          >
            {isInCooperation ? "Already in Cooperation" : "Offer Cooperation"}
          </button>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="flag-container">
          <img className="flag-image" src={detail.flags?.png} alt={`${detail.name?.common} flag`} />
          <p className="flag-description">{detail.flags?.alt || "No description available"}</p>
        </div>
        <div className="info-container">
          <h3 className="detail-title">Country: {detail.name?.common}</h3>
          <h3 className="detail-subtitle">Capital: {detail.capital?.[0]}</h3>
          <h3 className="detail-subtitle">Population: {detail.population?.toLocaleString()}</h3>
          <h3 className="detail-subtitle">Region: {detail.region}</h3>
          <h3 className="detail-subtitle">Independent: {detail.independent ? "Yes" : "No"}</h3>
          <h3 className="detail-subtitle">
            Currency:{" "}
            {Object.values(detail.currencies || {})
              .map((currency) => `${currency.name} (${currency.symbol})`)
              .join(", ")}
          </h3>
          <h3 className="detail-subtitle">Languages: {Object.values(detail.languages || {}).join(", ")}</h3>
          <h3 className="detail-subtitle">
            Location:{" "}
            <a href={detail.maps?.googleMaps} target="_blank" rel="noopener noreferrer" className="detail-link">
              Google Maps
            </a>
          </h3>
        </div>
        <div className="symbol-container">
          <img className="coat-of-arms" src={detail.coatOfArms?.png} alt={`${detail.name?.common} coat of arms`} />
        </div>
      </div>
    </section>
  );
};

const DetailCountryPage = () => {
  //useParams mengambil parameter id dari URL, yang berisi nama negara.
  const { id } = useParams();
  const [countryDetail, setCountryDetail] = useState(null);
  const [isInCooperation, setIsInCooperation] = useState(false);

  //useEffect mengambil data detail negara dari API
  useEffect(() => {
    // Fetch detail negara
    axios
      .get(`https://restcountries.com/v3.1/name/${id}`)
      .then((response) => {
        const country = response.data[0];
        setCountryDetail(country);

        // Cek apakah negara sudah dalam list cooperation
        const storedCooperation = JSON.parse(localStorage.getItem("cooperationList")) || [];
        const isAlreadyInCooperation = storedCooperation.some((cooperatedCountry) => cooperatedCountry.name.common === country.name.common);
        setIsInCooperation(isAlreadyInCooperation);
      })
      .catch((error) => console.error("Error fetching country data: ", error));
  }, [id]);

  const handleOfferCooperation = () => {
    const success = Math.random() > 0.5; //peluang 50% sukses
    if (success) {
      //jika berhasil data disimpan di localStorage
      const storedCooperation = JSON.parse(localStorage.getItem("cooperationList")) || [];
      storedCooperation.push(countryDetail);
      localStorage.setItem("cooperationList", JSON.stringify(storedCooperation));
      setIsInCooperation(true);
      alert(`Successfully established cooperation with ${countryDetail.name.common}`);
    } else {
      alert(`Cooperation offer to ${countryDetail.name.common} failed.`);
    }
  };

  if (!countryDetail) return <p>Loading...</p>;

  return <DetailCountry detail={countryDetail} isInCooperation={isInCooperation} handleOfferCooperation={handleOfferCooperation} />;
};

export default DetailCountryPage;
