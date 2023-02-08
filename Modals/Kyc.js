const mongoose = require("mongoose");
// const validator = require('validator')

const kycSchema = new mongoose.Schema({
  user_Id: {
    type: String,
  },
  personal_imformation: {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    status: {
      type: String,
      
    },
  },
  Bank_kyc: {
    bank_holder_name: {
      type: String,
    },
    bank_name: {
      type: String,
    },
    account_number: {
      type: String,
    },
    IFSC_code: {
      type: String,
    },
    branch: {
      type: String,
    },
    passbook_image: {
      type: String,
    },
    status: {
      type: String,
      
    },
  },
  pan_kyc: {
    pan_number: {
      type: String,
    },
    pan_card_image: {
      type: String,
    },
    status: {
      type: String,
      
    },
  },
  identity: {
    document_type: {
      type: String,
    },
    document_number: {
      type: String,
    },
    document_front_image: {
      type: String,
    },
    document_back_image: {
      type: String,
    },
    status: {
      type: String,
      
    },
  },
  nominee: {
    name: {
      type: String,
    },
    date_of_birth: {
      type: String,
    },
    relation: {
      type: String,
    },
    status: {
      type: String,
      
    },
  },
});
const kycData = new mongoose.model("kycData", kycSchema);
module.exports = kycData;
