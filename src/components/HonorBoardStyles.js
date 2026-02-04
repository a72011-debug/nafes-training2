const styles = {
  container: {
    direction: "rtl",
    fontFamily: "Tahoma",
    minHeight: "100vh",
    paddingTop: "40px",
    paddingBottom: "40px",
    background: "linear-gradient(135deg, #eef3ff, #ffffff)" // تدرج لوني خفيف
  },

  box: {
    width: "80%",
    margin: "auto",
    background: "white",
    padding: "30px",
    borderRadius: "15px",
    border: "3px solid #4a90e2", // إطار جميل
    boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
    textAlign: "center"
  },

  title: {
    fontSize: "34px",
    fontWeight: "bold",
    color: "#004aad",
    marginBottom: "25px",
    textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
  },

  filter: {
    width: "90%",
    padding: "12px",
    fontSize: "18px",
    borderRadius: "8px",
    border: "1px solid #aaa",
    marginBottom: "15px"
  },

  studentItem: {
    fontSize: "20px",
    padding: "12px",
    marginBottom: "12px",
    background: "#f0f5ff",
    borderRadius: "10px",
    border: "1px solid #c7d7f7",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  icon: {
    width: "28px",   // حجم صغير للأيقونة
    height: "28px",
    objectFit: "contain"
  },

  backButton: {
    marginTop: "25px",
    padding: "12px 25px",
    fontSize: "18px",
    backgroundColor: "#4a90e2",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s"
  }
};

export default styles;