const Category = require('../modals/categorymodel');

exports.category = async (req , res) => {
    try {
        const {name} = req.body;
        const category = await Category.create({name});
        res.status(201).json({
            success : true,
            category ,
            message:"Category is successfully created into the database"
        })
    }catch(err) {
        res.status(400).json({
            success : false,
            message:"Facing error while created category list into the database"
        })
    }
}

// get all category 

exports.GetAllCategory = async (req , res) => {
    try{
      const data =  await Category.find();
      res.status(201).json({
        success : true,
        data ,
        message:"Find all the category sucessfully"
    })
    }catch(err) {
        res.status(400).json({
            success : false,
            message:"Facing error while  getting category list from the database"
        })
    }
}