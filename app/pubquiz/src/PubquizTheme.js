import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiToolbar: {
      root: {
        background: 'black',
      },
    }, // end of MuiTab

    MuiTabs: {
      root: {
        background: 'black',
      },
    }, // end of MuiTab

    MuiTab: {
      root: {
        textTransform: 'none',
      },
      textColorSecondary: {
        color: 'white',
      },
      label: {
        fontSize: '0.7rem !important',
      },
    }, // end of MuiTab

    MuiButton: {
      root: {
        textTransform: "none",
        margin: '5px',
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

// console.log(theme)

export default theme;
