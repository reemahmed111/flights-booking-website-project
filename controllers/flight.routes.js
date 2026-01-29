const express = require("express");
const router = express.Router();
const Flight = require("../models/Flight");

router.get('/', async(req, res)=>{
    try{
    const flights = await Flight.find()
    res.render('flights/index', {flights})
    }
    catch(err){
        console.log(err)};
});

router.get('/new', (req,res)=>{
    res.render('flights/new.ejs')
});

router.post('/', async(req,res)=>{ 
try{
    const createdFlights = await Flight.create(req.body)
    res.redirect('/flights')}
catch(err){
    console.log(err)};
});

router.get('/:id', async(req,res)=>{
    try{
        const flight = await Flight.findById(req.params.id)
        res.render('flights/show.ejs', {flight})
    }
    catch(err){
        console.log(err)};
});

router.get('/:id/edit', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    res.render('flights/edit', { flight });
  } catch (err) {
    console.log(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (req.body.tripType === "one-way") {
      req.body.returnDate = null;
    }

    await Flight.findByIdAndUpdate(req.params.id, req.body);

    const url = `/flights/${req.params.id}`;
    res.redirect(url);
  } catch (err) {
    console.log(err);
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    await Flight.findByIdAndDelete(req.params.id);
    res.redirect('/flights');
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;