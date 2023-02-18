import React from "react";
import { Link } from "react-router-dom";
import {
  BsLinkedin,
  BsTwitter,
  BsInstagram,
  BsFacebook,
  BsYoutube,
} from "react-icons/bs";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img
                  className="icon"
                  src="/assets/images/newsletter.png"
                  alt="..."
                />
                <h5 className="mb-0 text-white">Signup For Newsletter</h5>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Enter Your Email"
                  aria-label="Enter Your Email"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h6 className="text-white mb-4">Contact Us</h6>
              <div>
                <address className="text-white">
                  Sakumono SSNIT flats
                  <br />
                  216 Broadway Express
                  <br />
                  Store 21b2
                </address>
                <a
                  href="tel: +233 244109010"
                  className="mt-4 d-block mb-2 text-white"
                >
                  +233 244109010
                </a>
                <a
                  href="mailto: sikabuilding@gmail.com"
                  className="mt-4 d-block mb-2 text-white"
                >
                  sikabuilding@gmail.com
                </a>
                <div className="social-icons d-flex align-items-center gap-30 mt-3">
                  <a href="#">
                    <BsYoutube className="text-white fs-5" />
                  </a>
                  <a href="#">
                    <BsTwitter className="text-white fs-5" />
                  </a>
                  <a href="#">
                    <BsFacebook className="text-white fs-5" />
                  </a>
                  <a href="#">
                    <BsLinkedin className="text-white fs-5" />
                  </a>
                  <a href="#">
                    <BsInstagram className="text-white fs-5" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h6 className="text-white mb-4">Information</h6>
              <div className="footer-links d-flex flex-column">
                <Link to="/privicy-policy" className="py-2 mb-1 text-white">
                  Privicy Policy
                </Link>
                <Link to="/refund-policy" className="py-2 mb-1 text-white">
                  Refund Policy
                </Link>
                <Link to="/shipping-policy" className="py-2 mb-1 text-white">
                  Shipping Policy
                </Link>
                <Link
                  to="/terms-and-conditions"
                  className="py-2 mb-1 text-white"
                >
                  Terms & Conditions
                </Link>
                <Link className="py-2 mb-1 text-white">Blogs</Link>
              </div>
            </div>
            <div className="col-3">
              <h6 className="text-white mb-4">Account</h6>
              <div className="footer-links d-flex flex-column">
                <Link className="py-2 mb-1 text-white">About Us</Link>
                <Link className="py-2 mb-1 text-white">FAQ</Link>
                <Link className="py-2 mb-1 text-white">Contact</Link>
              </div>
            </div>
            <div className="col-2">
              <h6 className="text-white mb-4">Quick Links</h6>
              <div className="footer-links d-flex flex-column">
                <Link className="py-2 mb-1 text-white">Laptop</Link>
                <Link className="py-2 mb-1 text-white">Tablet</Link>
                <Link className="py-2 mb-1 text-white">Phones</Link>
                <Link className="py-2 mb-1 text-white">Watch</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center text-white mb-0">
                &copy;{new Date().getFullYear()} Powered by SyncSys
              </p>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
