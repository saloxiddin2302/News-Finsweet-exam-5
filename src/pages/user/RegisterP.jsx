import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN } from "../../const";
import { request } from "../../server/request";
import "./login.css";
const token = Cookies.get(TOKEN);
console.log(token);

const RegisterP = () => {
  const navigate = useNavigate();
  const [first_name, setName] = useState("");
  const [last_name, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function signUp(e){
    e.preventDefault();
    const item = { first_name, last_name, username, password };
    await request.post("/auth/register",item);
    navigate("/login");
  }
  useEffect(() => {
    document.querySelector("head title").textContent = "News || REGISTER";
  }, [])

  return (
    <section className="all_login">
      <h2 className="login_text_center">Register</h2>
      <div className="Login_inputvs_flex container">
        <form className="flex_inpvs" onSubmit={signUp}>
          <input
            type="text"
            value={first_name}
            onChange={(e) => setName(e.target.value)}
            placeholder="firstname"
            name="firstname"
            required
          />
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="lastname"
            name="lastname"
            required
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            name="username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            name="password"
            required
          />
          
          <button onClick={signUp} className="send" type="submit">
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegisterP;