function SectionCard({ title, children }) {
  return (
    <div
      style={{
        background: "white",
        padding: "24px",
        borderRadius: "12px",
        marginBottom: "25px",
        boxShadow: "0 2px 10px rgba(0,0,0,.08)",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          color: "#1f2937",
        }}
      >
        {title}
      </h2>

      {children}
    </div>
  );
}

export default SectionCard;