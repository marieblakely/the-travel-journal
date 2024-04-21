import { Location } from "../models/location.js";


function index(req, res){
  Location.find({})
  .then(locations => {
    res.render('locations/index', {
      locations: locations,
      title: 'All Locations'
    })
  })
    .catch(err => {
      console.log(err)
      res.redirect('/locations')
  })
}

function newLocation (req, res){
  res.render('locations/new', {
    title: 'Add Location'
  })
}


function create(req, res){
  req.body.author = req.user.profile._id
  Location.create(req.body)
  .then(location => {
    res.redirect('/locations')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/locations')
  })
}

function show(req, res) {
  Location.findById(req.params.locationId)
  .populate('author')
  .populate('comments.author')
  .then(location => {
    res.render('locations/show', {
      title: 'Location Details',
      location
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/locations')
  })
}

function deleteLocation(req, res) {
  for (let key in req.body){
    if (req.body[key] === '') delete req.body[key]
  }
  Location.findByIdAndDelete(req.params.locationId)
  .then(location => {
    res.redirect('/locations')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}




export {
  index,
  newLocation as new,
  create,
  show,
  deleteLocation as delete,
}