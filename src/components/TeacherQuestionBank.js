import { useState, useEffect, useCallback } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function TeacherQuestionBank({ questionPath }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // نلف الدالة داخل useCallback حتى لا تتغير كل مرة
  const fetchQuestions = useCallback(async () => {
    try {
      if (!questionPath || !questionPath.main) {
        console.error("❌ questionPath غير موجود");
        return;
      }

      const itemsRef = collection(db, questionPath.main);
      const snapshot = await getDocs(itemsRef);
      const loaded = snapshot.docs.map((d) => d.data());

      setQuestions(loaded);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }, [questionPath]);

  // الآن نضيف fetchQuestions داخل dependencies
  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  if (loading) return <div>جاري تحميل الأسئلة...</div>;

  return (
    <div style={{ padding: "20px", direction: "rtl" }}>
      <h2>بنك الأسئلة</h2>

      {questions.map((q, i) => (
        <div key={i} style={{ marginBottom: "15px" }}>
          <strong>سؤال:</strong> {q.question}
          <br />
          <strong>الإجابة:</strong> {q.answer}
        </div>
      ))}
    </div>
  );
}