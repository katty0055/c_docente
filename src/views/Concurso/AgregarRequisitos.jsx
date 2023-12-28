// import React from 'react';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import Checkbox from '@mui/material/Checkbox';
// import Button from '@mui/material/Button';
// import ListItemIcon from '@mui/material/ListItemIcon';
// const intersection = (arr1, arr2) => {
//     return arr1.filter(value => arr2.includes(value));
//    };
   
//    const not = (arr1, arr2) => {
//     return arr1.filter(value => !arr2.includes(value));
//    };

// const AgregarRequisitos = () => {
//     const [checked, setChecked] = React.useState([]);
//     const [left, setLeft] = React.useState(['Item1', 'Item2', 'Item3']);
//     const [right, setRight] = React.useState([]);

//     const leftChecked = intersection(checked, left);
// const rightChecked = intersection(checked, right);

// const handleToggle = (value) => () => {
//   const currentIndex = checked.indexOf(value);
//   const newChecked = [...checked];

//   if (currentIndex === -1) {
//     newChecked.push(value);
//   } else {
//     newChecked.splice(currentIndex, 1);
//   }

//   setChecked(newChecked);
// };

// const handleAllRight = () => {
//   setRight(right.concat(left));
//   setLeft([]);
// };

// const handleCheckedRight = () => {
//   setRight(right.concat(leftChecked));
//   setLeft(not(left, leftChecked));
//   setChecked(not(checked, leftChecked));
// };

// const handleCheckedLeft = () => {
//   setLeft(left.concat(rightChecked));
//   setRight(not(right, rightChecked));
//   setChecked(not(checked, rightChecked));
// };

// const handleAllLeft = () => {
//   setLeft(left.concat(right));
//   setRight([]);
// };

//   return (
//     <div>
//   <List>
//     {left.map((value, index) => {
//       const labelId = `transfer-list-item-${value}-label`;

//       return (
//         <ListItem key={index} role="listitem" onClick={handleToggle(value)}>
//           <ListItemIcon>
//             <Checkbox
//               checked={checked.indexOf(value) !== -1}
//               tabIndex={-1}
//               disableRipple
//               inputProps={{ 'aria-labelledby': labelId }}
//             />
//           </ListItemIcon>
//           <ListItemText id={labelId} primary={`${value}`} />
//         </ListItem>
//       );
//     })}
//     <Button onClick={handleAllRight}>
//       Mover todos a la derecha
//     </Button>
//     <Button onClick={handleCheckedRight}>
//       Mover seleccionados a la derecha
//     </Button>
//   </List>
//   <List>
//     {right.map((value, index) => {
//       const labelId = `transfer-list-item-${value}-label`;

//       return (
//         <ListItem key={index} role="listitem" onClick={handleToggle(value)}>
//           <ListItemIcon>
//             <Checkbox
//               checked={checked.indexOf(value) !== -1}
//               tabIndex={-1}
//               disableRipple
//               inputProps={{ 'aria-labelledby': labelId }}
//             />
//           </ListItemIcon>
//           <ListItemText id={labelId} primary={`${value}`} />
//         </ListItem>
//       );
//     })}
//     <Button onClick={handleAllLeft}>
//       Mover todos a la izquierda
//     </Button>
//     <Button onClick={handleCheckedLeft}>
//       Mover seleccionados a la izquierda
//     </Button>
//   </List>
// </div>
//   );

// };

// export default AgregarRequisitos;

{/*const [left, setLeft] = React.useState([0, 1, 2, 3]);
   const [right, setRight] = React.useState([4, 5, 6, 7]);

   const handleMove = (item, from, to) => {
       const newFrom = from.filter(i => i !== item);
       const newTo = [...to, item];
       from === 'left' ? setLeft(newFrom) : setRight(newFrom);
       from === 'right' ? setRight(newTo) : setLeft(newTo);
   };

   return (
       <div>
           <h3>Disponible</h3>
           <List>
               {left.map((value, index) => (
                  <ListItem key={index}>
                      <Checkbox onChange={() => handleMove(value, 'left')} />
                      <ListItemText primary={`Item ${value}`} />
                      <Button onClick={() => handleMove(value, 'left')}>Mover</Button>
                  </ListItem>
               ))}
           </List>
           <h3>Seleccionado</h3>
           <List>
               {right.map((value, index) => (
                  <ListItem key={index}>
                      <Checkbox onChange={() => handleMove(value, 'right')} />
                      <ListItemText primary={`Item ${value}`} />
                      <Button onClick={() => handleMove(value, 'right')}>Mover</Button>
                  </ListItem>
               ))}
           </List>
       </div>
   ); */}

