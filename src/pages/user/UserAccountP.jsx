import { useState } from "react";
import { request } from "../../server/request";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserAccountP = () => {
  const [first_name, setName] = useState("");
  const [last_name, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const navigate=useNavigate();
  useEffect(() => {
    request("/auth/me").then(({ data }) => {
      const { first_name, last_name, username } = data;
      setName(first_name);
      setLastname(last_name);
      setUsername(username);
      console.log(data);
    });
  }, []);

  async function saveAccount(e) {
    e.preventDefault();
    const body = {
      first_name,
      last_name,
      username,
    };
    try {
      const response = await request.put("/auth/details", body);
      console.log(response);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section style={{height:"75vh"}} className="all_login">
      <h2 className="login_text_center">Account</h2>
      <div className="Login_inputvs_flex container">
        <form onSubmit={saveAccount} className="flex_inpvs">
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

          <button className="send" type="submit">
            Save
          </button>
        </form>
      </div>
    </section>
  );
};

export default UserAccountP;
