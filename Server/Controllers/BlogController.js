const Blog = require("../Schema/BlogSchema")

const PostBlog = async (req, res) => {
    
    console.log(req.body);


    try{
        // const newUser = new Blog({
        //     title,
        //     metaTitle,
        //     description,
        //     metaDescription,
        //     imgName
        // })

        // const saveRes = await newUser.save();
        await Blog.insertMany([req.body])

        res.status(200).json({
            message:"ok",
            data:req.body
        })
    }
    catch(error){
        res.status(500).json({
            status: 500,
        });
    }
}



const GetBlog = async (req, res) => {
    try{
    const data =await Blog.find();

        res.status(200).send({
           data
        })
    }
    catch(error){
        console.log(error);
    }
}
const DltBlog = async (req, res) => {
     const { _id } = req.body
    console.log("_id", _id)
    console.log(req.body)
    try{
        const blog = await Blog.findById(req.body._id);
          await blog.deleteOne();
          res.status(200).json("Suggestion deleted");
    }
    catch(err){
       
    }
}
const UpdateBlog = async (req, res) => {
    console.log(req.body)
    const {title,metaTitle,description,metaDescription,_id, imgName} = req.body
    // console.log(_id,metaTitle,title,description,metaDescription,imgName);

try{
    const blog = await Blog.findByIdAndUpdate(_id,{title,metaTitle,description,metaDescription, imgName})
}
catch(err){

}
}
module.exports = { GetBlog, PostBlog, DltBlog, UpdateBlog}