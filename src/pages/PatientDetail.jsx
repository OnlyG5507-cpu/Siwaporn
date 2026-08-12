import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard";

function PatientDetail() {
  const { id } = useParams();

  const [patient, setPatient] = useState(null);

  const [soap, setSoap] = useState({
    s: "",
    o: "",
    a: "",
    p: "",
  });

  const [medication, setMedication] = useState({
    name: "",
    quantity: "",
    instruction: "",
  });

  const [redFlags, setRedFlags] = useState({
    nightCough: false,
    legSwelling: false,
    chestPain: false,
    hypoglycemia: false,
    hyperglycemia: false,
    footUlcer: false,
    severeHeadache: false,
    facialDroop: false,
    dyspnea: false,
    frequentInhaler: false,
  });

  const [followUp, setFollowUp] = useState({
    type: "Viral URI",
    day: "Day 3",
    startDate: "",
    status: "Pending",
    improved: false,
    fever: false,
    soreThroat: false,
    atkResult: "",
    referred: false,
    note: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const saved = JSON.parse(localStorage.getItem("patients")) || [];

    if (saved[id]) {
      setPatient(saved[id]);

      if (saved[id].soap) setSoap(saved[id].soap);
      if (saved[id].medication) setMedication(saved[id].medication);
      if (saved[id].redFlags) setRedFlags(saved[id].redFlags);
      if (saved[id].followUp) setFollowUp(saved[id].followUp);
    }
  }, [id]);

  const saveSOAP = () => {
    const saved = JSON.parse(localStorage.getItem("patients")) || [];
    if (!saved[id]) return;

    saved[id] = { ...saved[id], soap };

    localStorage.setItem("patients", JSON.stringify(saved));
    alert("บันทึก SOAP Note เรียบร้อยแล้ว");
  };

  const saveMedication = () => {
    const saved = JSON.parse(localStorage.getItem("patients")) || [];
    if (!saved[id]) return;

    saved[id] = { ...saved[id], medication };

    localStorage.setItem("patients", JSON.stringify(saved));
    alert("บันทึกการจ่ายยาเรียบร้อยแล้ว");
  };

  const saveRedFlags = () => {
    const saved = JSON.parse(localStorage.getItem("patients")) || [];
    if (!saved[id]) return;

    const hasRedFlag = Object.values(redFlags).some(Boolean);

    saved[id] = {
      ...saved[id],
      redFlags,
      hasRedFlag,
    };

    localStorage.setItem("patients", JSON.stringify(saved));
    alert("บันทึก Red Flag เรียบร้อยแล้ว");
  };

  const saveFollowUp = () => {
    const saved = JSON.parse(localStorage.getItem("patients")) || [];
    if (!saved[id]) return;

    saved[id] = {
      ...saved[id],
      followUp,
    };

    localStorage.setItem("patients", JSON.stringify(saved));
    alert("บันทึกการติดตามเรียบร้อยแล้ว");
  };

  const getNextFollowUpDate = () => {
    if (!followUp.startDate) return "-";

    const date = new Date(followUp.startDate);

    if (followUp.type === "Viral URI") {
      date.setDate(date.getDate() + 3);
    } else {
      if (followUp.day === "Day 3") date.setDate(date.getDate() + 3);
      if (followUp.day === "Day 5") date.setDate(date.getDate() + 5);
      if (followUp.day === "Day 14") date.setDate(date.getDate() + 14);
    }

    return date.toLocaleDateString("th-TH");
  };

  const exportPatient = () => {
    const saved = JSON.parse(localStorage.getItem("patients")) || [];
    if (!saved[id]) return;

    const patientToExport = {
      ...saved[id],
      soap,
      medication,
      redFlags,
      followUp,
    };

    const blob = new Blob([JSON.stringify(patientToExport, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `patient_${patientToExport.name}.json`;

    a.click();
    URL.revokeObjectURL(url);
  };

  if (!patient) {
    return <div style={{ padding: "30px" }}>กำลังโหลดข้อมูลผู้ป่วย...</div>;
  }

  const redFlagDetected = Object.values(redFlags).some(Boolean);

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1000px",
        margin: "auto",
        background: "#f4f6f8",
        minHeight: "100vh",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#1976d2",
          fontWeight: "bold",
        }}
      >
        ← กลับ Dashboard
      </Link>

      <h1 style={{ marginTop: "20px", color: "black" }}>👤 Patient Detail</h1>

      <SectionCard title="📷 รูปคอผู้ป่วย">
        <img
          src={patient.image || "https://placehold.co/800x350?text=No+Image"}
          alt="รูปคอ"
          style={{
            width: "100%",
            borderRadius: "12px",
            objectFit: "cover",
            maxHeight: "400px",
          }}
        />
      </SectionCard>

      <SectionCard title="👤 ข้อมูลผู้ป่วย">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div>
            <strong>ชื่อ</strong>
            <p>{patient.name}</p>
          </div>

          <div>
            <strong>อายุ</strong>
            <p>{patient.age} ปี</p>
          </div>

          <div>
            <strong>เพศ</strong>
            <p>{patient.gender}</p>
          </div>

          <div>
            <strong>น้ำหนัก</strong>
            <p>{patient.weight} กก.</p>
          </div>

          <div>
            <strong>ATK</strong>
            <p>{patient.atk}</p>
          </div>

          <div>
            <strong>McIsaac Score</strong>
            <p
              style={{
                color:
                  patient.risk === "High"
                    ? "red"
                    : patient.risk === "Medium"
                    ? "orange"
                    : "green",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              {patient.score} ({patient.risk})
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="📝 SOAP Note">
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <textarea
            rows="3"
            placeholder="S (Subjective)"
            value={soap.s}
            onChange={(e) => setSoap({ ...soap, s: e.target.value })}
            style={{ padding: "12px", borderRadius: "8px" }}
          />

          <textarea
            rows="3"
            placeholder="O (Objective)"
            value={soap.o}
            onChange={(e) => setSoap({ ...soap, o: e.target.value })}
            style={{ padding: "12px", borderRadius: "8px" }}
          />

          <textarea
            rows="3"
            placeholder="A (Assessment)"
            value={soap.a}
            onChange={(e) => setSoap({ ...soap, a: e.target.value })}
            style={{ padding: "12px", borderRadius: "8px" }}
          />

          <textarea
            rows="3"
            placeholder="P (Plan)"
            value={soap.p}
            onChange={(e) => setSoap({ ...soap, p: e.target.value })}
            style={{ padding: "12px", borderRadius: "8px" }}
          />

          <button
            onClick={saveSOAP}
            style={{
              background: "#16a34a",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            💾 บันทึก SOAP Note
          </button>
        </div>
      </SectionCard>

      <SectionCard title="💊 บันทึกการจ่ายยา">
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            placeholder="ชื่อยา"
            value={medication.name}
            onChange={(e) =>
              setMedication({ ...medication, name: e.target.value })
            }
            style={{ padding: "12px", borderRadius: "8px" }}
          />

          <input
            type="text"
            placeholder="จำนวน"
            value={medication.quantity}
            onChange={(e) =>
              setMedication({ ...medication, quantity: e.target.value })
            }
            style={{ padding: "12px", borderRadius: "8px" }}
          />

          <textarea
            rows="4"
            placeholder="วิธีใช้ยา"
            value={medication.instruction}
            onChange={(e) =>
              setMedication({
                ...medication,
                instruction: e.target.value,
              })
            }
            style={{ padding: "12px", borderRadius: "8px" }}
          />

          <button
            onClick={saveMedication}
            style={{
              background: "#16a34a",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            💾 บันทึกการจ่ายยา
          </button>
        </div>
      </SectionCard>

      <SectionCard title="🚨 Red Flag Alert">
        <div
          style={{
            background: redFlagDetected ? "#fee2e2" : "#dcfce7",
            border: redFlagDetected
              ? "1px solid #ef4444"
              : "1px solid #22c55e",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "20px",
            color: redFlagDetected ? "#b91c1c" : "#166534",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          {redFlagDetected
            ? "🚨 พบ Red Flag ต้องประเมินเพิ่มเติม"
            : "✅ ยังไม่พบอาการอันตราย"}
        </div>

        <h3 style={{ color: "#b91c1c" }}>โรคหัวใจ / ไต</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          <label>
            <input
              type="checkbox"
              checked={redFlags.nightCough}
              onChange={(e) =>
                setRedFlags({
                  ...redFlags,
                  nightCough: e.target.checked,
                })
              }
            />
            ไอตอนนอน
          </label>

          <label>
            <input
              type="checkbox"
              checked={redFlags.legSwelling}
              onChange={(e) =>
                setRedFlags({
                  ...redFlags,
                  legSwelling: e.target.checked,
                })
              }
            />
            ขาบวม
          </label>

          <label>
            <input
              type="checkbox"
              checked={redFlags.chestPain}
              onChange={(e) =>
                setRedFlags({
                  ...redFlags,
                  chestPain: e.target.checked,
                })
              }
            />
            เจ็บแน่นหน้าอก
          </label>
        </div>

        <h3 style={{ color: "#b91c1c", marginTop: "20px" }}>เบาหวาน</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          <label>
            <input
              type="checkbox"
              checked={redFlags.hypoglycemia}
              onChange={(e) =>
                setRedFlags({
                  ...redFlags,
                  hypoglycemia: e.target.checked,
                })
              }
            />
            Hypoglycemia
          </label>

          <label>
            <input
              type="checkbox"
              checked={redFlags.hyperglycemia}
              onChange={(e) =>
                setRedFlags({
                  ...redFlags,
                  hyperglycemia: e.target.checked,
                })
              }
            />
            Hyperglycemia
          </label>

          <label>
            <input
              type="checkbox"
              checked={redFlags.footUlcer}
              onChange={(e) =>
                setRedFlags({
                  ...redFlags,
                  footUlcer: e.target.checked,
                })
              }
            />
            แผลเท้า
          </label>
        </div>

        <h3 style={{ color: "#b91c1c", marginTop: "20px" }}>
          ความดัน / Stroke
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          <label>
            <input
              type="checkbox"
              checked={redFlags.severeHeadache}
              onChange={(e) =>
                setRedFlags({
                  ...redFlags,
                  severeHeadache: e.target.checked,
                })
              }
            />
            ปวดหัวรุนแรง
          </label>

          <label>
            <input
              type="checkbox"
              checked={redFlags.facialDroop}
              onChange={(e) =>
                setRedFlags({
                  ...redFlags,
                  facialDroop: e.target.checked,
                })
              }
            />
            ปากเบี้ยว
          </label>
        </div>

        <h3 style={{ color: "#b91c1c", marginTop: "20px" }}>Asthma / COPD</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          <label>
            <input
              type="checkbox"
              checked={redFlags.dyspnea}
              onChange={(e) =>
                setRedFlags({
                  ...redFlags,
                  dyspnea: e.target.checked,
                })
              }
            />
            หอบ
          </label>

          <label>
            <input
              type="checkbox"
              checked={redFlags.frequentInhaler}
              onChange={(e) =>
                setRedFlags({
                  ...redFlags,
                  frequentInhaler: e.target.checked,
                })
              }
            />
            ใช้ยาพ่นบ่อย
          </label>
        </div>

        <button
          onClick={saveRedFlags}
          style={{
            background: "#dc2626",
            color: "white",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            width: "100%",
            marginTop: "20px",
          }}
        >
          💾 บันทึก Red Flag
        </button>
      </SectionCard>

      <div
        style={{
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          borderRadius: "10px",
          padding: "15px",
          color: "#1d4ed8",
          fontWeight: "bold",
        }}
      >
        📅 กำหนดติดตามครั้งถัดไป: {getNextFollowUpDate()}
      </div>

      <SectionCard title="📅 Follow-up Tracking">
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div>
            <label style={{ fontWeight: "bold" }}>ประเภทการติดตาม</label>
            <select
              value={followUp.type}
              onChange={(e) =>
                setFollowUp({ ...followUp, type: e.target.value })
              }
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            >
              <option value="Viral URI">Viral URI</option>
              <option value="COVID-19">COVID-19</option>
            </select>
          </div>

          {followUp.type === "COVID-19" && (
            <div>
              <label style={{ fontWeight: "bold" }}>รอบการติดตาม</label>
              <select
                value={followUp.day}
                onChange={(e) =>
                  setFollowUp({ ...followUp, day: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="Day 3">Day 3</option>
                <option value="Day 5">Day 5</option>
                <option value="Day 14">Day 14</option>
              </select>
            </div>
          )}

          <div>
            <label style={{ fontWeight: "bold" }}>วันที่เริ่มรักษา</label>
            <input
              type="date"
              value={followUp.startDate}
              onChange={(e) =>
                setFollowUp({ ...followUp, startDate: e.target.value })
              }
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div>
            <label style={{ fontWeight: "bold" }}>สถานะการติดตาม</label>
            <select
              value={followUp.status}
              onChange={(e) =>
                setFollowUp({ ...followUp, status: e.target.value })
              }
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            >
              <option value="Pending">ยังไม่ติดตาม</option>
              <option value="Completed">ติดตามแล้ว</option>
            </select>
          </div>

          <h3 style={{ color: "#1d4ed8" }}>ตัวชี้วัด</h3>

          <label>
            <input
              type="checkbox"
              checked={followUp.improved}
              onChange={(e) =>
                setFollowUp({
                  ...followUp,
                  improved: e.target.checked,
                })
              }
            />
            อาการดีขึ้น
          </label>

          <label>
            <input
              type="checkbox"
              checked={followUp.fever}
              onChange={(e) =>
                setFollowUp({
                  ...followUp,
                  fever: e.target.checked,
                })
              }
            />
            มีไข้
          </label>

          <label>
            <input
              type="checkbox"
              checked={followUp.soreThroat}
              onChange={(e) =>
                setFollowUp({
                  ...followUp,
                  soreThroat: e.target.checked,
                })
              }
            />
            เจ็บคอ
          </label>

          <div>
            <label style={{ fontWeight: "bold" }}>ผล ATK</label>
            <select
              value={followUp.atkResult}
              onChange={(e) =>
                setFollowUp({
                  ...followUp,
                  atkResult: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">-- เลือกผล ATK --</option>
              <option value="Positive">Positive</option>
              <option value="Negative">Negative</option>
            </select>
          </div>

          <label>
            <input
              type="checkbox"
              checked={followUp.referred}
              onChange={(e) =>
                setFollowUp({
                  ...followUp,
                  referred: e.target.checked,
                })
              }
            />
            ส่งต่อโรงพยาบาล
          </label>

          <div>
            <label style={{ fontWeight: "bold" }}>บันทึกผลการติดตาม</label>
            <textarea
              rows="4"
              placeholder="เช่น อาการดีขึ้น ไม่มีไข้ รับประทานอาหารได้"
              value={followUp.note}
              onChange={(e) =>
                setFollowUp({
                  ...followUp,
                  note: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                resize: "vertical",
              }}
            />
          </div>

          <button
            onClick={saveFollowUp}
            style={{
              background: "#2563eb",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            💾 บันทึกการติดตาม
          </button>
        </div>
      </SectionCard>

      <button
        onClick={exportPatient}
        style={{
          background: "#7c3aed",
          color: "white",
          padding: "14px",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          width: "100%",
          marginTop: "20px",
        }}
      >
        📤 Export ข้อมูลผู้ป่วยกลับ
      </button>
    </div>
  );
}

export default PatientDetail;