function ResultPage({ name, score, total, onRestart }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎉 تهانينا يا {name}</h1>

      <p style={styles.score}>
        نتيجتك: {score} من {total}
      </p>

      <button style={styles.button} onClick={onRestart}>
        إعادة الاختبار
      </button>
    </div>
  );
}

export default ResultPage;

const styles = {
  container: {
    textAlign: "center",
    marginTop: "80px",
    direction: "rtl",
    fontFamily: "Tahoma"
  },
  title: {
    fontSize: "30px",
    color: "#4a90e2",
    marginBottom: "20px"
  },
  score: {
    fontSize: "22px",
    marginBottom: "30px"
  },
  button: {
    padding: "12px 25px",
    fontSize: "18px",
    backgroundColor: "#4a90e2",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};