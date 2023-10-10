const product = require('../models/product');
const user = require('../models/user');

module.exports = {
    index:(req, res)=> {
            res.render('../views/product/addProduct.ejs');
        },
    create:(req,res)=>{
        const newProduct = new product({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            city: req.body.city,
            userId: req.user.id,
            image: ""
        });
        newProduct.save().then(()=>{
            console.log('New product was added');
            req.flash('info', 'Your product was ADDED successfuly!');
            res.redirect('/');
        });
    },
    display:(req,res)=>{
        product.find({}, (err,prod)=>{
            if(err) console.log(err);
            else{
                res.render('../views/index.ejs',{product: prod, message: req.flash('info')});
                // console.log(prod.image);
            } 
        });
    },
    details:(req,res)=>{
        const id = req.params.id;
        let prod = new product;
        product.findOne({_id:id}, (err, prods)=>{
            if(!err) prod = prods;   
            user.findOne({_id:prod.userId}, (err, usr)=>{
                if(!err)res.render('../views/product/productDetails.ejs',{prod, usr});
            });   
        });
    },
    edit: (req,res)=>{
        const id = req.params.id;
        product.findOne({_id: id}, (err, prod)=>{
            if(!err) res.render('../views/product/editProduct.ejs',{prod});
        });
    },
    update: (req, res) =>{
        const id = req.params.id;
        product.findByIdAndUpdate({_id:id}, {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            city: req.body.city,
        },
        (err)=>{
            if(err) return res.send(500,'Sorry'+ err);
            else{
                req.flash('info', 'Your product was UPDATED successfuly!');
                res.redirect('/');
            }
        });
    },
    delete: (req,res)=>{
        const id = req.params.id;
        product.findByIdAndDelete(id,(err)=>{
            if(err) return res.send(500,'Sorry'+ err);
            else {
                req.flash('info', 'Your product was DELETED successfuly!');
                res.redirect('/');
            }
        });
    },
    userproducts: (req,res)=>{
        product.find({}, (err,prod)=>{
            if(err) console.log(err);
            else{res.render('../views/product/userProduct.ejs',{product: prod});} 
        });
    },
    productImage:(req,res,err)=>{
        if(err)console.log(err);
        let newImage={
            image: req.file.filename
        }
        console.log(req.file.filename);
        product.updateOne({_id: req.params.id}, newImage, (err)=>{
            if(!err) res.redirect('/userproducts');
        });
    }
}