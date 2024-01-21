import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div>
    <ul className="footer-container">
      <li className="icon-element">
        <FaGoogle className="icon" />
      </li>
      <li className="icon-element">
        <FaTwitter className="icon" />
      </li>
      <li className="icon-element">
        <FaInstagram className="icon" />
      </li>
      <li className="icon-element">
        <FaYoutube className="icon" />
      </li>
    </ul>
    <p className="contact-text">Contact us</p>
  </div>
)

export default Footer
