import bgImage from "../assets/certificate-bg.jpg";

const styles = {
  container: {
    direction: "rtl",
    fontFamily: "Tahoma",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    paddingTop: "50px"
  },

  certificateBox: {
    width: "70%",
    margin: "auto",
    background: "rgba(255,255,255,0.9)",
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
    border: "4px solid #4a90e2",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
  },

  title: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#004aad",
    marginBottom: "20px"
  },

  text: {
    fontSize: "22px",
    marginBottom: "15px"
  },

  name: {
    fontWeight: "bold",
    color: "#d9534f",
    fontSize: "26px"
  },

  date: {
    marginTop: "20px",
    fontSize: "18px",
    color: "#555"
  },

  printButton: {
    marginTop: "25px",
    padding: "12px 25px",
    fontSize: "20px",
    backgroundColor: "#4a90e2",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },

  backButton: {
    marginTop: "15px",
    padding: "10px 20px",
    fontSize: "18px",
    backgroundColor: "white",
    color: "#4a90e2",
    border: "2px solid #4a90e2",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default styles;