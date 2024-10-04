


import { Text, Platform } from 'react-native-web';
import { getUrlParams } from '../../hooks/getParams';

const isWeb = Platform.OS === 'web';

export default function LottoGamePage() {
  const { lottoGame } = getUrlParams();
  console.log('lottoGame', lottoGame);

  return <Text>LottoGame: {lottoGame}</Text>;
}
