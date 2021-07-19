import axios from 'axios'

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
});

const listAll = () => {
    return api.get("/pokemon")
}

const getPokemon = (name) => {
    return api.get(`/pokemon/${name}`)
}

const getSpecie = (name) => {
    return api.get(`/pokemon-species/${name}`)
}

const getEvolution = (id) => {
    return api.get(`/evolution-chain/${id}`)
}

export default {
    listAll,
    getPokemon,
    getSpecie,
    getEvolution
}