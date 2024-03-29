import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import MetaData from "../components/MetaData";
import { string, object } from "yup";
import { useFormik } from "formik";
import { GoHome, GoMail } from "react-icons/go";
import { IoMdCall, IoMdInformationCircleOutline } from "react-icons/io";
import Container from "../components/Container";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { makeEnquiry } from "../features/contact/contactSlice";

const Contact = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isError, isSuccess } = useSelector((state) => state.enquiry);
  React.useEffect(() => {
    if (isSuccess) toast.success("Coupon sucessfully added");
    if (isError) toast.error("Unable to create coupon, please try again");
  }, [isError, isSuccess]);
  let contactSchema = object({
    name: string().required(),
    email: string().required(),
    mobile: string().required(),
    comment: string().required(),
  });
  const formik = useFormik({
    initialValues: {
      name: user?.firstname + " " + user?.lastname || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
      comment: "",
    },
    validationSchema: contactSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      values = { data: values, token: user.refreshToken };
      dispatch(makeEnquiry(values));
      setTimeout(() => {
        !isError && formik.resetForm();
      }, 300);
    },
  });
  return (
    <React.Fragment>
      <MetaData title="Contact" />
      <BreadCrumb title="Contact" />
      <Container classProp="contact-wrapper home-wrapper-2 py5">
        <div className="row">
          <div className="col-12">
            <iFrame
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7941.266610704476!2d-0.0638215!3d5.621035399999999!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra!5e0!3m2!1sen!2sgh!4v1676295972636!5m2!1sen!2sgh"
              width="600"
              height="450"
              className="border-0 w-100"
              allowFullScreen=""
              loading="lazy"
              referrerpPlicy="no-referrer-when-downgrade"
            ></iFrame>
          </div>
          <div className="col-12 mt-5">
            <div className="contact-inner-wrapper d-flex justify-content-between">
              <div>
                <h3 className="contact-title mb-4">Contact</h3>
                <form
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column gap-15"
                >
                  <div>
                    <input
                      type="text"
                      placeholder="Name"
                      className="form-control"
                      readOnly
                      name="name"
                      onChange={formik.handleChange("name")}
                      value={formik.values.name}
                      onBlur={formik.handleChange("name")}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="mb-2 mt-0">{formik.errors.name}</div>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Number"
                      className="form-control"
                      readOnly
                      name="mobile"
                      onChange={formik.handleChange("mobile")}
                      value={formik.values.mobile}
                      onBlur={formik.handleChange("mobile")}
                    />
                    {formik.touched.mobile && formik.errors.mobile ? (
                      <div className="mb-2 mt-0">{formik.errors.mobile}</div>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="form-control"
                      readOnly
                      name="email"
                      onChange={formik.handleChange("email")}
                      value={formik.values.email}
                      onBlur={formik.handleChange("email")}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="mb-2 mt-0">{formik.errors.email}</div>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <div>
                    <textarea
                      className="w-100 form-control"
                      placeholder="Comments"
                      id=""
                      cols="30"
                      rows="5"
                      name="comment"
                      onChange={formik.handleChange("comment")}
                      value={formik.values.comment}
                      onBlur={formik.handleChange("comment")}
                    ></textarea>
                    {formik.touched.comment && formik.errors.comment ? (
                      <div className="mb-2 mt-0">{formik.errors.comment}</div>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <div>
                    <button className="button border-0" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div>
                <h3 className="contact-title mb-4">Get in touch with us</h3>
                <div>
                  <ul className="ps-0">
                    <li className="mb-3 d-flex align-align-items-center gap-10">
                      <GoHome className="fs-5" />
                      <address className="mb-0">
                        Sakumono SSNIT flats 216 Broadway Express Store 21b2
                      </address>
                    </li>
                    <li className="mb-3 d-flex align-align-items-center gap-10">
                      <IoMdCall className="fs-5" />
                      <a href="tel +233 244109010">+233 244109010</a>
                    </li>
                    <li className="mb-3 d-flex align-align-items-center gap-10">
                      <GoMail className="fs-5" />
                      <a href="mailto:sikabuilding@gmail.com">
                        sikabuilding@gmail.com
                      </a>
                    </li>
                    <li className="mb-3 d-flex align-align-items-center gap-10">
                      <IoMdInformationCircleOutline className="fs-5" />
                      <p>Monday - Friday 8am - 5pm</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Contact;
