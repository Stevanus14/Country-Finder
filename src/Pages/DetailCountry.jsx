import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Detail.css";

const DetailCountry = (props) => {
  const { detail } = props;

  return (
    <section className="container-detail">
      <div>
        <button onClick={() => (window.location.href = `/`)} className="button-back">
          BACK
        </button>
      </div>

      <div className="content-wrapper">
        {/* Bendera dan lambang negara di sebelah kiri */}
        <div className="flag-container">
          <img className="flag-image" src={detail.flags?.png} alt={`${detail.name?.common} flag`} />
          <p className="flag-description">{detail.flags?.alt || "No description available"}</p>
        </div>

        {/* Informasi negara di sebelah kanan */}
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
  const { id } = useParams();
  const [countryDetail, setCountryDetail] = useState(null);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${id}`)
      .then((response) => {
        setCountryDetail(response.data[0]);
      })
      .catch((error) => console.error("Error fetching country data: ", error));
  }, [id]);

  if (!countryDetail) return <p>Loading...</p>;

  return <DetailCountry detail={countryDetail} />;
};

export default DetailCountryPage;
