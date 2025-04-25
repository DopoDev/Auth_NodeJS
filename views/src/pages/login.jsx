import { Button, Snackbar, Stack, TextField } from "@mui/material"
import api from "../../api/api.jsx"
import AuthCard from "../components/AuthCard"
import { Link, Link as RouterLink, useNavigate } from "react-router-dom"
import { useState } from "react"

const Login = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
    })

    const [error, setError] = useState("")
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("") // Clear previous errors on new submission
        try{
            const response = await api.post("login", form)
            console.log('✅ Login exitoso:', response.data)
            // It's generally better to use navigate for internal routing
            // window.location.href = "https://www.google.com" 
            // Consider navigating to a success page or dashboard instead
            // navigate('/dashboard'); 
            alert("Login exitoso. Redirigiendo (ejemplo)."); // Provide user feedback before redirect
            window.location.href = "http://www.mrarrieta.com/"; // Example external redirect
        }catch(err){
            console.error('❌ Error en el login:', err)
            let errorMessage = "Error desconocido en el login";
            if(err.response && err.response.data && err.response.data.error){
                errorMessage = err.response.data.error;
            } else if (err.message) {
                errorMessage = err.message; // Catch network errors or other issues
            }
            setError(errorMessage);
            setOpenSnackbar(true);
        }
    }

    return (
        <AuthCard title={"Iniciar Sesión"}>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="Usuario"
                        name="username"
                        type="text"
                        value={form.username} // Corrected value to form.username
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
                    <Button type="submit" variant="contained" color="primary">
                        Iniciar Sesión
                    </Button>
                    <Link component={RouterLink} to = "/register" underline="hover">
                        ¿No tienes cuenta? Regístrate aquí
                    </Link>
                </Stack>
            </form>
            <Snackbar
                open = {openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                message={error} // The error message is correctly passed here
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                action={
                    <Button color="inherit" size="small" onClick={() => setOpenSnackbar(false)}> {/* Added size="small" for better fit */}
                        Cerrar
                    </Button>
                }
            >
            </Snackbar>
        </AuthCard>
    )
}

export default Login