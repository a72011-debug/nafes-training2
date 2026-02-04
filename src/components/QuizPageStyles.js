const styles = {
  container: {
    maxWidth: "750px",
    margin: "auto",
    padding: "20px",
    direction: "rtl",
    fontFamily: "Tahoma",
    backgroundImage: "url('https://i.imgur.com/8YQF2yH.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    borderRadius: "12px"
  },

  studentName: {
    fontSize: "22px",
    marginBottom: "10px",
    color: "#004aad",
    fontWeight: "bold"
  },

  timer: {
    fontSize: "20px",
    color: "#d9534f",
    marginBottom: "15px",
    fontWeight: "bold"
  },

  question: {
    background: "rgba(255, 255, 255, 0.85)",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "20px",
    fontWeight: "bold"
  },

  optionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "15px",
    marginTop: "20px"
  },

  optionButton: {
    padding: "10px",
    backgroundColor: "white",
    border: "2px solid #4a90e2",
    borderRadius: "12px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "180px",
    transition: "0.3s",
    boxShadow: "0 3px 6px rgba(0,0,0,0.15)"
  },

  optionImage: {
    width: "140px",
    height: "140px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "1px solid #ccc"
  },

  optionText: {
    fontSize: "18px",
    textAlign: "center",
    lineHeight: "1.4",
    fontWeight: "bold"
  },

  loading: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "20px",
    fontWeight: "bold"
  }
};

export default styles;