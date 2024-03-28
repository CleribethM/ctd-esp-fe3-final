import {  GetServerSideProps, NextPage} from 'next';
import Head from 'next/head';
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';
import { getComic } from 'dh-marvel/services/marvel/marvel.service';
import { ComicData } from 'dh-marvel/features/marvel/comic.types';
import { useRouter } from 'next/router';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import CardConfirm from 'dh-marvel/components/ui/cardConfirm/CardConfirm';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import React from 'react'

interface Props{
    comic: ComicData
    id: number
}

const ConfirmationOrder:NextPage<Props>= ({comic, id}) => {    
    const[nombre, setNombre] = useState<string>()
    const[apellido, setapellido] = useState<string>()
    const[direccion, setDireccion] = useState<string>()
    const[ciudad, setCiudad] = useState<string>()
    const[provincia, setProvincia] = useState<string>()
  

    const router= useRouter()
    // const info = localStorage?.getItem("nombre") 
    


    useEffect(()=>{       
        const nombre = localStorage.getItem("nombre")?.replace(/"/g, '')
        setNombre(nombre)
        const apellido = localStorage.getItem("apellido")?.replace(/"/g, '')
        setapellido(apellido)
        const direccion = localStorage.getItem("direccion")?.replace(/"/g, '')
        setDireccion(direccion)
        const ciudad = localStorage.getItem("ciudad")?.replace(/"/g, '')
        setCiudad(ciudad)
        const provincia = localStorage.getItem("provincia")?.replace(/"/g, '')
        setProvincia(provincia)
        window.addEventListener("popstate", () => {
            localStorage.clear();
          });
    }, [])
    

	const handelVolver = () => {  
        localStorage.clear()
        router.push('/');   
};
   


	return (   
        <>
             {nombre? 
            <> 
        <Head>
            <title>DH-Marvel Store</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <BodySingle title={"¡Que disfrutes de tu compra...!"}>
            <TaskAltIcon color="success" sx={{ margin: "0 auto", fontSize: "100px"}}></TaskAltIcon>
            
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
					    <CardConfirm 
                        data={comic} 
                        nombre={nombre}
                        apellido={apellido}  
                        direccion= {direccion}                    
                        ciudad= {ciudad}                    
                        provincia= {provincia}                    
                        />

                </Box>
                        <Button onClick={handelVolver} size="small" variant="contained" sx={{width: "200px", margin:"0 auto" ,mt:"10px", mb:"10px"}} >Volver a Home </Button>
            </BodySingle>           
         </>
       :
            <>
            <BodySingle title={"Pagina no disponible..."}>
              
                <Button onClick={handelVolver} size="small" variant="contained" sx={{width: "200px", margin:"0 auto" ,mt:"10px", mb:"10px"}} >Volver a Home</Button>

            </BodySingle>
            </>
            }  
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = Number(context.params?.id)    
    const data = await getComic(id);
    return {
     props:{
      comic:data,
      id
     }
    };
  };
  

export default ConfirmationOrder;

