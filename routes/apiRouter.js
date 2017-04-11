let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User
let Profile = require('../db/schema.js').Profile
  
  apiRouter
    .get('/users', function(req, res){
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })

  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })
    .put('/users/:_id', function(req, res){

      User.findByIdAndUpdate(req.params._id, req.body, function(err, record){
          if (err) {
            res.status(500).send(err)
          }
          else if (!record) {
            res.status(400).send('no record found with that id')
          }
          else {
            res.json(Object.assign({},req.body,record))
          }
      })
    })

    .delete('/users/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })  
    })

    // Routes for a Model(resource) should have this structure
  apiRouter
    .get('/profiles', function(request, response){
      Profile.find(request.query , "", function(error, results){
        if(error) return response.json(error) 
        response.json(results)
      })
    })

    .get('/profiles/:_id', function(request, response){
      Profile.findById(request.params._id, "", function(error, result){
        if(error || !result ) return response.json(error) 
        response.json(result)
      })
    })
    .post('/profiles/', function(request, response){
      var newProfile = new Profile(request.body)
      newProfile.save( function(error){
        if (error) {
          response.status(500).send(error)
        } else {
          response.json(newProfile)
        }
      })
    })

    .put('/profiles/:_id', function(request, response){
      Profile.findByIdAndUpdate(request.params._id, request.body, function(error, result){
          if (error) {
            response.status(500).send(error)
          }
          else if (!result) {
            response.status(400).send('no result found with that id')
          }
          else {
            response.json(Object.assign({},request.body,result))
          }
      })
    })

    .delete('/profiles/:_id', function(request, response){
      Profile.remove({ _id: request.params._id}, (error) => {
        if(error) return response.json(error)
        response.json({
          msg: `result ${request.params._id} successfully deleted`,
          _id: request.params._id
        })
      })  
    })

module.exports = apiRouter