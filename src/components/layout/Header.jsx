import Cookies from "js-cookie";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toggle from '../../assets/navbar/hamburger.png'
import { EXPIRE_DATE, ROLE, TOKEN } from "../../const";
import { AuthContext } from "../../context/AuthContext";
import './header.css'

const Header = () => {
  const toggleSidebar = () => {
      const MiniSidebar = document.querySelector(".mini_sidebar");
      if(MiniSidebar){
        MiniSidebar.classList.toggle("active")
      }
    }
    let { setRole, setIsAuthenticated,isAuthenticated } = useContext(AuthContext);
    let navigate=useNavigate()
    function logout(){
      console.log(1);
      Cookies.remove(TOKEN)
      Cookies.remove(ROLE)
      Cookies.remove(EXPIRE_DATE)
      setIsAuthenticated(false);
      setRole(null)
      navigate("/")
    }
  return (
    <header id="header">
      <div className="Header_flex container">
        <div className="Logo">
          {isAuthenticated ? (
            <NavLink to="/my-posts" className="finsweet">
              My Blogs
            </NavLink>
          ) : (
            <NavLink to="/" className="finsweet">
              Finsweet
            </NavLink>
          )}
        </div>
        <div className="Right_Link">
          <NavLink to="/" className="lnk">
            Home
          </NavLink>
          <NavLink to="/posts" className="lnk">
            Posts
          </NavLink>
          <NavLink to="/about" className="lnk">
            About Us
          </NavLink>
          {isAuthenticated ? (
            ""
          ) : (
            <NavLink to="/register" className="lnk">
              Register
            </NavLink>
          )}

          {isAuthenticated ? (
            <NavLink to="/account-user" className="login">
              Acount
            </NavLink>
          ) : (
            <NavLink to="/login" className="login">
              Login
            </NavLink>
          )}
          {isAuthenticated ? (
            <button onClick={logout} className="login">
              Log Out
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="mini_sidebar">
          <NavLink className="lnk" to="/">Home</NavLink>
          <NavLink to="/posts" className="lnk">
            Posts
          </NavLink>
          <NavLink className="lnk" to="/about">About Us</NavLink>
          {isAuthenticated ? (
            ""
          ) : (
            <NavLink to="/register" className="lnk">
              Register
            </NavLink>
          )}
          {isAuthenticated ? (
            <NavLink to="/account-user" className="login">
              Acount
            </NavLink>
          ) : (
            <NavLink to="/login" className="login">
              Login
            </NavLink>
          )}
          {isAuthenticated ? (
            <NavLink onClick={logout} className="login">
              Log Out
            </NavLink>
          ) : (
            ""
          )}
        </div>
        <div className="toggle" onClick={toggleSidebar}>
          <img style={{ width: "30px" }} src={toggle} alt="" />
        </div>
      </div>
    </header>
  );
};

export default Header;
