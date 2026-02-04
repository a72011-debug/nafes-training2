import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function testConnection() {
  const snapshot = await getDocs(collection(db, "ques1"));
  console.log("عدد الأسئلة:", snapshot.size);
}