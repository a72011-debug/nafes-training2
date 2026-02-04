import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc } from "firebase/firestore";
import questions from "./questions.json" with { type: "json" };

// إعداد Firebase
const firebaseConfig = {
  apiKey: "AIzaSyByA0a2eIPvozOlTTsw3E_0EnATn1cgtd4",
  authDomain: "nafes-quiz-5f0ee.firebaseapp.com",
  projectId: "nafes-quiz-5f0ee",
  storageBucket: "nafes-quiz-5f0ee.appspot.com",
  messagingSenderId: "100330179052",
  appId: "1:100330179052:web:9f3235d9991e885dd458c9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// المسار الصحيح 100٪ لإضافة الأسئلة داخل الوثيقة المحددة
const path = collection(
  doc(db, "questions", "RPZx2ymLh8DF1rZUK4WH", "grade3_science", "tTPyg5jzVMzkgmHGOyIj"),
  "items"
);

// رفع الأسئلة
async function upload() {
  for (let q of questions) {
    const formatted = {
      question: q.question,
      options: [q.option1, q.option2, q.option3, q.option4],
      answer: q.correct,
      unit: q.unit,
      level: q.level
    };

    await addDoc(path, formatted);
    console.log("تم رفع سؤال:", q.question);
  }

  console.log("🎉 تم رفع جميع الأسئلة بنجاح!");
}

upload();