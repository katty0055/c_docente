import {createTheme} from '@mui/material';
import { indigo } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: indigo[500],
      light: '#6573C3',
      dark: '#2C387E',
      contrastText:'#FFFFFF',

    }, 
    secondary: {
      main: indigo[300],
    },
    error: {
      main: indigo[50],
    },
    warning: {
      main: indigo[50],
    },
    info: {
      main: indigo[50],
    },
    success: {
      main: indigo[50],
    },
  },
  typography: { 
    h1: {
    },
    h2: {
      '@media (min-width:0px)': {
        fontSize: '1.3rem',
      },
      '@media (min-width:600px)': {
        fontSize: '1.4rem',
      },
      '@media (min-width:900px)': {
        fontSize: '1.6rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      '@media (min-width:0px)': {
        fontSize: '1.2rem',
      },
      '@media (min-width:600px)': {
        fontSize: '1.3rem',
      },
      '@media (min-width:900px)': {
        fontSize: '1.5rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '1.9rem',
      },
    },
    h4: {
      // '@media (max-width:600px)': {
      //   fontSize: '1.5rem',
      // },
    },
    h5: {
    },
    h6: {
      '@media (min-width:0px)': {
        fontSize: '0.9em',
      },
      '@media (min-width:600px)': {
        fontSize: '1rem',
      },
      '@media (min-width:900px)': {
        fontSize: '1.2rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '1.6rem',
      },
    },
    body1: { 
    },
    body2: { 
    },
    subtitle1: { 

    },
    subtitle2: { 
      '@media (min-width:0px)': {
        fontSize: '0.8em',
      },
      '@media (min-width:600px)': {
        fontSize: '0.9rem',
      },
      '@media (min-width:900px)': {
        fontSize: '1.1rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '1.5rem',
      },
    },
  },
  // components: {
  //   MuiTextField: {
  //     styleOverrides: {
  //       root: {        
  //         '& .MuiInputBase-root': {
  //           '@media (min-width:0px)': {
  //             fontSize: '1em', 
  //           },
  //           '@media (min-width:600px)': {
  //             fontSize: '1.1rem',
  //           },
            // '@media (min-width:900px)': {
            //   fontSize: '1.5rem',
            // },
            // '@media (min-width:1200px)': {
            //   fontSize: '1.5rem',
            // },

            
    //       },
    //     },
    //   },
    // },

    // MuiInputLabel: {
    //     styleOverrides: {
    //       root: {
    //         '@media (min-width:0px)': {
    //           fontSize: '0.9em',  
    //         },
    //         '@media (min-width:600px)': {
    //           fontSize: '1rem',
    //         },
            // '@media (min-width:900px)': {
            //   fontSize: '1.5rem',
            // },
            // '@media (min-width:1200px)': {
            //   fontSize: '1.5rem',
            // },
                    
      //     },
      //   },
      // },
      // MuiInputBase: {
      //   styleOverrides: {
      //     input: {
      //       '@media (min-width:0px)': {
      //         fontSize: '0.8em', 
      //       },
      //       '@media (min-width:600px)': {
      //         fontSize: '0.9rem',
      //       },
            // '@media (min-width:900px)': {
            //   fontSize: '1.5rem',
            // },
            // '@media (min-width:1200px)': {
            //   fontSize: '1.5rem',
            // },
                              
    //       },
    //     },
    //   },
    // },
    // MuiMenuItem: {
    //   styleOverrides: { 
    //     root: {           
    //       "&.MuiMenuItem-root": { 
    //         '@media (min-width:0px)': {
    //           fontSize: '1.2em', 
    //           minHeight: "auto",
    //         paddingTop: "0",
    //         paddingBottom: "0",
    //         },
    //         }
          // "&.MuiSvgIcon-root":{}
            // fontSize: "0.8em",
            // minHeight: "auto",
            // paddingTop: "0",
            // paddingBottom: "0",
            // ["@media (max-width:1000px)"]: { height: '90%',  
            // fontSize: '0.6em'},
      //     }  
      //   } 
      // },
      // MuiSvgIcon: {
      //   styleOverrides: { 
      //     root: {           
      //       "&.MuiSvgIcon-root": { 
      //         '@media (min-width:0px)': {
      //           fontSize: '1.2em', 
              //   minHeight: "auto",
              // paddingTop: "0",
              // paddingBottom: "0",
        //       },
        //       }
        //     }  
        //   } 
        // },
    // MuiList: {
    //   styleOverrides: { 
    //     root: {           
    //       "&.MuiMenu-list": { 
    //         paddingTop: "0",
    //         paddingBottom: "0",
    //       }  
    //     } 
    //   },
    // },
  
})

export default theme;