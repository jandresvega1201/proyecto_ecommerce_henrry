import * as React from 'react';
import {  useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userOrderA } from '../../redux/actions/userOrderA';
import { userAddressesA, removeAddress, setActiveAddress } from '../../redux/actions/userAddressesA';
import { getUserReviews } from '../../redux/actions/productReviewA';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';
import Logout from '../logout/Logout'

import style from './assets/PerfilDelUsuario.module.css'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import  Loading  from '../loading/Loading.jsx';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const labels = {
    1: 'Malo',
    1.5: 'Regular',
    2: 'Regular',
    2.5: 'Bueno',
    3: 'Bueno',
    3.5: 'Muy bueno',
    4: 'Muy bueno',
    4.5: 'Excelente',
    5: 'Excelente',
  };

export default function PerfilDelUsuario(){
    const {user, isAuthenticated, isLoading} = useAuth0()
    const allUser = useSelector ((state) => state.DashboardUsersR.allUsers);
    const addresses = useSelector ((state) => state.userAddressesR.userAddresses);
    const reviews = useSelector ((state) => state.productReviewR.userReviews);
    /* console.log("Soy reviews", reviews); */
      
    const usuario = user && allUser.find  (u =>u.email === user.email)

    const [open, setOpen] = React.useState(false);
    const [openA, setOpenA] = React.useState(false);
    const [openB, setOpenB] = React.useState(false);
    const [openC, setOpenC] = React.useState(false);

    const handleClick = () => {
    setOpen(!open);
    };

    const handleClickA = () => {
        setOpenA (!openA);
        };

    const handleClickB = () => {
        setOpenB (!openB);
        };
    const handleClickC = () => {
        setOpenC (!openC);
        };

    const dispatch = useDispatch();
    useEffect(() => {
        if(usuario){
            dispatch(userOrderA(usuario.id))
            dispatch(userAddressesA(usuario.id))
            dispatch(getUserReviews(usuario.id))
        }
    }, [usuario])



    const order  = useSelector ((state) => state.userOrderR.userOrder); 
    /* console.log("Soy order", order); */


    if(isLoading){
        return <Loading />
    }
    return (

        isAuthenticated && (
            <Grid container justify = "center"  sx={{width: '100%', my: "5%",  maxWidth: "100%" }}>     
    <List 
    
    sx={{bgcolor: '#fff' , borderRadius: "10px", color: "#FFC400 " , mx: "auto", minWidth: "60%", width: 'auto' }}
        component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
            <ListSubheader  sx={{mb: 5, width: '100%', maxWidth:  "100%", bgcolor: '#fff ', borderRadius: "10px", color: "#FFC400 " }} component="div" id="nested-list-subheader">
                <div >
                <ListItem >
                    <ListItemAvatar  >
                        <Avatar 
                         alt="Remy Sharp"
                         src="/static/images/avatar/1.jpg"
                         sx={{ width: 60, height: 60}}
                        >
                        {usuario?.picture? <img src={usuario.picture} className= {style.foto} alt= ""/>:  <AccountCircleIcon  className= {style.foto2} fontSize = "large"/>  } 
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText    primary= {<p className= {style.espacio}> Hola {usuario?.name}!!</p>}secondary= {usuario?.isAdmin === true? <p className= {style.espacio}> Administrador. </p> : ""} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
               

                </div>
            </ListSubheader>
            }
        >

            {/* <br/> */}
            <ListItemButton onClick={handleClick}>
            <ListItemIcon>
                <AccountCircleIcon  className= {style.iconos} fontSize = "large"/>
            </ListItemIcon>
            <ListItemText primary="Mis datos" />
            
            {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                <div>
                   <div>
                       {usuario?.username? <p className= {style.subTitulo}>Usuario: {usuario.username}</p> 
                        : <p className= {style.subTitulo}>Complete su usuario</p>}
                    </div>  
                    <div>
                       {usuario?.email? <p className= {style.subTitulo}>Email: {usuario.email}</p> 
                        : <p className= {style.subTitulo}>Complete su email</p>}
                    </div> 
                    <div>
                        {usuario?.dni? <p className= {style.subTitulo}>DNI: {usuario.dni}</p> 
                        : <p className= {style.subTitulo}>Complete su DNI</p>}
                    </div>
                    <div>
                        {usuario?.celphone? <p className= {style.subTitulo}>Telefono: {usuario.celphone}</p> 
                        : <p className= {style.subTitulo}>Complete su Telefono</p>}
                    </div>

                    <div>
            
                        <Stack direction="row"  fontSize = "small">

                        <Button sx={{bgcolor: "#dee2e6 ",  borderRadius: "10px", color:'#FFC400 ' }} variant="outlined" startIcon={<EditIcon fontSize = "large"/>}>
                            <Link className= {style.modificar} to = {"/loginData/" + usuario?.id}> Modificar datos </Link>
                        </Button>

                        </Stack>
                    </div>


                </div>

                       
                </ListItemIcon>
                <ListItemText primary="" />
                </ListItemButton>
            </List>
            </Collapse>





            <ListItemButton onClick={handleClickA}>
            <ListItemIcon>
                <LocationOnIcon  className= {style.iconos} fontSize = "large"/>
            </ListItemIcon>
            <ListItemText primary="Dirección" />
            {openA ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openA} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                <div>
                    {addresses[0]? addresses.map(a => {
                        return(
                        <div key={a.id}><br/>
                            {a.active && <span className= {style.subTitulo}><b>Dirección de Envíos:</b><br/></span>}
                            <span className= {style.subTitulo}>Calle: {a.street}. </span>
                            <span className= {style.subTitulo}>N°: {a.number}. </span><br/>
                            <span className= {style.subTitulo}>Pcia.: {a.province}. </span>
                            <span className= {style.subTitulo}>CP.: {a.zipCode}.</span><br/>
                            {a.location? <span className= {style.subTitulo}>Loc.: {a.location} </span>: <span className= {style.subTitulo}> Loc.: no especificada </span>}
                            <br/>
                            {a.apartment? <span className= {style.subTitulo}>Depto.: {a.apartment} </span>: <span className= {style.subTitulo}>Depto.: no especificado </span>}
                            <br/>
                            {a.description? <span className= {style.subTitulo}>Descripción: {a.description} </span>: <span className= {style.subTitulo}>Descripción no especificada </span>}
                            <br/>
                            <Button sx={{bgcolor: "#dee2e6 ",  borderRadius: "10px", color:'#FFC400 ' }} variant="outlined" startIcon={<EditIcon fontSize = "large"/>}>
                            <Link className= {style.modificar}  to={`/updateAddress/${a.id}?street=${a.street}&number=${a.number}&province=${a.province}&zipCode=${a.zipCode}${a.location ? `&location=${a.location}` : ''}${a.apartment ? `&apartment=${a.apartment}` : ''}${a.description ? `&description=${a.description}` : ''}`}>Modificar</Link>
                            </Button>
                            <Button className= {style.modificar} sx={{bgcolor: "#dee2e6 ",  borderRadius: "10px", color:'#1A2027' }} variant="outlined" startIcon={<DeleteIcon sx={{bgcolor: "#dee2e6 ",  borderRadius: "10px", color:'#FFC400 ' }}fontSize = "large"/>}
                                    onClick={() => {
                                        dispatch(removeAddress(usuario.id, a.id))
                                        .then(() => 
                                        dispatch(userAddressesA(usuario.id)));
                                        }}>Eliminar
                            </Button><br/>
                            { a.active ? <p></p> :
                            <Button className= {style.modificar} sx={{bgcolor: "#dee2e6 ",  borderRadius: "10px", color:'#1A2027' }} variant="outlined" startIcon={<LocalShippingIcon sx={{bgcolor: "#dee2e6 ",  borderRadius: "10px", color:'#FFC400 ' }}fontSize = "large"/>}
                            onClick={() => {
                                        console.log(usuario.id);
                                        dispatch(setActiveAddress(usuario.id, a.id))
                                        .then(() => 
                                        dispatch(userAddressesA(usuario.id)));
                                        }}>Seleccionar para envíos
                            </Button>
                            }
                            
                            
                        </div>
                        )
                    }):<p className= {style.subTitulo}>No hay ninguna dirección</p>}
                    <br/>
                    <Button sx={{bgcolor:  "#dee2e6 ",  borderRadius: "10px", color:'#FFC400 ' }} variant="outlined" startIcon={<EditIcon fontSize = "large"/>}>
                    <Link className= {style.modificar} to={"/createAddress"}>Agregar dirección</Link>
                    </Button>
                    
                </div>
       
                </ListItemIcon>
                <ListItemText primary="" />
                </ListItemButton>
            </List>
            </Collapse>

            <ListItemButton onClick={handleClickB}>
            <ListItemIcon>
                <LocalMallIcon  className= {style.iconos} fontSize = "large"/>
            </ListItemIcon>
            <ListItemText primary="Mis compras" />
            {openB ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openB} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                <div>
                    {(order.Orders && order.Orders[0])? order.Orders.map ((o, index) => 
                        <div key={index}>
                            <p className= {style.subTitulo}>{(o.payment_status === "approved" && o.merchant_order_id)? <span>Estado de compra: aprobado. N° de transacción: {o.merchant_order_id}</span>: (o.payment_status === "rejected" && o.merchant_order_id)? <span>Estado de compra: rechazado. N° de transacción: {o.merchant_order_id}</span> : (o.payment_status === "APPROVED" && o.merchant_id)? <span>Estado de compra: aprobado. N° de transacción: {o.merchant_id}</span> : (o.payment_status === "rejected" && o.merchant_id)? <span>Estado de compra: rechazado. N° de transacción: {o.merchant_id}</span> : <span></span>}</p>
                            
                            <Stack direction="row"  fontSize = "small">
                            <Button sx={{bgcolor:  "#dee2e6 ",  borderRadius: "10px", color:'#FFC400 ' }} variant="outlined" startIcon={<EditIcon fontSize = "large"/>}>
                            {(o.payment_status === 'approved')? <Link className= {style.modificar} to = {"/orderDetail/" + o.merchant_order_id}> Ver detalles </Link> : <Link className= {style.modificar} to = {"/orderDetailPP/" + o.merchant_id}> Ver detalles </Link>}
                            </Button>

                            </Stack>

                        </div>
                        
                        
                     ) : <p className= {style.subTitulo}>Aún no has realizado una compra</p>

                    
                    } 
                    
                </div>
       
                </ListItemIcon>
                <ListItemText primary="" />
                </ListItemButton>
            </List>
            </Collapse>



            <ListItemButton onClick={handleClickC}>
            <ListItemIcon>
                <StarBorderIcon  className= {style.iconos} fontSize = "large"/>
            </ListItemIcon>
            <ListItemText primary="Mis reseñas" />
            {openC ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openC} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                <div>
                    {reviews[0]? reviews.map((r, index) => {
                        return(
                            <div key={index}>
                                <spam className= {style.subTitulo}> Nombre del producto: {r.Product.name}</spam>
                                <Box
                                    sx={{
                                    width: 200,
                                    display: 'flex',
                                    alignItems: 'center',
                                    }}
                                    >
                                    <Rating
                                    name="text-feedback"
                                    value={r.score}
                                    readOnly
                                    precision={1}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    />
                                    <Box sx={{ ml: 2 }}>{labels[r.score]}</Box>
                                </Box>
                                {/* <p className= {style.subTitulo}> Nombre del producto: {r.Product.name} </p> */}
                                {/* <p className= {style.subTitulo}> Título de la reseña: {r.title} </p> */}
                                {/* <p className= {style.subTitulo}> Puntuación: {r.score} </p> */}
                            </div>
                        )
                    }): <p className= {style.subTitulo}> Aún no diste ninguna reseña</p>}
                </div>
       
                </ListItemIcon>
                <ListItemText primary="" />
                </ListItemButton>
            </List>
            </Collapse>
            <div>
                       
            <Logout/>
                
        </div>
           

        </List>
        </Grid>
         )
    );
  }
