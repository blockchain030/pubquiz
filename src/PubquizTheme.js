import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiToolbar: {
      root: {
        // background: 'black',
        background: 'linear-gradient(45deg, black 30%, red 90%)',
      },
    },

    MuiPaper: {
      root: {
        backgroundColor: '#fff',
      },
      rounded: {
        borderRadius: 6,
      },
      elevation2: { // set to value of elevation24
        'boxShadow': '5px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)',
      },
    },

    MuiButton: {
      root: {
        textTransform: "none",
        // margin: '5px',
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        // borderRadius: 3,
        // border: 0,
        // color: 'white',
        // height: 48,
        // padding: '0 30px',
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
      },
    }, // end of MuiButton
  }, // end of overrides
}); // end of createMuiTheme()

// console.log(JSON.stringify(theme,0,2))

export default theme;
