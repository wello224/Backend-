const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Credit = require('../../models/Credit');

//handling get function 
router.get('/',async function(req,res,next){
    const{user}=req.body
    try{
  const credit=await Credit.find({user})
  if(!credit){
    return res.status(400).json({ msg: "There is no profile for this user" });
  }
  res.send(credit);
} catch (err) {
             console.error(err.message);
             return res.status(500).send("server error");
        }
})

//handling post function (mokhtar100)
router.post('/',async function (req, res, next) {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    const { user, CardHolderName, CardNumber, CardType, CVV, expire } = req.body
    try{
    const newCredit = await Credit.create({
        user,
        CardHolderName,
        CardNumber,
        CardType,
        CVV,
        expire
    })
    if(!newCredit){
        return res.status(400).json({ msg: "There is no profile for this user" });
      }
    res.send(newCredit);
} catch (err) {
    console.error(err.message);
    return res.status(500).send("server error");
}
})

//handling update function

router.put('/', async function (req, res, next) {
    const {
         CardHolderName, 
         CardNumber, 
         CardType, 
         CVV, 
         expire,
         _id } = req.body
         try{
    const newCredit = await Credit.findByIdAndUpdate(_id,
        {
            CardHolderName,
            CardNumber,
            CardType,
            CVV,
            expire
        }, { new: true })
        if(!newCredit){
            return res.status(400).json({ msg: "There is no profile for this user" });
          }
    res.send(newCredit);
} catch (err) {
    console.error(err.message);
    return res.status(500).send("server error");
}
})
//handling delete function (mokhtar100)
router.delete('/', async function (req, res, next) {
    const { id } = req.body
    try {
        const delCredit = await Product.findByIdAndUpdate(id,
            {
                isVisible: false,
            }, { new: true })
        if (!delCredit) {
            throw createError(404, 'Product does not exist.');
        }
        res.send(delCredit);
    }
    catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Product id'));
            return;
        }
        next(error);
    }
})


module.exports = router;