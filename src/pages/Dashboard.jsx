import { useState } from "react";
import PatientCard from "../components/PatientCard";
import Sidebar from "../components/Sidebar";
import SummaryCard from "../components/SummaryCard";

function Dashboard() {
const [search, setSearch] = useState("");

// ข้อมูลตัวอย่าง (Mock Data)
const patients = [
{
name: "สมชาย ใจดี",
age: 20,
gender: "ชาย",
weight: 55,
atk: "Negative",
score: 4,
risk: "High",
image: "https://placehold.co/800x350?text=Throat+Image",
},
{
name: "สมหญิง ดีมาก",
age: 18,
gender: "หญิง",
weight: 48,
atk: "Negative",
score: 2,
risk: "Medium",
image: "https://placehold.co/800x350?text=Throat+Image",
},
{
name: "อนันต์ รุ่งเรือง",
age: 22,
gender: "ชาย",
weight: 60,
atk: "Positive",
score: 1,
risk: "Low",
image: "https://placehold.co/800x350?text=Throat+Image",
},
];

const filteredPatients = patients.filter((patient) =>
patient.name.toLowerCase().includes(search.toLowerCase())
);

const highRiskCount = patients.filter((p) => p.risk === "High").length;
const redFlagCount = 1; // Mock UI

return (
<div style={{ display: "flex" }}> <Sidebar />


  <div
    style={{
      padding: "30px",
      width: "100%",
      background: "#f4f6f8",
      minHeight: "100vh",
    }}
  >
    <h1
      style={{
        color: "#1f2937",
        marginBottom: "25px",
        fontSize: "34px",
      }}
    >
      🏥 Pharmacist Dashboard
    </h1>

    <input
      type="text"
      placeholder="🔍 ค้นหาชื่อผู้ป่วย..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        width: "100%",
        padding: "14px",
        borderRadius: "10px",
        border: "1px solid #d1d5db",
        marginBottom: "25px",
        fontSize: "16px",
      }}
    />

    <div
      style={{
        display: "flex",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      <SummaryCard
        title="ผู้ป่วยวันนี้"
        value={patients.length}
        color="#2196F3"
      />

      <SummaryCard
        title="High Risk"
        value={highRiskCount}
        color="red"
      />

      <SummaryCard
        title="Red Flag"
        value={redFlagCount}
        color="orange"
      />
    </div>

    {filteredPatients.map((patient, index) => (
      <PatientCard
        key={index}
        patient={patient}
        index={index}
      />
    ))}
  </div>
</div>


);
}

export default Dashboard;
