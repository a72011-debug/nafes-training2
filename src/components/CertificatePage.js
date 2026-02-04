import bgImage from "../assets/certificate-bg.jpg";

export default function CertificatePage({
  studentName,
  score,
  total,
  totalScore,
  grade,
  subject,
  onBack
}) {
  return (
    <div
      style={{
        padding: "40px",
        direction: "rtl",
        textAlign: "center",
        fontFamily: "Tahoma",
        minHeight: "100vh",

        // ⭐ خلفية الشهادة
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          padding: "35px",
          borderRadius: "15px",
          width: "80%",
          maxWidth: "650px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
        }}
      >
        {/* ⭐ عنوان الشهادة */}
        <h1 style={{ fontSize: "32px", marginBottom: "10px", color: "#004aad" }}>
          شهادة تفوّق وتميّز
        </h1>

        {/* ⭐ نص رسمي */}
        <p style={{ fontSize: "20px", lineHeight: "1.8", marginBottom: "20px" }}>
          يسر منصة <strong>تدريبات نافس</strong> أن تمنح الطالبة:
          <br />
          <span style={{ fontSize: "26px", fontWeight: "bold", color: "#222" }}>
            {studentName}
          </span>
          <br />
          هذه الشهادة تقديرًا لجهودها المميزة وأدائها الرائع في مادة:
          <br />
          <strong>{subject}</strong>
          <br />
          وقد حققت نتيجة مشرّفة بلغت:
          <br />
          <strong>{score}</strong> من <strong>{total}</strong>
          <br />
          وذلك في الصف:
          <br />
          <strong>{grade}</strong>
        </p>

        {/* ⭐ مجموع النقاط (اختياري) */}
        {totalScore !== null && (
          <h3 style={{ fontSize: "22px", marginBottom: "20px" }}>
            مجموع نقاطك: <strong>{totalScore}</strong>
          </h3>
        )}

        {/* ⭐ عبارة تحفيزية */}
        <p
          style={{
            fontSize: "18px",
            fontStyle: "italic",
            color: "#444",
            marginTop: "10px",
            lineHeight: "1.8"
          }}
        >
          "النجاح لا يصنعه الحظ… بل يصنعه الإصرار، والإصرار يبدأ بخطوة،
          وقد خطوتِها بثقة. استمري، فالمستقبل ينتظرك."
        </p>

        {/* ⭐ زر العودة */}
        <button
          onClick={onBack}
          style={{
            marginTop: "25px",
            padding: "12px 25px",
            backgroundColor: "#4a90e2",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "20px",
            cursor: "pointer"
          }}
        >
          العودة للصفحة الرئيسية
        </button>
      </div>
    </div>
  );
}