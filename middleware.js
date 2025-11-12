const { required } = require("joi");

const {productSchema,reviewSchema}=require('./schema')


const validateProduct = (req, res, next) => {
  let { name, img, price, desc } = req.body;
  const { error } = productSchema.validate({ name, img, price, desc });
  if (error) {
    console.log("❌ Joi Validation Failed:", error.details);
    return res.render('users/error', { message: error.details[0].message });
  }
  next();
};



const validateReview=(req,res,next)=>{
    const{rating,comment}=req.body;
    const {error}=reviewSchema.validate({rating,comment})
    if(error){
        return res.render('users/error', { message: error.details[0].message });
    }
    next();

}

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'Please login first');
    return res.redirect('/login');
  }
  next();
};

module.exports={ isLoggedIn,validateProduct,validateReview}
























