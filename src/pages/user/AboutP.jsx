import right from "../../assets/right.png"
import left from "../../assets/left.png";
import './about.css'
import { useEffect } from "react";
const AboutP = () => {
  useEffect(() => {
    document.querySelector("head title").textContent = "Najot News || ABOUT";
  }, [])
  return (
    <section>
      <div className="container">
        <div className="aboutpage">
          <div className="top">
            <div className="left">
              <h3 className="our">Our mision</h3>
              <h2 className="creat">
                Creating valuable content for creatives all around the world
              </h2>
              <p className="lr">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
                blandit massa enim nec. Scelerisque viverra mauris in aliquam
                sem. At risus viverra adipiscing at in tellus.
              </p>
            </div>
            <div className="right">
              <h3 className="our">Our Vision</h3>
              <h2 className="creat">A platform that empowers individuals to improve</h2>
              <p className="lr">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
                blandit massa enim nec. Scelerisque viverra mauris in aliquam
                sem. At risus viverra adipiscing at in tellus.
              </p>
            </div>
          </div>
          <div className="center">
            <div className="left">
              <h1 className="ourh1">Our team of creatives</h1>
              <h2 className="ourh2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </h2>
              <p className="ourp">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat.
              </p>
            </div>
            <div className="right">
              <img src={right} alt="" />
            </div>
          </div>
          <div className="bottom">
            <div className="right">
              <img src={left} alt="" />
            </div>
            <div className="left">
              <h1>Our team of creatives</h1>
              <h2>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutP;
