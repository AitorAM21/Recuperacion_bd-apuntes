const mMovieVideo = require('../models/movie_video.model')
const mMovie      = require('../models/movie.model')

exports.getMovieVideos = async (req, res) => {
    const {body, params, query} = req
    const id = params.id || query.id || body.id

    const movie = await mMovie.findById({id}) //TODO: Recoger los datos de la pelicula
    if (!movie) {
        const obj = { message: 'No existe la pelicula' }
        return res.send(obj)
    }
    const videos = await mMovieVideo.find({movie_id:movie.id}) // TODO: Recoger los trailers de las peliculas
    const data = { movie, videos }

    // Los datos de la pelicula y sus detalles
    res.send({data})
}

exports.getLastTrailers = async (req, res) => {
    const trailers = await mMovieVideo.find({}).sort({'createdAt':-1}).limit(10)  // TODO: Recoger los ultimos 10 trailers
    res.send({trailers})
}