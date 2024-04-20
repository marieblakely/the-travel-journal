import { Location } from "../models/location.js";


function newLocation (req, res){
  res.render('locations/new', {
    title: 'Add Location'
  })
}









export {
  newLocation as new,
}