//    import React from 'react';
//    import { useState, useEffect } from 'react';
//    import Grid from '@mui/material/Grid';
//    import List from '@mui/material/List';
//    import ListItem from '@mui/material/ListItem';
//    import ListItemIcon from '@mui/material/ListItemIcon';
//    import ListItemText from '@mui/material/ListItemText';
//    import Checkbox from '@mui/material/Checkbox';
//    import Button from '@mui/material/Button';
//    import Paper from '@mui/material/Paper';
//    import { apiService } from '../../api/apiService';
// import { Box, Typography } from '@mui/material';
   
//    function not(a, b) {
//     return a.filter((value) => b.indexOf(value) === -1);
//    }
   
//    function intersection(a, b) {
//     return a.filter((value) => b.indexOf(value) !== -1);
//    }
   
//    function AgregarRequisitos() {
//     const [checked, setChecked] = useState([]);
//     // const [left, setLeft] = React.useState(['cedula', 'cv', 'certificado', 'titulo']);
//     const [left, setLeft] = useState([]);
//     const [right, setRight] = useState([]);
   
//     const leftChecked = intersection(checked, left);
//     const rightChecked = intersection(checked, right);

//     useEffect(() => {
//       const obtenerRequisitos = async () => {
//         try {
//           const data = await apiService.get('http://127.0.0.1:8000/concurso/requisito/');
//           //mapea las descripciones de los requisitos
//           const descripciones = data.map(requisito => requisito.descripcion_requisito);
//           setLeft(descripciones);
//           console.log(descripciones);
//           console.log(data);	
//         } catch (error) {
//           console.error('Error al obtener los requisitos:', error);
//         }
//       };
//       obtenerRequisitos();
//     }, []);
   
//     const handleToggle = (value) => () => {
//       const currentIndex = checked.indexOf(value);
//       const newChecked = [...checked];
   
//       if (currentIndex === -1) {
//         newChecked.push(value);
//       } else {
//         newChecked.splice(currentIndex, 1);
//       }
   
//       setChecked(newChecked);
//     };
   
//     const handleAllRight = () => {
//       setRight(right.concat(left));
//       setLeft([]);
//     };
   
//     const handleCheckedRight = () => {
//       setRight(right.concat(leftChecked));
//       setLeft(not(left, leftChecked));
//       setChecked(not(checked, leftChecked));
//     };
   
//     const handleCheckedLeft = () => {
//       setLeft(left.concat(rightChecked));
//       setRight(not(right, rightChecked));
//       setChecked(not(checked, rightChecked));
//     };
   
//     const handleAllLeft = () => {
//       setLeft(left.concat(right));
//       setRight([]);
//     };
   
//     const customList = (items) => (
//       <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
//         <List dense component="div" role="list">
//           {items.map((value) => {
//             const labelId = `transfer-list-item-${value}-label`;
   
//             return (
//               <ListItem
//                 key={value}
//                 role="listitem"
//                 onClick={handleToggle(value)}
//               >
//                 <ListItemIcon>
//                   <Checkbox
//                    checked={checked.indexOf(value) !== -1}
//                    tabIndex={-1}
//                    disableRipple
//                    inputProps={{
//                      'aria-labelledby': labelId,
//                    }}
//                   />
//                 </ListItemIcon>
//                 {/* <ListItemText id={labelId} primary={`List item ${value + 1}`} /> */}
//                 <ListItemText id={labelId} primary={`${value}`} />
//               </ListItem>
//             );
//           })}
//         </List>
//       </Paper>
//     );

