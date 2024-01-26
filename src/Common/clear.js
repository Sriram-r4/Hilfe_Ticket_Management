export default function logout(navigate) {
    const user = localStorage.getItem("role");
    if (user !== null) {
      localStorage.removeItem("id");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      localStorage.removeItem("uname");
      localStorage.removeItem("fname");
      localStorage.removeItem("lname");
      localStorage.removeItem("company");
      localStorage.removeItem("phno");
      localStorage.removeItem("desg");
      localStorage.removeItem("tickets");
    }
    navigate("/signin")
  }