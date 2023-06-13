import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import MetaData from "../components/MetaData";

const TermsAndConditions = () => {
  return (
    <React.Fragment>
      <MetaData title="Terms and Conditions" />
      <BreadCrumb title="terms-and-conditions" />
      <Container className="policy-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy">
              <img
                src="https://unicertglobal.com/wp-content/uploads/2019/03/TERMS-CONDITIONS-image-1.jpg"
                alt="..."
                className="img-fluid"
              />
              <div className="terms-conditions">
                <h1>Terms and Conditions</h1>
                <h2>1. Acceptance of Terms</h2>
                <p>
                  Welcome to our website. By accessing and using this website,
                  you acknowledge and agree to comply with the following terms
                  and conditions.
                </p>
                <h2>2. Intellectual Property</h2>
                <p>
                  All content on this website, including but not limited to
                  text, graphics, logos, images, videos, and software, is the
                  property of our company and is protected by intellectual
                  property laws. You may not use, reproduce, or distribute any
                  content from this website without prior written permission.
                </p>
                <h2>3. Use of Website</h2>
                <p>
                  You agree to use this website for lawful purposes only and in
                  a manner that does not infringe upon the rights of others or
                  restrict or inhibit their use and enjoyment of the website.
                  You are prohibited from engaging in any activity that may
                  damage, disable, or impair the website or interfere with any
                  other user's ability to access or use the website.
                </p>
                <h2>4. Privacy Policy</h2>
                <p>
                  Our Privacy Policy governs the collection, use, and disclosure
                  of personal information provided by users of this website. By
                  using this website, you consent to the collection, use, and
                  disclosure of your personal information as outlined in our
                  Privacy Policy.
                </p>
                <h2>5. Links to Third-Party Websites</h2>
                <p>
                  This website may contain links to third-party websites for
                  your convenience and information. We do not endorse or assume
                  any responsibility for the content, privacy policies, or
                  practices of these websites. You should review the terms and
                  conditions and privacy policies of these websites before using
                  them.
                </p>
                <h2>6. Limitation of Liability</h2>
                <p>
                  We make every effort to provide accurate and up-to-date
                  information on this website. However, we do not warrant the
                  accuracy, completeness, or reliability of the information and
                  materials provided. You use this website at your own risk, and
                  we shall not be liable for any direct, indirect, incidental,
                  consequential, or punitive damages arising out of your access
                  to or use of this website.
                </p>
                <h2>7. Changes to Terms and Conditions</h2>
                <p>
                  We reserve the right to update or modify these terms and
                  conditions at any time without prior notice. Any changes will
                  be effective immediately upon posting on this website. Your
                  continued use of the website after the posting of any changes
                  constitutes your acceptance of the modified terms and
                  conditions.
                </p>
                <h2>8. Contact Us</h2>
                <p>
                  If you have any questions or concerns regarding these terms
                  and conditions, please{" "}
                  <a href="mailto:info@ecommercesolution.com">contact us</a> for
                  further assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default TermsAndConditions;