//     const handleSaveRequisitos = async () => { 
//       try {
//         const data = await apiService.post('http://127.0.0.1:8000/concurso/requisito/', checked);
//         console.log(data);
//         console.log('los requisitos se guardaron correctamente');
//       } catch (error) {
//         console.error('Error al guardar los requisitos:', error);
//       }
//     };
   
//     return (
//       <Grid item container 
//         //spacing={2} 
//         //justifyContent="center" 
//         alignItems="center" 
//         //border={2}
//         justifyContent="space-between"
// 			//alignItems="center"
// 			xs={11}
// 			sx={{
// 				display: 'flex',
// 				//border: 4,
// 				m: 'auto',
// 				borderRadius: 2,
// 				borderStyle: "double",
// 				boxShadow: 4,
// 				borderColor: "primary.dark",
// 				backgroundColor: 'primary.contrastText',
// 				position:'relative',
// 				flexDirection: 'row',
// 				flexWrap: 'wrap',
// 				//gap: 1.5,
				
// 			}}>  
//           <Typography
//             variant="h2"
//             textAlign= "center"
//             color="primary.main"
//             fontWeight= "bold"
//             marginTop={2}
//             marginBottom={2}
//             mx='auto'
//             //xs={11}
//           > 
//            Agregar requisitos
//           </Typography> 
//         <Grid  xs={4} item>
//           {customList(left)}
//         </Grid>
//         <Grid  item>
//           <Grid container direction="column" alignItems="center">
//             <Button
//               sx={{ my: 0.5 }}
//               variant="outlined"
//               size="small"
//               onClick={handleAllRight}
//               disabled={left.length === 0}
//               aria-label="move all right"
//             >
//               {/*≫*/}
//               Mover todos a la derecha
//             </Button>
//             <Button
//               sx={{ my: 0.5 }}
//               variant="outlined"
//               size="small"
//               onClick={handleCheckedRight}
//               disabled={leftChecked.length === 0}
//               aria-label="move selected right"
//             >
//               {/*&gt;*/}
//                 Mover seleccionados a la derecha
//             </Button>
//             <Button
//               sx={{ my: 0.5 }}
//               variant="outlined"
//               size="small"
//               onClick={handleCheckedLeft}
//               disabled={rightChecked.length === 0}
//               aria-label="move selected left"
//             >
//               {/*&lt;*/}
//               Mover seleccionados a la izquierda
//             </Button>
//             <Button
//               sx={{ my: 0.5 }}
//               variant="outlined"
//               size="small"
//               onClick={handleAllLeft}
//               disabled={right.length === 0}
//               aria-label="move all left"
//             >
//               {/*≪*/}
//               Mover todos a la izquierda
//             </Button>
//           </Grid>
//         </Grid>
//         <Grid xs={4} item>{customList(right)}</Grid>

//         <Box>
//           <Button 
//             onClick={handleSaveRequisitos}>
//             Guardar requisitos
//           </Button>
//         </Box>
//       </Grid>
      
//     );
//    }
   
//    export default AgregarRequisitos;

//
// const data = await apiService.get('http://127.0.0.1:8000/concurso/requisito/');

// const handleSaveRequisitos = async () => { 
//   try {
//     const ids = checked.map(requisito => requisito.descripcion_requisito);
//     console.log(ids);
//     console.log(checked);
//     const concursoRequisitos = {
//       requisito: ids,
//       concurso: concursoId,
//     }
//     const data = await apiService.post('http://127.0.0.1:8000/concurso/concursorequisito/', concursoRequisitos);
//     console.log(data);
//     console.log('los requisitos se guardaron correctamente');
//   } catch (error) {
//     console.error('Error al guardar los requisitos:', error);
//   }
// };

import * as React from 'react';
import { useState, useEffect  } from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import theme from '../../components/Temas/theme';
import { apiService } from '../../api/apiService';
import { useLocation } from 'react-router-dom';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

