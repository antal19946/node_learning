const kycData = require("../Modals/Kyc");
const { verifyToken } = require("../commons/Authorization");
class kyc {
  async save_bank_kyc(req, res) {
    const {
      bank_holder_name,
      bank_name,
      account_number,
      IFSC_code,
      branch,
      
    } = req.body;
    let fileName = req.file.filename;
    let hostName = req.headers.host;
    const passbook_image = "http://" + hostName + "/" + fileName;

    const Authorization_Token = await req.header("Authorization");
    const authResult = await verifyToken(Authorization_Token);
    if (authResult.status) {
      const kyc = await new kycData({
        user_Id: authResult.resp.user_Id,
        Bank_kyc: {
          bank_holder_name,
          bank_name,
          account_number,
          IFSC_code,
          branch,
          passbook_image,
        },
      });
      const save = await kyc.save()
      res.json({status:true,save})
    }else{
         res.json({status:false,authResult});
    }
  }
}
const {save_bank_kyc} = new kyc()
module.exports ={save_bank_kyc}