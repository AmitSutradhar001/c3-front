import "../../css/components/home/Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-outer-div">
        <div className="footer-inner-div">
          <a href="" className="footer-a">
            <img
              src="home/footerLogo.svg"
              className="footer-img"
              alt="FlowBite Logo"
            />
            <span className="footer-span">COLLAB</span>
          </a>
          <p className="footer-p">
            Lobortis amet mus dolor
            <br /> rhoncus leo fringilla et{" "}
          </p>
        </div>
        <div>
          <h2 className="footer-h2">Resources</h2>
          <ul className="footer-ul">
            <li className="footer-li">
              <a href="" className="footer-li-a">
                Flowbite
              </a>
            </li>
            <li>
              <a href="" className="footer-li-a">
                Tailwind CSS
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="footer-h2">Follow us</h2>
          <ul className="footer-ul">
            <li className="footer-li ">
              <a href="" className="hover:underline ">
                Github
              </a>
            </li>
            <li>
              <a href="" className="footer-li-a">
                Discord
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="footer-h2">Contact Us</h2>
          <ul className="footer-ul">
            <li className="footer-li-s-last">
              <img src="/home/phone.svg" />
              <a href="#" className="footer-li-a ">
                +9132456-78563
              </a>
            </li>
            <li className="footer-li-last">
              <img src="/home/mail.svg" />
              <a href="#" className="footer-li-a ">
                owner15@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
