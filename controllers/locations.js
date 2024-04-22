import { Location } from "../models/location.js";
import { Profile } from "../models/profile.js"


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
    console.log('this is location: ', location.author)
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
  Location.findByIdAndDelete(req.params.locationId)
  .then(location => {
    res.redirect('/locations')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addComment(req, res) {
  Location.findById(req.params.locationId)
  .then(location => {
    req.body.author = req.user.profile._id
    location.comments.push(req.body)
    location.save()
    .then(()=> {
      res.redirect(`/locations/${location._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit(req, res) {
  Location.findById(req.params.locationId)
  .then(location => {
    res.render('locations/edit', {
      location,
      title: "Edit Location"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/locations')
  })
}

function update(req, res) {
  Location.findById(req.params.locationId)
  .then(location => {
    if (location.author.equals(req.user.profile._id)) {
      location.updateOne(req.body)
      .then(()=> {
        res.redirect(`/locations/${location._id}`)
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/locations')
  })
}

function deleteComment(req, res) {
  Location.findById(req.params.locationId)
  .then(location => {
    location.comments.remove({_id: req.params.commentId})
    location.save()
    .then(() => {
      res.redirect(`/locations/${location._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
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
  edit,
  deleteLocation as delete,
  addComment,
  update,
  deleteComment, 
}