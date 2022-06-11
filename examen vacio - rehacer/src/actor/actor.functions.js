const mActor        = require('../models/actor.model')
const mActorDetails = require('../models/actor_details.model')
const mMoviesDetails = require ('../models/movie_detail.model')


exports.getList = async (req, res) => {
    const actors = await mActor.find({})
    // TODO: Recoger de la base de datos todos los actores

    res.send({actors})

}

exports.getActorNamedBen = async (req, res) => {
    const dbQuery={
        name:{$regex:'Adelfa',$options:'i'}
    }

    const actor = await mActor.findOne({dbQuery})// TODO: Recoger los datos del primer actor que se llame 'Ben'
    if (!actor) {
        const obj = { message: 'No existe el actor' }
        return res.send(obj)
    }
    const actorDetails = await mActorDetails.findOne(dbQuery)// TODO: recoger los detalles del actor

    const data = { actor, actorDetails }

    // Los datos del Actor y sus detalles
    res.send({data})

}

exports.getActor = async (req, res) => {
    const {body, params, query} = req
    const id = params.id || query.id || body.id

    const actor = await mActor.findById(id)
    if (!actor) {
        const obj = { message: 'No existe el actor' }
        return res.send(obj)
    }
    const actorDetails = await mActorDetails.findOne(dbQuery) // TODO: recoger los detalles del actor

    const data = { actor, actorDetails }

    // Los datos del Actor y sus detalles
    res.send({data})

}

exports.getActorsVideos = async (req, res) => {
    const {body, params, query} = req
    const id = params.id || query.id || body.id

    const actor = await mActor.findOne(dbQuery) //TODO: Recoger los datos del actor
    if (!actor) {
        const obj = { message: 'No existe el actor' }
        return res.send(obj)
    }
    const moviesDetails = await mMoviesDetails.findOne(dbQuery) // TODO: recoger los detalles de las peliculas del actor

    const data = { actor, movies }

    // Los datos del Actor y sus detalles
    res.send({data})

}

