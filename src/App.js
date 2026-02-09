import { useState, useEffect } from "react";
import QuizPage from "./components/QuizPage";
import HonorBoard from "./components/HonorBoard";
import CertificatePage from "./components/CertificatePage";
import TeacherQuestionBank from "./components/TeacherQuestionBank";

import { db } from "./firebase";

import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  addDoc,
  doc
} from "firebase/firestore";

import bgImage from "./assets/certificate-bg1.jpg";

function App() {
  const [page, setPage] = useState("start");
  const [studentName, setStudentName] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");

  const [lastScore, setLastScore] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(null);
  const [totalScore, setTotalScore] = useState(null);

  
  const TEACHER_PASSWORD = "teacher123";
  const [passwordInput, setPasswordInput] = useState("");
  useEffect(() => {
    setPage("start");
  }, []);

  function startQuiz() {
    if (
      studentName.trim() === "" ||
      grade.trim() === "" ||
      subject.trim() === ""
    ) {
      alert("يرجى تعبئة جميع الحقول قبل بدء التدريب");
      return;
    }

    setPage("quiz");
  }

  async function finishQuiz(score, total, cumulativeScore) {
    setLastScore(score);
    setTotalQuestions(total);
    setTotalScore(cumulativeScore);

    try {
 const honorRef = collection(db, "honorBoard");

const q = query(
  honorRef,
  where("name", "==", studentName),
  where("grade", "==", grade),
  where("subject", "==", subject)
);

const snapshot = await getDocs(q);

// ⭐ إذا كان هناك أكثر من سجل لنفس الطالبة في نفس المادة → نحذف الزائد
if (snapshot.size > 1) {
  snapshot.docs.slice(1).forEach(async (d) => {
    await deleteDoc(doc(db, "honorBoard", d.id));
  });
}

if (!snapshot.empty) {
  // ⭐ تحديث السجل الوحيد المتبقي
  const docRef = doc(db, "honorBoard", snapshot.docs[0].id);
  const oldData = snapshot.docs[0].data();

  await updateDoc(docRef, {
    score: oldData.score + score,
    total: oldData.total + total,
    date: new Date().toISOString()
  });

} else {
  // ⭐ إنشاء سجل جديد للمادة
  await addDoc(honorRef, {
    name: studentName,
    grade: grade,
    subject: subject,
    score: score,
    total: total,
    date: new Date().toISOString()
  });
}

    } catch (error) {
      console.error("Error saving honor record:", error);
    }

    setPage("certificate");
  }

  function getQuestionPath(grade, subject) {

    if (grade === "ثالث متوسط" && subject === "علوم") {
      return {
        main:
          "questions/RPZx2ymLh8DF1rZUK4WH/grade3_science/tTPyg5jzVMzkgmHGOyIj/items"
      };
    }

    if (grade === "ثالث متوسط" && subject === "رياضيات") {
      return {
        main:
          "questions/RPZx2ymLh8DF1rZUK4WH/grade3_math/BP5SiHUNdGOtsuzc0Rk0/items"
      };
    }

    if (grade === "ثالث متوسط" && subject === "لغتي") {
      return {
        main:
          "questions/RPZx2ymLh8DF1rZUK4WH/grade3_lang/BShFx5NMRxqhZRfHMyHQ/items"
      };
    }

    if (grade === "ثاني متوسط" && subject === "علوم") {
      return {
        main:
          "questions/RPZx2ymLh8DF1rZUK4WH/grade2_science/hb3nWRcE7oxaV8nz1lfA/items"
      };
    }

    if (grade === "ثاني متوسط" && subject === "رياضيات") {
      return {
        main:
          "questions/RPZx2ymLh8DF1rZUK4WH/grade2_math/nJcLHiQLFe39q1R7tgTG/items"
      };
    }

    if (grade === "ثاني متوسط" && subject === "لغتي") {
      return {
        main:
          "questions/RPZx2ymLh8DF1rZUK4WH/grade3_lang/BShFx5NMRxqhZRfHMyHQ/items"
      };
    }

    if (grade === "أول متوسط" && subject === "علوم") {
      return {
        main:
          "questions/RPZx2ymLh8DF1rZUK4WH/grade1_science/FMhq0ouj5XLBRBolvKI3/items"
      };
    }

    if (grade === "أول متوسط" && subject === "رياضيات") {
      return {
        main:
          "questions/RPZx2ymLh8DF1rZUK4WH/grade1_math/ieWOYhm9a7b684wJpn5N/items"
      };
    }

    if (grade === "أول متوسط" && subject === "لغتي") {
      return {
        main:
          "questions/RPZx2ymLh8DF1rZUK4WH/grade1_lang/kJV8Lzgx3QgHWqmVuOnK/items"
      };
    }
  }

  return (
    <div style={{ direction: "rtl", fontFamily: "Tahoma" }}>

      {page === "start" && (
        <div
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative"
          }}
        >
          <div style={styles.startContainerTransparent}>

            <h1 style={styles.title}>تدريبات نافس</h1>

            <input
              type="text"
              placeholder="أدخلي اسمك"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              style={styles.input}
            />

            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              style={styles.input}
            >
              <option value="">اختاري الصف</option>
              <option value="أول متوسط">أول متوسط</option>
              <option value="ثاني متوسط">ثاني متوسط</option>
              <option value="ثالث متوسط">ثالث متوسط</option>
            </select>

            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={styles.input}
            >
              <option value="">اختاري المادة</option>
              <option value="علوم">علوم</option>
              <option value="رياضيات">رياضيات</option>
              <option value="لغتي">لغتي</option>
            </select>

            <button onClick={startQuiz} style={styles.button}>
              بدء التدريب
            </button>

            <button
              onClick={() => setPage("honor")}
              style={styles.secondaryButton}
            >
              عرض لوحة الشرف
            </button>

            <button
              onClick={() => setPage("teacherLogin")}
              style={styles.secondaryButton}
            >
              إدارة بنك الأسئلة (للمعلمة)
            </button>
          </div>

          {/* ⭐ عبارة الحقوق في أسفل الصفحة */}
          <p
            style={{
              position: "absolute",
              bottom: "15px",
              width: "100%",
              textAlign: "center",
              color: "black",
              fontSize: "18px",
              textShadow: "0 0 5px black"
            }}
          >
            جميع الحقوق محفوظة   
          </p>
        </div>
      )}

      {page === "teacherLogin" && (
        <div style={styles.startContainer}>
          <h2 style={styles.title}>تسجيل دخول المعلمة</h2>

          <input
  type="password"
  placeholder="أدخلي كلمة المرور"
  value={passwordInput}
  onChange={(e) => setPasswordInput(e.target.value)}
  style={styles.input}
/>

<button
  onClick={() => {
    if (passwordInput === TEACHER_PASSWORD) {
     
      localStorage.setItem("teacherAuth", "true");
      setPage("teacher");
    } else {
      alert("كلمة المرور غير صحيحة");
    }
  }}
  style={styles.button}
>
  دخول
</button>

          <button
            onClick={() => setPage("start")}
            style={styles.secondaryButton}
          >
            العودة
          </button>
        </div>
      )}

      

      {page === "teacher" && (
  localStorage.getItem("teacherAuth") === "true" ? (
    <TeacherQuestionBank />
  ) : (
    <p style={{ textAlign: "center", marginTop: "50px", fontSize: "22px" }}>
      ❌ لا يمكنك الدخول. هذه الصفحة خاصة بالمعلمة فقط.
    </p>
  )
)}

      {page === "quiz" && (
        <QuizPage
          studentName={studentName}
          grade={grade}
          subject={subject}
          questionPath={getQuestionPath(grade, subject)}
          onFinish={finishQuiz}
        />
      )}

      {page === "certificate" && (
  lastScore > 5 ? (
    <CertificatePage
      studentName={studentName}
      score={lastScore}
      total={totalQuestions}
      totalScore={totalScore}
      grade={grade}
      subject={subject}
      onBack={() => setPage("start")}
    />
  ) : (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2 style={{ color: "#d9534f", fontSize: "28px" }}>
        لم تحصلي على درجة كافية للحصول على الشهادة
      </h2>
      <p style={{ fontSize: "20px", marginTop: "15px" }}>
        نتيجتك كانت {lastScore} من {totalQuestions}.  
        حاولي مرة أخرى، أنتِ قادرة على الأفضل دائمًا.
      </p>

      <button
        onClick={() => setPage("start")}
        style={{
          marginTop: "25px",
          padding: "12px 25px",
          fontSize: "18px",
          backgroundColor: "#4a90e2",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        العودة للصفحة الرئيسية
      </button>
    </div>
  )
)}
      {page === "honor" && <HonorBoard />}
    </div>
  );
}

export default App;

const styles = {
  startContainerTransparent: {
    width: "450px",
    textAlign: "center",
    padding: "25px",
    background: "rgba(255, 255, 255, 0.75)",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  },

  startContainer: {
    maxWidth: "500px",
    margin: "auto",
    marginTop: "80px",
    textAlign: "center",
    padding: "20px",
    background: "rgba(255,255,255,0.9)",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  },

  title: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#004aad",
    fontWeight: "bold"
  },

  input: {
    width: "90%",
    padding: "12px",
    fontSize: "18px",
    borderRadius: "8px",
    border: "1px solid #aaa",
    marginBottom: "20px"
  },

  button: {
    width: "90%",
    padding: "12px",
    fontSize: "20px",
    backgroundColor: "#4a90e2",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "15px"
  },

  secondaryButton: {
    width: "90%",
    padding: "12px",
    fontSize: "18px",
    backgroundColor: "white",
    color: "#4a90e2",
    border: "2px solid #4a90e2",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px"
  }
};