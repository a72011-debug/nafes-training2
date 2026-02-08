import { useEffect, useState, useCallback } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from "firebase/firestore";
import { db } from "../firebase";
import styles from "./TeacherQuestionBankStyles";

function TeacherQuestionBank() {
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [optionImages, setOptionImages] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState(""); // رقم الخيار الصحيح
  const [unit, setUnit] = useState("");

  const [questionImage, setQuestionImage] = useState("");

  const [questionsList, setQuestionsList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ⭐ تحديد المسار الصحيح حسب الصف + المادة
  const getCollectionPath = useCallback(() => {
    if (!grade || !subject) return null;

    if (subject === "علوم") {
      if (grade === "ثالث متوسط")
        return "questions/RPZx2ymLh8DF1rZUK4WH/grade3_science/tTPyg5jzVMzkgmHGOyIj/items";

      if (grade === "ثاني متوسط")
        return "questions/RPZx2ymLh8DF1rZUK4WH/grade2_science/hb3nWRcE7oxaV8nz1lfA/items";

      if (grade === "أول متوسط")
        return "questions/RPZx2ymLh8DF1rZUK4WH/grade1_science/FMhq0ouj5XLBRBolvKI3/items";
    }

    if (subject === "رياضيات") {
      if (grade === "ثالث متوسط")
        return "questions/RPZx2ymLh8DF1rZUK4WH/grade3_math/BP5SiHUNdGOtsuzc0Rk0/items";

      if (grade === "ثاني متوسط")
        return "questions/RPZx2ymLh8DF1rZUK4WH/grade2_math/nJcLHiQLFe39q1R7tgTG/items";

      if (grade === "أول متوسط")
        return "questions/RPZx2ymLh8DF1rZUK4WH/grade1_math/ieWOYhm9a7b684wJpn5N/items";
    }

    if (subject === "لغتي") {
      if (grade === "ثالث متوسط")
        return "questions/RPZx2ymLh8DF1rZUK4WH/grade3_lang/BShFx5NMRxqhZRfHMyHQ/items";

      if (grade === "ثاني متوسط")
        return "questions/RPZx2ymLh8DF1rZUK4WH/grade2_lang/BShFx5NMRxqhZRfHMyHQ/items";

      if (grade === "أول متوسط")
        return "questions/RPZx2ymLh8DF1rZUK4WH/grade1_lang/kJV8Lzgx3QgHWqmVuOnK/items";
    }

    return null;
  }, [grade, subject]);

  // ⭐ جلب الأسئلة
  const fetchQuestions = useCallback(async () => {
    const path = getCollectionPath();
    if (!path) return;

    const snapshot = await getDocs(collection(db, path));
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    setQuestionsList(data);
  }, [getCollectionPath]);

  useEffect(() => {
    if (grade && subject) fetchQuestions();
  }, [grade, subject, fetchQuestions]);

  // ⭐ إضافة سؤال
  async function addQuestion() {
    const path = getCollectionPath();
    if (!path) return alert("اختاري الصف والمادة أولاً");

    if (!question.trim()) return alert("اكتبي نص السؤال");
    if (answer === "") return alert("حددي رقم الإجابة الصحيحة (0–3)");

    await addDoc(collection(db, path), {
      question,
      questionImage,
      options,
      optionImages,
      answer: Number(answer), // ⭐ رقم الخيار الصحيح
      unit,
      type: "mcq",
      grade,
      subject
    });

    clearForm();
    fetchQuestions();
  }

  // ⭐ تعديل سؤال
  async function updateQuestion() {
    const path = getCollectionPath();
    if (!editingId || !path) return;

    const ref = doc(db, path, editingId);

    await updateDoc(ref, {
      question,
      questionImage,
      options,
      optionImages,
      answer: Number(answer),
      unit,
      type: "mcq",
      grade,
      subject
    });

    clearForm();
    fetchQuestions();
  }

  function clearForm() {
    setQuestion("");
    setOptions(["", "", "", ""]);
    setOptionImages(["", "", "", ""]);
    setAnswer("");
    setUnit("");
    setQuestionImage("");
    setEditingId(null);
  }

  async function deleteQuestion(id) {
    const path = getCollectionPath();
    await deleteDoc(doc(db, path, id));
    fetchQuestions();
  }

  function startEdit(q) {
    setQuestion(q.question);
    setQuestionImage(q.questionImage || "");
    setOptions(q.options || ["", "", "", ""]);
    setOptionImages(q.optionImages || ["", "", "", ""]);
    setAnswer(q.answer?.toString() || "");
    setUnit(q.unit || "");
    setEditingId(q.id);
  }

  const filteredQuestions = questionsList.filter((q) => {
    const text = (q.question || "") + " " + (q.unit || "");
    return text.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div style={styles.container}>
      
    {/* ⭐ زر تسجيل الخروج */}
    <button
      onClick={() => {
        localStorage.removeItem("teacherAuth");
        window.location.href = "/";
      }}
      style={{
        margin: "20px",
        padding: "10px 20px",
        backgroundColor: "#d9534f",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "18px"
      }}
    >
      تسجيل خروج
    </button>

      <button
        onClick={() => (window.location.href = "/")}
        style={styles.backButton}
      >
        ⬅ العودة للصفحة الرئيسية
      </button>

      <h1 style={styles.title}>📘 إدارة بنك الأسئلة</h1>

      {/* اختيار الصف */}
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

      {/* اختيار المادة */}
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

      {grade && subject && (
        <>
          {/* نموذج إضافة سؤال */}
          <div style={styles.formBox}>
            <h2 style={styles.subtitle}>
              {editingId ? "✏ تعديل سؤال" : "➕ إضافة سؤال جديد"}
            </h2>

            <textarea
              placeholder="اكتبي نص السؤال هنا (يدعم نص طويل)"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              style={{
                ...styles.input,
                height: "120px",
                resize: "vertical",
                fontSize: "18px"
              }}
            />

            {/* ⭐ صورة السؤال */}
            <input
              type="text"
              placeholder="رابط صورة السؤال (اختياري)"
              value={questionImage}
              onChange={(e) => setQuestionImage(e.target.value)}
              style={styles.input}
            />

            <h3 style={styles.smallTitle}>الخيارات</h3>

            {options.map((opt, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder={`الخيار ${index + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index] = e.target.value;
                    setOptions(newOptions);
                  }}
                  style={styles.input}
                />

                <input
                  type="text"
                  placeholder={`رابط صورة الخيار ${index + 1} (اختياري)`}
                  value={optionImages[index]}
                  onChange={(e) => {
                    const newImages = [...optionImages];
                    newImages[index] = e.target.value;
                    setOptionImages(newImages);
                  }}
                  style={styles.input}
                />
              </div>
            ))}

            {/* ⭐ الإجابة الصحيحة = رقم الخيار */}
            <input
              type="number"
              min="0"
              max="3"
              placeholder="رقم الإجابة الصحيحة (0–3)"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              style={styles.input}
            />

            <input
              type="text"
              placeholder="الوحدة / الدرس (اختياري)"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              style={styles.input}
            />

            {!editingId && (
              <button onClick={addQuestion} style={styles.addButton}>
                ➕ إضافة السؤال
              </button>
            )}

            {editingId && (
              <div style={styles.editButtonsRow}>
                <button onClick={updateQuestion} style={styles.saveEditButton}>
                  💾 حفظ التعديل
                </button>
                <button onClick={clearForm} style={styles.cancelEditButton}>
                  إلغاء التعديل
                </button>
              </div>
            )}
          </div>

          {/* قائمة الأسئلة */}
          <div style={styles.topBar}>
            <input
              type="text"
              placeholder="بحث في الأسئلة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          <h2 style={styles.subtitle}>📄 جميع الأسئلة</h2>

          <div style={styles.questionsList}>
            {filteredQuestions.map((q, index) => (
              <div key={q.id} style={styles.questionCard}>
                <h3 style={styles.questionText}>
                  {index + 1}. {q.question}
                </h3>

                {q.questionImage && (
                  <img
                    src={q.questionImage}
                    alt="صورة السؤال"
                    style={{ maxWidth: "200px", margin: "10px 0" }}
                  />
                )}

                {q.unit && (
                  <p style={styles.unitText}>
                    <strong>الوحدة:</strong> {q.unit}
                  </p>
                )}

                <ul>
                  {q.options?.map((opt, i) => (
                    <li key={i} style={styles.optionItem}>
                      {opt || "(صورة فقط)"}
                      {q.optionImages?.[i] && (
                        <img
                          src={q.optionImages[i]}
                          alt="صورة خيار"
                          style={{ maxWidth: "120px", marginTop: "5px" }}
                        />
                      )}
                    </li>
                  ))}
                </ul>

                <p>
                  <strong>الإجابة الصحيحة:</strong> الخيار رقم {q.answer}
                </p>

                <div style={styles.cardButtonsRow}>
                  <button
                    onClick={() => startEdit(q)}
                    style={styles.editButton}
                  >
                    ✏ تعديل
                  </button>

                  <button
                    onClick={() => deleteQuestion(q.id)}
                    style={styles.deleteButton}
                  >
                    🗑 حذف
                  </button>
                </div>
              </div>
            ))}

            {filteredQuestions.length === 0 && (
              <p style={{ marginTop: "15px" }}>لا توجد أسئلة لهذه المادة.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default TeacherQuestionBank;