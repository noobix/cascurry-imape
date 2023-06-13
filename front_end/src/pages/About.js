import React from "react";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import MetaData from "../components/MetaData";

const About = () => {
  return (
    <React.Fragment>
      <MetaData title="About Us" />
      <BreadCrumb title="Terms and Conditions" />
      <Container className="policy-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-5">
            <img
              src="https://media.istockphoto.com/id/173014503/photo/generic-store-building-exterior.jpg?s=612x612&w=0&k=20&c=7lL4VHjbexNHTf7_0BbMiaTi7vDzdAR-uv2cwUxgjEQ="
              alt="..."
              className="img-fluid"
            />
          </div>
          <div className="col-7">
            <div className="about-us">
              <h1>About Us</h1>
              <h2>Welcome to our Online Shopping Center</h2>
              <p>
                At our ecommerce solution, we strive to provide a seamless and
                enjoyable shopping experience for our customers. With our online
                shopping center, you can explore a wide range of products from
                the comfort of your own home.
              </p>
              <h2>Our Mission</h2>
              <p>
                Our mission is to deliver high-quality products, exceptional
                customer service, and a convenient shopping experience. We aim
                to exceed our customers' expectations and become a trusted
                destination for all their shopping needs.
              </p>
              <h2>Product Selection</h2>
              <p>
                We carefully curate our product selection to offer a diverse
                range of items that cater to different interests and
                preferences. From electronics and fashion to home decor and
                beauty products, we have something for everyone.
              </p>
              <h2>Secure Online Shopping</h2>
              <p>
                Your security and privacy are of utmost importance to us. We
                employ advanced security measures to protect your personal
                information and ensure secure transactions when you shop with
                us.
              </p>
              <h2>Exceptional Customer Service</h2>
              <p>
                We are committed to providing exceptional customer service and
                support. Our dedicated team is ready to assist you with any
                inquiries, concerns, or feedback you may have. We value your
                satisfaction and aim to make your shopping experience with us a
                positive one.
              </p>
              <h2>Contact Us</h2>
              <p>
                If you have any questions, suggestions, or need assistance,
                please feel free to <a href="contact.html">contact us</a>. We
                are here to help!
              </p>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default About;
