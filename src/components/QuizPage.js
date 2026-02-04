import { useEffect, useState } from "react";
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

  useEffect(() => {
    async function loadQuestions() {
      try {
        if (!questionPath || !questionPath.main) {
          console.error("❌ questionPath غير موجود");
          return;
        }

        console.log("📌 المسار المستلم:", questionPath.main);

        const itemsRef = collection(db, questionPath.main);

        const snapshot = await getDocs(itemsRef);
        const loaded = snapshot.docs.map((d) => d.data());

        setQuestions(shuffleArray(loaded));
        setLoading(false);
      } catch (error) {
        console.error("Error loading questions:", error);
      }
    }

    loadQuestions();
  }, [questionPath]);

  useEffect(() => {
    setTimeLeft(20);
    setSelected(null);
  }, [currentIndex]);

  useEffect(() => {
    if (loading) return;
    if (currentIndex >= questions.length) return;

    if (timeLeft === 0) {
      goNext(false);
      return;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, loading, currentIndex, questions.length]);

  function goNext(isCorrect) {
    const newScore = isCorrect ? score + 1 : score;

    if (currentIndex < questions.length - 1) {
      setScore(newScore);
      setCurrentIndex((i) => i + 1);
    } else {
      onFinish(newScore, questions.length, newScore);
    }
  }

  function handleAnswer(option) {
    if (selected !== null) return;

    const correct = questions[currentIndex].answer.trim();
    const chosen = option.trim();

    setSelected(option);

    const isCorrect = chosen === correct;

    if (isCorrect) correctSound.play();
    else wrongSound.play();

    setTimeout(() => goNext(isCorrect), 800);
  }

  if (loading) return <div>جاري تحميل الأسئلة...</div>;
  if (currentIndex >= questions.length) return null;

  const q = questions[currentIndex];

  return (
    <div style={{ padding: "20px", direction: "rtl", textAlign: "center" }}>
      <h2>السؤال {currentIndex + 1} من {questions.length}</h2>

      <div style={{
        fontSize: "22px",
        fontWeight: "bold",
        color: timeLeft <= 5 ? "red" : "green",
        marginBottom: "10px"
      }}>
        الوقت المتبقي: {timeLeft} ثانية
      </div>

      <h3 style={{
        marginTop: "35px",
        marginBottom: "25px",
        fontSize: "24px",
        lineHeight: "1.6"
      }}>
        {q.question}
      </h3>

      {q.options.map((opt, i) => {
        let bg = "#fff";

        if (selected !== null) {
          if (opt.trim() === q.answer.trim()) bg = "green";
          else if (opt === selected) bg = "red";
        }

        return (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
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
              cursor: selected !== null ? "not-allowed" : "pointer"
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}