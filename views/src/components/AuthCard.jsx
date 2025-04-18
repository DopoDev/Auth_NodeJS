import { Box, Card, CardContent, Typography } from "@mui/material"

const AuthCard = ({title, children}) => {
    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100vh"} >
            <Card sx = {{minWidth: 350, maxWidth: 400, p: 2}}>
                <CardContent>
                    <Typography variant="h5" textAlign={"center"} gutterBottom>
                        {title}
                    </Typography>
                    {children}
                </CardContent>
            </Card>
        </Box>
    )
}

export default AuthCard;