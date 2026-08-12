function SummaryCard({ title, value, color }) {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        width: "220px",
        boxShadow: "0 4px 12px rgba(0,0,0,.1)",
        borderLeft: `8px solid ${color}`,
      }}
    >
      <h3
        style={{
          margin: 0,
          color: "#6b7280",
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          marginTop: "15px",
          marginBottom: 0,
          fontSize: "56px",
          fontWeight: "700",
          color: "#1f2937",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default SummaryCard;