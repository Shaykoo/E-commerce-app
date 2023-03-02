const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const config = require('./config')

const Product = require('./models/product')
const Order = require('./models/order')
const port = process.env.PORT || 3003

mongoose.Promise = global.Promise;
mongoose.connect(
    config.mongoURL,
    { useNewUrlParser: true }
)

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../dist')))

// Seeder data for initial database config

// app.get('/seeddb', (req, res)=>{
//     const data = [
//         {
//             id: 1,
//             name: 'Product name',
//             description:'This product details will be shown here',
//             image: 'http://placehold.it/355x255',
//             price: 12,
//             __v: 0
//           },
//           {
//             id: 2,
//             name: 'Product name',
//             description:'This product details will be shown here',
//             image: 'http://placehold.it/355x255',
//             price: 24,
//             __v: 0
//           },
//           {
//             id: 3,
//             name: 'Product name',
//             description:'This product details will be shown here',
//             image: 'http://placehold.it/355x255',
//             price: 22,
//             __v: 0
//           },
//           {
//             id: 4,
//             name: 'Product name',
//             description:'This product details will be shown here',
//             image: 'http://placehold.it/355x255',
//             price: 100,
//             __v: 0
//           },
//           {
//             id: 5,
//             name: 'Product name',
//             description:'This product details will be shown here',
//             image: 'http://placehold.it/355x255',
//             price: 69,
//             __v: 0
//           },
//           {
//             id: 6,
//             name: 'Product name',
//             description:'This product details will be shown here',
//             image: 'http://placehold.it/355x255',
//             price: 500,
//             __v: 0
//           },
//           {
//             id: 7,
//             name: 'Product name',
//             description:'This product details will be shown here',
//             image: 'http://placehold.it/355x255',
//             price: 110,
//             __v: 0
//           },
//           {
//             id: 8,
//             name: 'Product name',
//             description:'This product details will be shown here',
//             image: 'http://placehold.it/355x255',
//             price: 300,
//             __v: 0
//           },
//           {
//             id: 9,
//             name: 'Product name',
//             description:'This product details will be shown here',
//             image: 'http://placehold.it/355x255',
//             price: 420,
//             __v: 0
//           }
//     ] 
//     data.forEach((product)=>{
//         const newProduct = new Product({
//             name: product.name,
//             description: product.description,
//             image: product.image,
//             price: product.price
//         })
//         newProduct.save((error,result)=>{
//             if(result){
//                 console.log('Data is saved into the database')
//             }else{
//                 console.log('Not saved',error)
//             }
//         })
//     // res.send('OK')
// })
// })


// Sending all the products from the database
app.get('/api/products', (req, res)=>{
    Product.find().then((rec)=>{
        if(rec){
            res.status(200).json(rec)
        }else{
            res.status(200).json([])
        }
    })
})

// Sending for checkout process
app.post('/api/checkout', (req, res)=>{
    const newOrder = new Order({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        addressOne: req.body.addressOne,
        addressTwo: req.body.addressTwo,
        country: req.body.country,
        state: req.body.state,
        zip: req.body.zip,
        items: req.body.items.map(item => item._id) || [] // making an array of total items in the cart
    })
    newOrder.save().then((rec)=>{
        res.status(200).json(rec)
    }, (err)=>{
        res.status(500).json({error: 'error'})
    })
})

// Sending all the orders
app.get('/api/orders', (req, res)=>{
    Order.find()
    .populate('items') 
    .exec()
    .then(rec => {
        res.status(200).json(rec)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})


app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../dist/index.html'))
})

// Server config
app.listen(port, ()=> {
    console.log(`Server is running at port ${port}`)
})
