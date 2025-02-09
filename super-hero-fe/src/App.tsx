import { SuperHeroManager } from './components/SuperHeroManager'

import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
  defaultColorScheme: 'dark',
  palette: {
    mode: 'dark',
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SuperHeroManager />
    </ThemeProvider>
  )
}

export default App
