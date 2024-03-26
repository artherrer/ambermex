import { Actionsheet, Box, Input, Text, useDisclose } from 'native-base';
import { useEffect, useState } from 'react';

const countryCodesOptions = [
  { label: '🇺🇸 +1 (USA)', value: '+1' },
  { label: '🇲🇽 +52 (MX)', value: '+52' },
];

interface CountryCodeProps {
  onSelected: (option: any) => void;
  value?: any;
}
export default function CountryCode(props: CountryCodeProps) {
  const [countryCode, setCountryCode] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclose();

  useEffect(() => {
    if (props.value) {
      const option = countryCodesOptions.find(option => option.value === props.value);
      setCountryCode(option);
    }
  }, [props.value]);

  return (
    <>
      <Box>
        <Text>Código de país</Text>
        <Input placeholder="Country Code" value={countryCode?.label} editable={false} onPressIn={onOpen} />
      </Box>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          {countryCodesOptions.map((option, index) => (
            <Actionsheet.Item
              key={option.value.toString()}
              onPress={() => {
                setCountryCode(option);
                props.onSelected(option);
                onClose();
              }}>
              {option.label}
            </Actionsheet.Item>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}
