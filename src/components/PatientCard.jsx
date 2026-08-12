import { Link } from "react-router-dom";

function PatientCard({ patient, index }) {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>👤 {patient.name}</h3>

        <span
          style={{
            background:
              patient.risk === "High"
                ? "red"
                : patient.risk === "Medium"
                ? "orange"
                : "green",
            color: "white",
            padding: "6px 12px",
            borderRadius: "20px",
            fontWeight: "bold",
          }}
        >
          {patient.risk}
        </span>
      </div>

      <img
  src={patient.image || "https://placehold.co/300x180?text=No+Image"}
  alt="รูปคอ"
  style={{
    width: "100%",
    borderRadius: "10px",
    margin: "15px 0",
    objectFit: "cover",
    height: "180px",
  }}
/>

      <div
        style={{
          lineHeight: "2",
        }}
      >
        <p>
          <strong>อายุ :</strong> {patient.age} ปี
        </p>

        <p>
          <strong>McIsaac :</strong> {patient.score}
        </p>

        <p>
          <strong>ATK :</strong> Negative
        </p>
      </div>

      <Link
        to={`/patient/${index}`}
        style={{
          textDecoration: "none",
        }}
      >
        <button
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "12px",
            borderRadius: "8px",
            background: "#1976d2",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          ดูรายละเอียด
        </button>
      </Link>
    </div>
  );
}

export default PatientCard;