import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, FAB, Text, useTheme } from 'react-native-paper';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { getPokemons } from '../../actions';
import { PokeBallBg } from '../../components/ui/PokeballBg';
import { globalTheme } from '../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'HomeApp'>{}

export const HomeApp = ({navigation}: Props) => {

  const { top } = useSafeAreaInsets()
  const queryClient = useQueryClient()
  const theme = useTheme()
 
  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['pokemons', 'infiniti'],
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60,
    queryFn: async (params) => {
      const pokemons = await getPokemons(params.pageParam)
      pokemons.forEach( pokemon => {
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon)
      })
      return pokemons
    },
    getNextPageParam: ( lastPage, pages ) => pages.length,

  })
 

  return (
    <View style={globalTheme.globalMargin}>
      <PokeBallBg style={styles.imgPosition}/>
      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={ (pokemon, index) => `${pokemon.id}-${index}` }
        numColumns={2}
        style={{paddingTop: top + 20}}
        ListHeaderComponent={() => (
          <Text variant='displayMedium'>Pokédex</Text>
        )}
        renderItem={({item}) => <PokemonCard pokemon={item}/>}
        onEndReachedThreshold={ 0.6 }
        onEndReached={ () => fetchNextPage() }
        showsVerticalScrollIndicator={false}

      />

      <FAB
        label='Buscar'
        style={[globalTheme.fab, {backgroundColor: theme.colors.primary}]}
        mode='elevated'
        color={ theme.dark ? 'black' : 'white'}
        onPress={() => navigation.push('SearchScreen')}
      />

    </View>
  );
};


const styles = StyleSheet.create({
  imgPosition: {
      position: 'absolute',
      top: -100,
      right: -100
  }
})
