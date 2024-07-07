const List = require('../models/list.model')
const {ErrorHandler} = require('../middleware/error')

exports.createlisting = async (req, res, next) => {
try{
const listing = await List.create(req.body)
res.status(201).json({
    success: true,
    message: 'Listing Created Successfully',
    listing
})
}catch(error){
return next(error)
}

}

exports.mylisting = async (req, res, next) => {
    try{
    const listings = await List.find({userRef:req.user.id})
    res.status(200).json({
        success: true,
        listings
    })
    }catch(error){
    return next(error)
    }
    
    }
    exports.deletelisting = async (req, res, next) => {
        try{
        const listing = await List.findById(req.params.id)
        if(!listing){
            return next(new ErrorHandler('Listing Not Found', 404))
        }
        if(listing.userRef == req.user.id){
        await List.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: 'Listing Deleted Successfully'
        })
    }else{
        return next(new ErrorHandler('You are not allowed to delete this listing', 403))
    }
        }catch(error){
        return next(error)
        }
        
        }

        exports.updatelisting = async (req, res, next) => {
            try{
const listing = await List.findById(req.params.id)
if(!listing){
    return next(new ErrorHandler('Listing Not Found', 404))
}
if(listing.userRef == req.user.id){
   const updated =  await List.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({
        success: true,
        message: 'Listing Updated Successfully',
        updated
    })
}else{
    return next(new ErrorHandler('You are not allowed to update this listing', 403))
}
            }catch(error){
            return next(error)
            }

        }

        exports.getlisting = async (req, res, next) => {
            try{
            const listing = await List.findById(req.params.id)
            if(!listing){
                return next(new ErrorHandler('Listing Not Found', 404))
            }
            res.status(200).json({
                success: true,
                listing
            })
            }catch(error){
            return next(error)
            }
            
            }
            
exports.getalllisting = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const skip = parseInt(req.query.skip) || 0;
  
      let offer = req.query.offer === 'true' ? true : req.query.offer === 'false' ? false : { $in: [false, true] };
      let furnished = req.query.furnished === 'true' ? true : req.query.furnished === 'false' ? false : { $in: [false, true] };
      let parking = req.query.parking === 'true' ? true : req.query.parking === 'false' ? false : { $in: [false, true] };
      let type = req.query.type && req.query.type !== 'all' ? req.query.type : { $in: ['rent', 'sale'] };
  
      const searchterm = req.query.search || '';
      const sort = req.query.sort || 'createdAt';
      const order = req.query.order === 'asc' ? 1 : -1;
  
      const listings = await List.find({
        name: { $regex: searchterm, $options: 'i' },
        offer,
        furnished,
        parking,
        type
      })
        .sort({ [sort]: order })
        .limit(limit)
        .skip(skip);
  
      const total = await List.countDocuments({
        name: { $regex: searchterm, $options: 'i' },
        offer,
        furnished,
        parking,
        type
      });
  
      res.status(200).json({
        success: true,
        listings,
        total
      });
    } catch (error) {
      return next(error);
    }
  };
  