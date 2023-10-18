import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { request } from "../../server/request";
import { AuthContext } from "../../context/AuthContext";
import { setAuthCookies } from "../../utils/setAuthCookies";
import './login.css'

const LoginP = () => {
  // const navigate = useNavigate();
  const { setIsAuthenticated, setRole, setToken } = useContext(AuthContext);
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let { data } = await request.post("auth/login", user);
      const { role, token } = data;
      setIsAuthenticated(true);
      setRole(role);
      setToken(token)
      window.location.reload()
      if (role === "admin") {
        location= "/dashboard";
      } else if (role === "user") {
        location = "/my-posts";
      }
      setAuthCookies(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="all_login">
      <h2 className="login_text_center">Login</h2>
      <div className="Login_inputvs_flex container">
        {loading ? (
          "....Loading"
        ) : (
          <form className="flex_inpvs" onSubmit={submit}>
            <input
              type="text"
              onChange={handleChange}
              value={user.username}
              placeholder="username"
              name="username"
            />
            <input
              type="text"
              onChange={handleChange}
              value={user.password}
              placeholder="password"
              name="password"
            />
            <button className="send" type="submit">
              Log in
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default LoginP;
