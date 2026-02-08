import { useEffect, useState, useCallback } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function QuizPage({ questionPath, onFinish }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const correctSound = new Audio("/sounds/correct.mp3");
  const wrongSound = new Audio("/sounds/wrong.mp3");

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // تحميل الأسئلة
  useEffect(() => {
    async function loadQuestions() {
      try {
        if (!questionPath || !questionPath.main) {
          console.error("❌ questionPath غير موجود");
          return;
        }

        const itemsRef = collection(db, questionPath.main);
        const snapshot = await getDocs(itemsRef);
        const loaded = snapshot.docs.map((d) => d.data());

        setQuestions(shuffleArray(loaded).slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.error("Error loading questions:", error);
      }
    }

    loadQuestions();
  }, [questionPath]);

  // الانتقال للسؤال التالي
  const goNext = useCallback(
    (isCorrect) => {
      const newScore = isCorrect ? score + 1 : score;

      if (currentIndex < questions.length - 1) {
        setScore(newScore);
        setCurrentIndex((i) => i + 1);
      } else {
        onFinish(newScore, questions.length, newScore);
      }
    },
    [score, currentIndex, questions.length, onFinish]
  );

  // إعادة ضبط المؤقت عند الانتقال
  useEffect(() => {
    setTimeLeft(20);
    setSelected(null);
  }, [currentIndex]);

  // المؤقت — بعد الإصلاح
  useEffect(() => {
    if (loading) return;

    // ⭐ إذا انتهت الأسئلة — أوقف المؤقت نهائيًا
    if (currentIndex >= questions.length) return;

    if (timeLeft === 0) {
      goNext(false);
      return;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, loading, currentIndex, questions.length, goNext]);

  // عند اختيار الإجابة
  function handleAnswer(index) {
    if (selected !== null) return;

    setSelected(index);

    const correctIndex = Number(questions[currentIndex].answer);
    const isCorrect = index === correctIndex;

    if (isCorrect) correctSound.play();
    else wrongSound.play();

    setTimeout(() => goNext(isCorrect), 800);
  }

  if (loading) return <div>جاري تحميل الأسئلة...</div>;

  // ⭐ منع ظهور أي سؤال إضافي بعد انتهاء الأسئلة
  if (currentIndex >= questions.length) {
    return <div></div>;
  }

  const q = questions[currentIndex];

  return (
    <div style={{ padding: "20px", direction: "rtl", textAlign: "center" }}>
      <h2>السؤال {currentIndex + 1} من {questions.length}</h2>

      <div
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          color: timeLeft <= 5 ? "red" : "green",
          marginBottom: "10px",
        }}
      >
        الوقت المتبقي: {timeLeft} ثانية
      </div>

      <h3
        style={{
          marginTop: "35px",
          marginBottom: "25px",
          fontSize: "24px",
          lineHeight: "1.6",
        }}
      >
        {q.question}
      </h3>

      {/* صورة السؤال */}
      {q.questionImage && (
        <img
          src={q.questionImage}
          alt="صورة السؤال"
          style={{ maxWidth: "80%", margin: "15px auto", borderRadius: "10px" }}
        />
      )}

      {q.options.map((opt, i) => {
        let bg = "#fff";

        if (selected !== null) {
          if (i === Number(q.answer)) bg = "green"; // الصحيح
          else if (i === selected) bg = "red"; // اختيار الطالب
        }

        return (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            disabled={selected !== null}
            style={{
              display: "block",
              margin: "12px auto",
              padding: "12px 18px",
              minWidth: "260px",
              maxWidth: "80%",
              fontSize: "18px",
              backgroundColor: bg,
              color: selected !== null ? "white" : "black",
              border: "1px solid #ccc",
              borderRadius: "10px",
              cursor: selected !== null ? "not-allowed" : "pointer",
            }}
          >

            {/* نص الخيار */}
            {opt && (
              <div style={{ marginBottom: "10px" }}>
                {opt}
              </div>
            )}

            {/* صورة الخيار */}
            {q.optionImages && q.optionImages[i] && (
              <img
                src={q.optionImages[i]}
                alt="صورة الخيار"
                style={{
                  maxWidth: "200px",
                  display: "block",
                  margin: "10px auto",
                  borderRadius: "10px"
                }}
              />
            )}

          </button>
        );
      })}
    </div>
  );
}