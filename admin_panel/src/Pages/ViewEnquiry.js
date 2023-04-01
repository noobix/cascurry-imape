import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchEnquiry, updateEnquiry } from "../feature/enquiry/enquirySlice";

const ViewEnquiry = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const extractId = location.pathname.split("/")[3];
  const { user } = useSelector((state) => state.auth);
  const {
    enquiries: { _id, name, email, mobile, comment, status },
  } = useSelector((state) => state.enquiry);
  React.useEffect(() => {
    if (extractId) {
      dispatch(fetchEnquiry({ id: extractId, token: user.refreshToken }));
    }
  }, [dispatch, extractId]);
  const updateStatus = (e, id) => {
    e.preventDefault();
    dispatch(
      updateEnquiry({
        id: id,
        token: user.refreshToken,
        data: { status: e.target.value },
      })
    );
  };
  return (
    <div>
      <h3 className="mb-4">View Enquiry</h3>
      <div className="p-4 rounded-3 bg-white">
        <div className="d-flex align-items-center gap-2">
          <h6 className="mb-0">Name:</h6>
          <p className="fs-6 mb-0">{name}</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <h6 className="mb-0">Email:</h6>
          <p className="fs-6 mb-0">
            <a href={`mailto:${email}`}>{email}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <h6 className="mb-0">Mobile:</h6>
          <p className="fs-6 mb-0">
            <a href={`tel:${mobile}`}>{mobile}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <h6 className="mb-0">Message:</h6>
          <p className="fs-6 mb-0">{comment}</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <h6 className="mb-0">Status:</h6>
          <p className="fs-6 mb-0">{status}</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <h6 className="mb-0">Update Status:</h6>
          <div>
            <select
              className="form-select"
              aria-label="Default select example"
              value={status}
              onChange={(e) => updateStatus(e, _id)}
            >
              <option defaultValue>Status options</option>
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEnquiry;
