import { useEffect, useState } from "react";
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
  const [answer, setAnswer] = useState("");
  const [unit, setUnit] = useState("");

  const [questionsList, setQuestionsList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (grade && subject) fetchQuestions();
  }, [grade, subject]);

  // ⭐ تحديد المسار الصحيح حسب الصف + المادة
  function getCollectionPath() {
    if (!grade || !subject) return null;

    // ⭐ علوم
    if (subject === "علوم") {
      if (grade === "ثالث متوسط")
        return "questions/RPZx2ymLh8DF1rZUK4WH/grade3_science/tTPyg5jzVMzkgmHGOyIj/items";

      if (grade === "ثاني متوسط")
        return "questions/RPZx2ymLh8DF1rZUK4WH/grade2_science/hb3nWRcE7oxaV8nz1lfA/items";

      if (grade === "أول متوسط")
        return "questions/RPZx2ymLh8DF1rZUK4WH/grade1_science/FMhq0ouj5XLBRBolvKI3/items";
    }

    // ⭐ رياضيات
    if (subject === "رياضيات") {
      if (grade === "ثالث متوسط")
        return "questions/RPZx2ymLh8DF1rZUK4WH/grade3_math/BP5SiHUNdGOtsuzc0Rk0/items";

      if (grade === "ثاني متوسط")
        return "questions/RPZx2ymLh8DF1rZUK4WH/grade2_math/nJcLHiQLFe39q1R7tgTG/items";

      if (grade === "أول متوسط")
        return "questions/RPZx2ymLh8DF1rZUK4WH/grade1_math/ieWOYhm9a7b684wJpn5N/items";
    }

    // ⭐ لغتي
    if (subject === "لغتي") {
      if (grade === "ثالث متوسط")
        return "questions/RPZx2ymLh8DF1rZUK4WH/grade3_lang/BShFx5NMRxqhZRfHMyHQ/items";

      if (grade === "ثاني متوسط")
        return "questions/RPZx2ymLh8DF1rZUK4WH/grade3_lang/BShFx5NMRxqhZRfHMyHQ/items";

      if (grade === "أول متوسط")
        return "questions/RPZx2ymLh8DF1rZUK4WH/grade1_lang/kJV8Lzgx3QgHWqmVuOnK/items";
    }

    return null;
  }

  async function fetchQuestions() {
    const path = getCollectionPath();
    if (!path) return;

    const snapshot = await getDocs(collection(db, path));
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    setQuestionsList(data);
  }

  async function addQuestion() {
    const path = getCollectionPath();
    if (!path) return alert("اختاري الصف والمادة أولاً");

    if (!question.trim() || !answer.trim()) return;

    await addDoc(collection(db, path), {
      question,
      options,
      answer,
      unit,
      type: "mcq",
      grade,
      subject
    });

    clearForm();
    fetchQuestions();
  }

  async function updateQuestion() {
    const path = getCollectionPath();
    if (!editingId || !path) return;

    const ref = doc(db, path, editingId);

    await updateDoc(ref, {
      question,
      options,
      answer: answer || "",
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
    setAnswer("");
    setUnit("");
    setEditingId(null);
  }

  async function deleteQuestion(id) {
    const path = getCollectionPath();
    await deleteDoc(doc(db, path, id));
    fetchQuestions();
  }

  function startEdit(q) {
    setQuestion(q.question);
    setOptions(q.options || ["", "", "", ""]);
    setAnswer(q.answer || "");
    setUnit(q.unit || "");
    setEditingId(q.id);
  }

  function handleOptionChange(index, value) {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  }

  const filteredQuestions = questionsList.filter((q) => {
    const text = (q.question || "") + " " + (q.unit || "");
    return text.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div style={styles.container}>

      {/* ⭐ زر العودة للصفحة الرئيسية */}
      <button
        onClick={() => (window.location.href = "/")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "10px 20px",
          backgroundColor: "#4a90e2",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer"
        }}
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

          <h3 style={styles.smallTitle}>الخيارات</h3>

          {options.map((opt, index) => (
            <input
              key={index}
              type="text"
              placeholder={`الخيار ${index + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              style={styles.input}
            />
          ))}

          <input
            type="text"
            placeholder="الإجابة الصحيحة"
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
      )}

      {grade && subject && (
        <>
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

                {q.unit && (
                  <p style={styles.unitText}>
                    <strong>الوحدة:</strong> {q.unit}
                  </p>
                )}

                <ul>
                  {q.options?.map((opt, i) => (
                    <li key={i} style={styles.optionItem}>
                      {opt}
                    </li>
                  ))}
                </ul>

                <p>
                  <strong>الإجابة الصحيحة:</strong> {q.answer}
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