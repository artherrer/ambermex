import { Icon, Input } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  filterText: string;
  onClear: () => void;
  onSearch: (text: string) => void;
  disable?: boolean;
}

export default function SearchBar(props: Readonly<Props>) {
  const { filterText, onClear, onSearch, disable = true } = props;

  return (
    <Input
      editable={disable}
      bgColor={'white'}
      onChangeText={onSearch}
      value={filterText}
      placeholder="Buscar"
      variant="filled"
      width="100%"
      borderRadius="10"
      py="1"
      px="2"
      h={10}
      mb={3}
      borderWidth={1}
      borderColor="gray.300"
      InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={MaterialIcons} name="search" />}
      InputRightElement={<Icon mr="2" size="4" color="gray.400" as={MaterialIcons} name="close" onPress={onClear} />}
    />
  );
}
