import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import MetaData from "../components/MetaData";

export const PrivicyPolicy = () => {
  return (
    <React.Fragment>
      <MetaData title="Privicy Policy" />
      <BreadCrumb title="privicy-policy" />
      <Container classProp="policy-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy">
              <img
                src="https://www.newwaveprofile.dk/globalassets/new-wave-danmark/images/pricacy-policy-topbanner2.jpg"
                alt="..."
                className="img-fluid"
              />
              <div className="privicy-policy">
                <h1>Privacy Policy</h1>
                <h2>1. Data Collection</h2>
                <p>
                  We collect various types of information to provide you with a
                  personalized and secure shopping experience. This may include
                  your name, email address, shipping address, payment details,
                  and browsing patterns. Rest assured, we handle this data with
                  the utmost care.
                </p>
                <h2>2. Cookie Delights</h2>
                <p>
                  We use cookies to enhance your browsing experience and
                  remember your preferences. Our cookies are deliciously secure
                  and help us offer tailored recommendations, streamline your
                  shopping journey, and serve up the tastiest deals.
                </p>
                <h2>3. Jedi-Level Security</h2>
                <p>
                  Protecting your data is our top priority. We employ advanced
                  security measures, including encryption, firewalls, and
                  regular security audits. Your information is locked up tighter
                  than a treasure chest on a hidden island.
                </p>
                <h2>4. Sharing is Caring (Sometimes)</h2>
                <p>
                  We may share your data with trusted partners such as payment
                  processors, shipping providers, and marketing platforms.
                  However, we never sell or disclose your information to third
                  parties for unrelated purposes. Your trust is worth more than
                  all the gold in the world.
                </p>
                <h2>5. Personalization Magic</h2>
                <p>
                  To provide you with a tailored experience, we may use your
                  data to offer personalized product recommendations, exclusive
                  offers, and relevant content. Our goal is to make your
                  shopping journey as magical as a unicorn riding a rainbow.
                </p>
                <h2>6. Time Travel Erasers</h2>
                <p>
                  If you change your mind and want to update or delete your
                  personal information, you can easily do so through your
                  account settings. We won't hold you hostage in our data vault;
                  freedom of choice is our guiding principle.
                </p>
                <h2>7. Kiddos and Their Dreams</h2>
                <p>
                  Our services are not intended for children under the age of
                  13. We encourage parents and guardians to guide their young
                  ones through their own epic adventures, both online and
                  offline.
                </p>
                <h2>8. Adventure Logs</h2>
                <p>
                  Like any great journey, we keep a record of your interactions
                  with our website and services. This helps us improve our
                  offerings, fix bugs, and analyze trends. But don't worry, your
                  secrets and passwords are locked away safely.
                </p>
                <h2>9. Quest for Compliance</h2>
                <p>
                  We comply with applicable privacy laws and regulations. If you
                  have any questions, concerns, or magical insights, please{" "}
                  <a href="mailto:privacy@ecommercesolution.com">
                    contact our privacy team
                  </a>
                  . We are always ready to embark on a quest for privacy
                  perfection.
                </p>
                <h2>10. Updates and Unicorns</h2>
                <p>
                  Our Privacy Policy may evolve over time, so we recommend
                  checking back periodically for any updates. Rest assured, we
                  will keep you informed of any major changes as we continue our
                  journey towards privacy greatness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};
