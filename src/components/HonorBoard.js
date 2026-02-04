import { useEffect, useState } from "react";
import styles from "./HonorBoardStyles";

import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

import goldMedal from "../assets/gold.png";
import silverMedal from "../assets/silver.png";
import bronzeMedal from "../assets/bronze.png";
import starIcon from "../assets/star.png";

function HonorBoard() {
  const [students, setStudents] = useState([]);
  const [gradeFilter, setGradeFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");

  // ⭐ جلب البيانات من Firestore
  useEffect(() => {
    async function loadData() {
      try {
        const snapshot = await getDocs(collection(db, "honorBoard"));
        const data = snapshot.docs.map((doc) => doc.data());
        setStudents(data);
      } catch (error) {
        console.error("Error loading honor board:", error);
      }
    }

    loadData();
  }, []);

  // ⭐ اختيار الميدالية حسب الترتيب
  const getMedal = (index) => {
    if (index === 0) return goldMedal;
    if (index === 1) return silverMedal;
    if (index === 2) return bronzeMedal;
    return starIcon;
  };

  // ⭐ فلترة + تحويل الدرجات لأرقام + ترتيب + أفضل 10 فقط
  const filteredStudents = students
    .filter((s) => (gradeFilter ? s.grade === gradeFilter : true))
    .filter((s) => (subjectFilter ? s.subject === subjectFilter : true))
    .sort((a, b) => Number(b.score) - Number(a.score)) // ⭐ إصلاح الترتيب
    .slice(0, 10); // ⭐ أفضل 10 فقط

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.title}>لوحة الشرف</h1>

        {/* اختيار الصف */}
        <select
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
          style={styles.filter}
        >
          <option value="">كل الصفوف</option>
          <option value="أول متوسط">أول متوسط</option>
          <option value="ثاني متوسط">ثاني متوسط</option>
          <option value="ثالث متوسط">ثالث متوسط</option>
        </select>

        {/* اختيار المادة */}
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          style={styles.filter}
        >
          <option value="">كل المواد</option>
          <option value="علوم">علوم</option>
          <option value="رياضيات">رياضيات</option>
          <option value="لغتي">لغتي</option>
        </select>

        {/* عرض النتائج */}
        {filteredStudents.length === 0 && (
          <p style={{ fontSize: "20px", color: "#666" }}>
            لا توجد بيانات لهذا الصف والمادة.
          </p>
        )}

        {filteredStudents.map((student, index) => (
          <div key={index} style={styles.studentItem}>
            <img src={getMedal(index)} alt="medal" style={styles.icon} />
            <span>
              {index + 1}. {student.name} — {student.score} نقطة
            </span>
          </div>
        ))}

        <button
          style={styles.backButton}
          onClick={() => (window.location.href = "/")}
        >
          العودة للصفحة الرئيسية
        </button>
      </div>
    </div>
  );
}

export default HonorBoard;