function AgregarRequisitos() {
  const localhost = 'desarrollodtic.pol.una.py';
  const location = useLocation();
  const concursoId = location.state && location.state.concursoId;
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [requisitos, setRequisitos] = useState([]);
  
  // const descripciones = left.map(requisito => requisito.descripcion_requisito);
  // setLeft(descripciones);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  
 

  useEffect(() => {
    console.log('el id:', concursoId);
           const obtenerRequisitos = async () => {
             try {
               const data = await apiService.get(`http://${localhost}:8000/concurso/requisito/`);
               //mapea las descripciones de los requisitos
               const descripciones = data.map(requisito => requisito.descripcion_requisito);
               setLeft(descripciones);
               setRequisitos(data);
               console.log(requisitos);
               //console.log(descripciones);
               console.log(data);	
             } catch (error) {
               console.error('Error al obtener los requisitos:', error);
             }
           };
           obtenerRequisitos();
   }, []);


  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    //guarda los Ids de los requisitos seleccionados
    //const currentIndex = checked.findIndex(requisito => requisito.descripcion_requisito === value);
    console.log(currentIndex);
    const newChecked = [...checked];
    console.log(newChecked);

    if (currentIndex === -1) {
      newChecked.push(value);
      console.log('hola', value);
      //newChecked.push(requisitos.find(requisito => requisito.descripcion_requisito === value));
      //console.log(newChecked);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    console.log(checked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

   const handleCheckedRight = () => {
     setRight(right.concat(leftChecked));
     setLeft(not(left, leftChecked));
     setChecked(not(checked, leftChecked));
   };
  
   const handleCheckedLeft = () => {
     setLeft(left.concat(rightChecked));
     setRight(not(right, rightChecked));
     setChecked(not(checked, rightChecked));
   };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          //const labelId = `transfer-list-all-item-${value}-label`;
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  //checked={checked.some(requisito => requisito.descripcion_requisito === value)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  //const handleSaveRequisitos = async () => {
    const handleSaveRequisitos = async () => {  
    try {
      //const ids = right.map(requisito => requisito.requisito_id);
      const ids = right.map(descripcion => {
        return requisitos.find(requisito => requisito.descripcion_requisito === descripcion).requisito_id;
      }).filter(id => id !== undefined);
      
      // const concursoRequisitos = {
      //   requisito: ids,
      //   concurso: concursoId,
      // }
      if (concursoId !== null) {
        console.log('el concurso es', concursoId);
      for (let i = 0; i < ids.length; i++) {
        const concursoRequisito = {
          requisito: ids[i],
          concurso: concursoId,
        };
   
        await apiService.post(`http://${localhost}:8000/concurso/concursorequisito/`, concursoRequisito);
      }
    } else {
      console.log('no existe el concurso', concursoId);
    }

      console.log('estos son los ids',ids);
      console.log("no existe", concursoId);
      //console.log(data);
      console.log('los requisitos se guardaron correctamente');
    } catch (error) {
      console.error('Error al guardar los requisitos:', error);
    }
  };

  //const descripciones = left.map(value => value.descripcion_requisito);

  return (
    <Grid item container spacing={2} justifyContent="center" alignItems="center"
      xs={11}
      sx={{
        display: 'flex',
        //border: 4,
        m: 'auto',
        borderRadius: 2,
        borderStyle: "double",
        boxShadow: 4,
        borderColor: "primary.dark",
        backgroundColor: 'primary.contrastText',
        position:'relative',
        flexDirection: 'row',
        //flexWrap: 'wrap',
        //gap: 1.5,
        
      }}
    >
      <Grid xs={12} item>
        <Typography
            variant="h2"
            textAlign= "center"
            color="primary.main"
            fontWeight= "bold"
            marginTop={2}
            //marginBottom={2}
            mx='auto'
          > 
            Agregar Requisitos
          </Typography>
      </Grid>
     
      <Grid xs={4} item>{customList('Opciones', left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid xs={4} item>{customList('Seleccionados', right)}</Grid>
      <Grid xs={12} justifyContent='center' alignItems='center'>
       
      </Grid>
      <Button size="small" variant="contained" color="primary" 
					sx={{
						fontSize: theme.typography.body1, // Ajusta el tamaño de la letra según tus necesidades
						fontWeight: 'bold',
						width: '15%',
						alignSelf: 'center',
						marginBottom: 2,
						mx:'auto'
						}}
						onClick={handleSaveRequisitos}
						>
							Guardar requisitos
			</Button>
      
    </Grid>
  );
};

export default AgregarRequisitos;
