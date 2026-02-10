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
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    marginTop: "40px",
    textAlign: "center",
    fontFamily: "Tahoma",
    direction: "rtl",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
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
    width: "100%",
    padding: "14px 0",
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