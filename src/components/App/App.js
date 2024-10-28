import React from 'react';
import { Container, Button, TextField } from "@mui/material"
import { useTheme } from "@mui/material/styles"

function App() {
  const ENDPOINT = "http://localhost:8004/monsters"
  const [name, setName] = React.useState("")
  const [alignment, setAlignment] = React.useState("")
  const [result, setResult] = React.useState("")
  const [error, setError] = React.useState("");
  const theme = useTheme()

  async function handleSubmit(event) {
    event.preventDefault();
    const url = new URL(ENDPOINT)
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name, alignment}),
      });

      if (!response.ok) {
        throw new Error('API resonse not ok');
      }

      const json = await response.json();
      setResult(() => json);
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
      <h1>{result}</h1>
    </Container>
  )
}

export default App;
