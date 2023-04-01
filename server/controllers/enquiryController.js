const asyncHandler = require("express-async-handler");
const format = require("capitalize-string");
const Enquiry = require("../models/enquiryModel");

const makeEnquiry = asyncHandler(async (requestObject, responseObject) => {
  const newEnquiry = await Enquiry.create({
    name: `${requestObject.user.firstname} ${requestObject.user.lastname}`,
    email: requestObject.user.email,
    mobile: requestObject.user.mobile,
    comment: requestObject.body.comment,
  });
  if (!newEnquiry)
    responseObject
      .status(417)
      .json({ message: "Unable to create enquiry, please try again" });
  else responseObject.status(200).json(newEnquiry);
});
const updateEnquiry = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.params.id;
  const enquiry = await Enquiry.findByIdAndUpdate(
    id,
    {
      name: requestObject.body.name || undefined,
      email: requestObject.body.email || undefined,
      mobile: requestObject.body.mobile || undefined,
      comment: requestObject.body.comment || undefined,
      status: requestObject.body.status || undefined,
    },
    { new: true }
  );
  if (enquiry) responseObject.status(200).json(enquiry);
  else
    responseObject
      .status(417)
      .json({ message: "Unable to update enquiry, Please try again." });
});
const deleteEnquiry = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.params.id;
  const deleted = await Enquiry.findByIdAndRemove(id);
  if (deleted) responseObject.status(200).json(deleted);
  else
    responseObject
      .status(404)
      .json({ message: "Unable to delete enquiry please try again." });
});
const findEnquiry = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.params.id;
  const enquiry = await Enquiry.findById(id);
  if (enquiry) responseObject.status(200).json(enquiry);
  else
    responseObject
      .status(404)
      .json({ message: "Unable to find enquiry please try again." });
});
const enumEnquiry = asyncHandler(async (requestObject, responseObject) => {
  const enquiries = await Enquiry.find();
  if (enquiries) responseObject.status(200).json(enquiries);
  else
    responseObject
      .status(404)
      .json({ message: "Unable to fetch data, please try again." });
});

module.exports = {
  makeEnquiry: makeEnquiry,
  updateEnquiry: updateEnquiry,
  deleteEnquiry: deleteEnquiry,
  findEnquiry: findEnquiry,
  enumEnquiry: enumEnquiry,
};
