const mCat          = require('../models/category.model')
const mMovieDetails = require('../models/movie_detail.model')
const mActor        = require('../models/actor.model')

exports.getList = async (req, res) => {
    const categories = await mCat.find({})

    res.render('category/list', { categories })

}

exports.getCategoryMovies = async (req, res) => {
    const {body, params, query} = req
    const id = params.id || query.id || body.id

    const category = await mCat.findById(id)
    if (!category) {
        const obj = { message: 'No existe la categoria' }
        return res.render('category/error', obj);
    }
    const movies   = await mMovieDetails.find({ genres: category.id })

    const data = { category, movies }

    // Tener en cuenta que la categoria es un objeto y movies es un array
    res.render('category/movies', data)

}

exports.getActorsFromCategory = async (req, res) => {
    const {body, params, query} = req
    const id = params.id || query.id || body.id

    const category = await mCat.findById(id)
    if (!category) {
        const obj = { message: 'No existe la categoria' }
        return res.send(obj);
    }
    const movies   = [] // TODO: Recoger todas las peliculas de la categoria

    let actors = [] // TODO: recoger los actores de las peliculas de la categoria

    // Eliminar los Actores duplicados y ordenarlos alfabeticamente
    actors = actors.filter((actor, index) => actors.indexOf(actor) === index)
    actors.sort((a,b)=>{
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    })

    const data = { category, actors }
    res.send(data)



}