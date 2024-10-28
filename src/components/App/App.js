import React from 'react';
import { Container, Button, TextField } from "@mui/material"
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
      <form onSubmit={handleSubmit}>
        <TextField
          autoFocus
          margin="normal"
          variant="filled"
          label="Name"
          value={name}
          onChange={(event) => setName(() => event.target.value)}
        />
        <TextField
          margin="normal"
          variant="filled"
          label="Alignment"
          value={alignment}
          onChange={(event) => setAlignment(() => event.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
      {error && <h2 style={{ color: 'red'}}>{error}</h2>}
      <h1>{result && JSON.stringify(result)}</h1>
    </Container>
  )
}

export default App;
