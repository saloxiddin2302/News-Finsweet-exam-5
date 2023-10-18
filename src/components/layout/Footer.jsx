import Facebook from '../../assets/footer/Facebook.png';
import Twitter from '../../assets/footer/Twitter.png';
import Instagram from '../../assets/footer/Instagram.png';
import Linkden from '../../assets/footer/Linkden.png';

import './footer.css'

const Footer = () => {
  return (
    <footer>
      <div className='fotter container'>
        <div>
          <p className='color_text_footer'>Finstreet 118 2561 Fintown</p>
          <p className='color_text_footer'>Hello@finsweet.com  020 7993 2905</p>
        </div>
        <div className='footer_icon'>
          <a href="https://www.facebook.com/" target='_blank_'><img src={Facebook} alt="" /></a>
          <a href="https://www.twitter.com/" target='_blank_'><img src={Twitter} alt="" /></a>
          <a href="https://www.instagram.com/" target='_blank_'><img src={Instagram} alt="" /></a>
          <a href="https://www.linkden.com/" target='_blank_'><img src={Linkden} alt="" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
