import { useState } from "react"
import { Link, Link as RouterLink, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import { Button, Snackbar, Stack, TextField } from "@mui/material";
import api from "../../api/api";

const Register = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
    }); 

    const[error, setError] = useState("");
    const[openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("") // Clear previous errors on new submission
        try{
            const response = await api.post("register", form)
            console.log('✅ Registro exitoso:', response.data)
            alert("Registro exitoso. Redirigiendo al login.");
            navigate('/login');
        }catch(err){
            console.error('❌ Error en el registro:', err)
            let errorMessage = "Error desconocido en el registro";
            if(err.response && err.response.data && err.response.data.error){
                errorMessage = err.response.data.error;
            } else if (err.message) {
                errorMessage = err.message; // Catch network errors or other issues
            }
            setError(errorMessage);
            setOpenSnackbar(true);
        }
    }

    return(
        <AuthCard title={"Registro"}>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField 
                        label="Usuario" 
                        name="username" 
                        type="text" 
                        value={form.username} 
                        onChange={handleChange} 
                        required
                    />
                    <TextField 
                        label="Contraseña" 
                        name="password" 
                        type="password" 
                        value={form.password} 
                        onChange={handleChange} 
                        required
                    />
                    <Button type="submit" variant="contained" color="success">
                        Registrar
                    </Button>
                    <Link component={RouterLink} to = "/login" underline="hover">
                        ¿Ya tienes cuenta? Inicia sesión aquí
                    </Link>
                    <p>{error}</p>
                    <Snackbar
                        open = {openSnackbar}
                        autoHideDuration={3000}
                        onClose={() => setOpenSnackbar(false)}
                        message={error} // The error message is correctly passed here
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        action={
                            <Button color="inherit" size="small" onClick={() => setOpenSnackbar(false)}>
                                Cerrar
                            </Button>
                        }
                    />
                </Stack>
            </form>
        </AuthCard>
    )
}

export default Register;