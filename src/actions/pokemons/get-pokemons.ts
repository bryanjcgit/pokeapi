import { pokeApi } from "../../config/api/pokeApi";
import type { Pokemon } from "../../domain/entities/pokemons"
import type { PokeAPIPokemon, PokePaginationResponse } from "../../infrastructure/interfaces/pokeApi.interfaces";
import { PokemonMapper } from "../../infrastructure/mappers/pokemon-mapper";

export const sleep = async () => {
    return new Promise(resolve => setTimeout(resolve, 2000))
}

export const getPokemons = async (page: number, limit: number = 20): Promise<Pokemon[]> => {

    // await sleep()

    try {

        const url = `/pokemon?offset=${page * 10}&limit=${limit}`;
        const { data } = await pokeApi.get<PokePaginationResponse>(url)

        const pokemonPromise = data.results.map((info) => {
            return pokeApi.get<PokeAPIPokemon>(info.url)
        });

        const pokeApiPokemons = await Promise.all(pokemonPromise)
        const pokemonsPromises = pokeApiPokemons.map( (item) => PokemonMapper.pokeApiPokemonToEntity(item.data) )
        

        return await Promise.all(pokemonsPromises)

    } catch (error) {
        console.log(error)
        throw new Error("Error en la peticion");

    }
}