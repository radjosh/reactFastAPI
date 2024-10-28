import React from 'react';
import { Container, Box, Grid2, Button, TextField } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { supabase } from '../../supabaseClient.js'

function App() {
  const [name, setName] = React.useState("")
  const [alignment, setAlignment] = React.useState("")
  const [result, setResult] = React.useState("")
  const [error, setError] = React.useState("");
  const theme = useTheme()

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const { data, error } = await supabase
        .from('monsters')
        .insert([{ name, alignment }]);

      if (error) {
        throw error;
      }

      setResult(data);
      setName("")
      setAlignment("")
      setError("")
    } catch (err) {
      console.error('API Error: ', err.message);
      setError(err.message);
    }
  }

  return (
    <Container sx={{height: '100vh', bgcolor:theme.palette.primary.main}}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          padding: 3,
          borderRadius: 2,
          boxShadow: 1,
          bgcolor: theme.palette.background.paper,
          justifyContent: 'center'
        }}
      >
        <Grid2 container spacing={2}>
          <Grid2 size={4}>
            <TextField
              fullWidth
              margin="normal"
              variant="filled"
              label="Name"
              sx={{ label: { color: 'black' }}}
              value={name}
              onChange={(event) => setName(() => event.target.value)}
            />
          </Grid2>
          <Grid2 size={4}>
            <TextField
              fullWidth
              margin="normal"
              variant="filled"
              label="Alignment"
              sx={{ label: { color: 'black' }}}
              value={alignment}
              onChange={(event) => setAlignment(() => event.target.value)}
            />
          </Grid2>
          <Grid2 size={4}>
            <Button type="submit" 
                    sx={{
                      bgcolor:theme.palette.primary.main,
                      '&:hover': {
                      bgcolor:theme.palette.secondary.main
                      },
                      padding: '30px', // Custom padding
                      borderRadius: '8px', // Custom border radius
                      fontWeight: 'bold', // Bold text
                      fontSize: '16px', // Custom font size
                    }}
                    variant="contained" 
                    color="secondary" 
                    size="large">Submit
            </Button>
          </Grid2>
      {error && <h2 style={{ color: 'red'}}>{error}</h2>}
      <h1>{result && JSON.stringify(result)}</h1>
      </Grid2>
      </Box>
    </Container>
  )
}

export default App;
