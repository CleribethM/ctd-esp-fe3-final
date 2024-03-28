import { Alert, Button, Step, StepLabel, Stepper} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PersonalData from "./PersonalData";
import AddressData from "./AddressData";
import PaymentData from "./PaymentData";
import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ComicData } from "dh-marvel/features/marvel/comic.types";
import { useRouter } from "next/router";


const steps = [
    'Datos Personales',
    'Dirección de entrega',
    'Datos del pago',
  ];

  interface Props{
    id:number
    comic: ComicData 
  }
  

export const FormCheckout: FC<Props> = ({id, comic}) => { 
    const router = useRouter()  
    const {handleSubmit, watch} =useFormContext()
    const [formData, setFormData] = useState({});
    const [step, setStep] = useState<number>(1);
    const [status, setStatus] = useState('');
    
    
    const onSubmit = (data: any) => {      
        
        if(step == 1){
            setFormData({...formData, customer: data})
            
        }
        if(step == 2){
            setFormData({...formData, address: data})
           
        }        
        if(step == 3){
        //  setFormData({...formData, card: data})   
        // fetch('http://localhost:3000/api/checkout', 
        fetch('https://ctd-esp-fe3-final-claralisle.vercel.app/api/checkout', 
        { 
        method: "POST",
        body: JSON.stringify({...data, comic:comic.id}),       
        headers:{
            'Content-Type': 'application/json'
        }}
        )
        .then((response) => {
        if(response.status ===200){
            
            const nombre = JSON.stringify(data.customer.name);
            const apellido = JSON.stringify(data.customer.lastName);
            const direccion = JSON.stringify(data.address.address1);
            const ciudad = JSON.stringify(data.address.city);
            const provincia = JSON.stringify(data.address.state);
            localStorage.setItem("nombre", nombre);
            localStorage.setItem("apellido", apellido);
            localStorage.setItem("direccion", direccion);
            localStorage.setItem("ciudad", ciudad);
            localStorage.setItem("provincia", provincia);
            router.push(`/confirmacion-compra/${id}`)
        }
       
        return response.json();
        
        })
        
        .then((data) => {  
            setStatus(data.message)      
      
        })
        .catch((error) => {           
            console.log(error);         
      
        }); 
        }
    };    

  
    const handlePrevStep = ()=>{        
        setStep(step - 1)
    }

    const handleNextStep = ()=>{    
        setStep(step + 1)
    }

 

	return (
        <>
           <Box >
                <Stepper activeStep={step-1} alternativeLabel>
                        {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                        ))}
               </Stepper>
            </Box>
            <Box sx={{maxWidth: "500px", margin: "0 auto"}}>
                <Paper
                    elevation={1}
                    sx={{p: "32px", display: "flex", flexDirection: "column", gap: 3}}
                >
                    {step==1 &&<Typography variant="h4" align="center">
                        Datos personales
                    </Typography>}
                    {step==2 && <Typography variant="h4" align="center">
                        Dirección de envio
                    </Typography>}
                    {step==3 && <Typography variant="h4" align="center">
                        Pago
                    </Typography>}                

                  <form onSubmit={handleSubmit(onSubmit)}>                        
                        {step==1 &&<PersonalData />}
                        {step==2 &&<AddressData/>}
                        {status && <Alert severity="error">{status}</Alert>} 
                        {step==3 &&<PaymentData/>}  
                        
                        <Box>
                            {step>1 && <Button  variant="contained" color="primary"sx={{margin: 2}} onClick={handlePrevStep}>Anterior</Button>}
                            {step<3 && <Button  type="submit" variant="contained" color="primary"sx={{margin: 2}} onClick={handleNextStep}>Siguiente</Button>}
                            {step==3 &&  <Button type="submit" variant="contained" color="primary"sx={{margin: 2}}>
                                Enviar
                            </Button> }
                        </Box>
                    </form>
                </Paper>
            </Box>
        </>
	);
};