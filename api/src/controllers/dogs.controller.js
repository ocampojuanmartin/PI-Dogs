const axios = require('axios');
const {Temperament, Dog } = require('../db');
require('dotenv').config()
const { DB_API_KEY }= process.env
  

const apiInfo = async(req, res)=>{
    try {
    const urlApi = await axios.get('https://api.thedogapi.com/v1/breeds')
    const infoApi = await urlApi.data.map(i=>{
        return {
            id: i.id,
            name: i.name,
            height_min: parseInt(i?.height?.metric?.split("-")[0]),
            height_max: parseInt(i?.height?.metric?.split("-")[1]),
            weight_min: parseInt(i?.weight?.metric?.split("-")[0]),
            weight_max: parseInt(i?.weight?.metric?.split("-")[1]),
            life_span: i.life_span,
            img: i.image.url,
            temperament: i.temperament
        }
    })
   
    return infoApi 
} catch (error) {
    console.log(error)
}
}

// hago una funcion para buscar los datos de la BD
const bdInfo = async () => {
    return await Dog.findAll({  //consulto a la tabla dog y con el includes le digo que incluya la otra tabla(temperaments)
        include: {
            model: Temperament, 
            attributes: ['name'],
            through: {
                attributes: [],
            },

        }
    })
}

//hago una funcion que junte la base de datos y la data de la API
// const joinInfo = async() => {
//     const api = await apiInfo()
//     const bd = await bdInfo()
//     const info = api.concat(bd)

//     return info
// }

const joinInfo = async() => {
    const api = await apiInfo()
    const bd = await bdInfo()
    const info = await bd.map((el)=>{
        return {
            id: el.id,
            name: el.name.charAt(0).toUpperCase() + el.name.slice(1), // pongo la primer letra con mayuscula para que no se arruine el ordenamiento luego en los filtros 
            height_min: el.height_min,
            height_max: el.height_max,
            weight_min: el.weight_min,
            weight_max: el.weight_max,
            life_span: el.life_span,
            img: el.img?el.img:'https://as.com/diarioas/imagenes/2021/04/09/actualidad/1617950287_044031_1617950441_noticia_normal_recorte1.jpg',
            temperament: el.temperaments.map(el=>el.name).toString(),
            createdInDb: el.createdInDb
        }
    })
    const Allinfo = api.concat(info)
    return Allinfo
}


//Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
//Si no existe ninguna raza de perro mostrar un mensaje adecuado
const findByName = async(req, res) => {
    try {
        const { name } = req.query
        const info = await joinInfo()

        if(name) {
            var minuscula = info.filter(i=> i.name.toLowerCase().includes(name.toLowerCase()))
            minuscula.length? res.status(200).json(minuscula) : res.status(404).json({msg: "dog not found"})
        } else {
            res.status(200).send(info)
        } } 
        
        catch (error) {
            console.log(error)
        }
}


//hago una funcion que busque por id
const findById = async(req, res)=>{

    const {id} = req.params
   
   

    const dogInfo = await joinInfo();
    
    if (id) {
        var dogId = await dogInfo.filter(i =>i.id == id);
        dogId.length?
        res.status(200).send(dogId):
        res.status(404).send('dog not found');
    }
 
}


//hago una funcion para traer los temperamentos
const findDogTemperament = async (req, res) => {
    try {
        const temperamentApi = await axios.get(`https://api.thedogapi.com/v1/breeds?apikey=${DB_API_KEY}`);
        let temperament = temperamentApi.data.map(d => d.temperament ? d.temperament : "no temperament");
        let temp2 = temperament.map(d => d.split(', '))
        
        
        let settemp = new Set (temp2.flat()) // el set quita los repetidos y el flat los saca del array
        for (el of settemp) {if (el) await Temperament.findOrCreate({
            where: { name: el }})
      }
       
        temperamentoBd = await Temperament.findAll();
        res.status(200).json(temperamentoBd);
    } catch (error) {
        res.status(404).send('No answer' + error)
    }
   
  }




//por ultimo hago la funcion para crear al perro, la que va a ir en el post
const createDog = async (req, res) => {
    const { name, height_min, height_max, weight_min, weight_max, temperament, life_span, img } = req.body
    const newDog = await Dog.create({name, height_min, height_max, weight_min, weight_max, life_span, img})

    let temperamento2 = await Temperament.findAll({
        where: {name: temperament}
    })
    newDog.addTemperament(temperamento2)
    res.send('Dog created succesfully')
}











// const dogPorPais = async() => {
//     const info = await axios.get ("http://api.thedogapi.com/v1/breeds")

//     const info2= info.data.map(el=> {

//         return {
//             name: el.name? el.name: 'no tiene nombre',
//             grupo: el.breed_group ? el.breed_group: 'no tiene grupo',
//         }
//     })

//     const {grupo} = req.params


//     if (grupo) {
//         const dog= info2.filter(el=> el.grupo.includes(grupo))
//         grupo.length?res.status(200).json(dog):
//         res.status(404).json({message:'error'})
//     }


//     return info2
// }


const deleteDog = async (req, res)=>{
    const {namedelete} = req.params
    const data = Dog.findOne({
        where: {name: namedelete}
    })
    data.destroy()
    res.status(200).json({msg:'se ha eliminado con exito'})
}











module.exports = { findByName , findById , findDogTemperament , createDog, deleteDog}