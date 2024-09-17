import { Image, ImageStyle, StyleProp } from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useContext } from 'react';

interface Props {
    style?: StyleProp<ImageStyle>
}

export const PokeBallBg = ({ style }: Props) => {
    const { isDark } = useContext(ThemeContext)
    const pokeBallImg = isDark ? require('../../assets/pokeball-light.png') : require('../../assets/pokeball-dark.png')
    return (
       
            <Image
                source={pokeBallImg}
                style={[
                    {
                        width: 250,
                        height: 250,
                        opacity: 0.3
                    },
                    style,
                ]}
            />       
    );
};

