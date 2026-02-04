import React, { useState } from "react";

function StudentNamePage({ onSubmitName }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim() !== "") {
      onSubmitName(name);
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>أدخلي اسمك لبدء المسابقة</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="اكتبي اسمك هنا"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          متابعة
        </button>
      </form>
    </div>
  );
}

export default StudentNamePage;

const styles = {
  container: {
    textAlign: "center",
    marginTop: "80px",
    fontFamily: "Tahoma",
    direction: "rtl"
  },
  title: {
    fontSize: "28px",
    marginBottom: "25px",
    color: "#4a90e2"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center"
  },
  input: {
    width: "250px",
    padding: "10px",
    fontSize: "18px",
    borderRadius: "8px",
    border: "1px solid #aaa",
    textAlign: "center"
  },
  button: {
    padding: "10px 25px",
    fontSize: "18px",
    backgroundColor: "#4a90e2",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};