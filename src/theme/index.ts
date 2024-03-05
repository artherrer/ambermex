import { extendTheme } from 'native-base';
import { colors } from './colors';

const theme = extendTheme({
  components: {
    // Text: {
    //   baseStyle: {
    //     color: '#222',
    //   }
    // }
    Text: {
      variants: {
        link: {
          color: colors.secondary,
          _hover: {
            color: colors.primary,
          }
        },
        title: {
          fontSize: 18,
          color: colors.primary,
          fontWeight: 'bold',
        }
      }
    },
    Button: {
      variants: {
        // Add new button variant
        primary: {
          bg: colors.primary,
          _text: {
            color: 'white',
          },
        },
        secondary: {
          bg: colors.secondary,
          _text: {
            color: 'white',
          },
        },
        danger: {
          bg: colors.error,
          _text: {
            color: 'white',
          },
        },
        link: {
          _text: {
            color: colors.primary,
          },
        }
      },
      defaultProps: {
        variant: 'primary',
        borderRadius: 20,
      },
    },
    Input: {
      defaultProps: {
        variant: 'underlined',
      },
    },
  },
  config: {
    useSystemColorMode: false,
    // Changing initialColorMode to 'dark'
    initialColorMode: 'ligth',
  },
});

export default theme;
