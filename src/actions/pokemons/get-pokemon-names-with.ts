import { pokeApi } from "../../config/api/pokeApi";
import { PokePaginationResponse } from "../../infrastructure/interfaces/pokeApi.interfaces";

export const getPokemonNamesWithId = async () => {
    const url = `pokemon?limit=1300`;
    const {data} = await pokeApi.get<PokePaginationResponse>(url);
  
    return data.results.map((info) => ({
      id: Number(info.url.split('/')[6]),
      name: info.name,
    }));
  
  };