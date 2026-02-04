function StartPage({ onGoToNamePage }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>مسابقة نافس في العلوم</h1>

      <p style={styles.text}>
        اضغطي على زر "ابدئي" للانتقال إلى صفحة إدخال الاسم.
      </p>

      <button style={styles.startButton} onClick={onGoToNamePage}>
        ابدئي
      </button>

      <p style={styles.footer}>
        إعداد المعلمات: أمينة الرحيلي – سامية الصبحي  
        <br />
       1447 العام الدراسي
      </p>
    </div>
  );
}

export default StartPage;

const styles = {
  container: {
    textAlign: "center",
    marginTop: "80px",
    fontFamily: "Tahoma",
    direction: "rtl"
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
    color: "#4a90e2",
    fontWeight: "bold"
  },
  text: {
    fontSize: "18px",
    marginBottom: "30px",
    color: "#555"
  },
  startButton: {
    padding: "12px 25px",
    fontSize: "20px",
    backgroundColor: "#4a90e2",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s"
  },
  footer: {
    marginTop: "60px",
    fontSize: "16px",
    color: "#777",
    lineHeight: "1.6"
  }
};