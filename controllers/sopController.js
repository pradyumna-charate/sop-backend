
const {SopModel, Steps }= require('../models/sopModel');
const Product = require('../models/Product');


class SopController {
 
  async createSop(req, res) {
    try {
      const newSop = req.body;
      const createdSop = await SopModel.create(newSop);
      
      // Assuming the variantId is available in the request body as "variantId"
      const variantId = req.body.variantId;
      
      // Update the variant's "sops" array with the new SOP ID
      await Product.updateOne({ "productName.variants._id": variantId }, {
        $addToSet: { "productName.$[product].variants.$[variant].sops": createdSop._id }
      },
      {
        arrayFilters: [
          { "product.variants._id": variantId },
          { "variant._id": variantId }
        ]
      });
      
      res.status(201).json(createdSop);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  }

 async createStep(req,res){
  try {
      const newStep = req.body;
      console.log(Steps);
      const createdStep = await Steps.create(newStep);
      await SopModel.updateOne({_id:req.body.sopid},{
         $addToSet: { steps: createdStep._id },
         $addToSet:{steps: createdStep._id}
      })
      res.status(201).json(createdStep);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
 }


  async getAllSops(req, res) {
    try {
      const allSops = await SopModel.find();
      res.status(200).json(allSops);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  }
 
async getSopById(req, res) {
  try {
    const sopId = req.params.sopId;
    
    const foundSop = await SopModel.findById(sopId).populate('steps');
    
    if (!foundSop) {
      return res.status(404).json({ error: 'SOP not found' });
    }

    res.status(200).json(foundSop);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}

// async getUserBySopId(req, res) {
//   try {
//     const sopid = req.params.sopid;
    
//     // Query your database to find the SOP document associated with the sopid
//     const sop = await SopModel.findOne({ _id: sopid });

  
//     // Assuming the user ID is stored in sop.userid, log it for debugging
//     const userid = sop.userid;
//     console.log('Found User ID:', userid);

//     res.json({ userid });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({
//       statusCode: 500,
//       statusMessage: 'Internal server error'
//     });
//   }
// }




}

module.exports = new SopController();
