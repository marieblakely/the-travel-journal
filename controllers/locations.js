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




export {
  index,
  newLocation as new,
  create,
  show,
}