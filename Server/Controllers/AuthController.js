const signupCheck = require("../Schema/SignupSchema")
// const signupdata = mongoose.model("LoginDatas")

const Signupdata = async (req, res) => {
try{
    const data =await signupCheck.find();
    res
    .status(200)
    .send(data)
    console.log(data);
}
catch(err){
console.log(err);
}
}




module.exports = {Signupdata}