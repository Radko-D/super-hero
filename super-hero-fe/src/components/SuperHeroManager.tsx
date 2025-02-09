import React, { useState, useEffect } from 'react'
import { Container, Paper, Typography, TextField, Button, Alert, Box, Slider, Stack } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { SuperHero, CreateSuperHeroDto } from '../types/SuperHero'
import { superHeroApi } from '../services/api'

export const SuperHeroManager: React.FC = () => {
  const [heroes, setHeroes] = useState<SuperHero[]>([])
  const [formData, setFormData] = useState<CreateSuperHeroDto>({
    name: '',
    power: '',
    humility: 1,
  })
  const [error, setError] = useState<string>('')

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Hero Name',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'power',
      headerName: 'Power',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'humility',
      headerName: 'Humility Level',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ width: '100%', p: 1 }}>
          <Box
            sx={{
              width: `${params.value * 10}%`,
              height: 8,
              backgroundColor: `hsl(${params.value * 12}, 70%, 50%)`,
              borderRadius: 1,
              transition: 'width 0.3s ease',
            }}
          />
          <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
            {params.value}/10
          </Typography>
        </Box>
      ),
    },
  ]

  useEffect(() => {
    fetchHeroes()
  }, [])

  const fetchHeroes = async () => {
    try {
      const data = await superHeroApi.getSuperHeroes()
      setHeroes(data.sort((a, b) => b.humility - a.humility))
    } catch (err) {
      setError('Failed to fetch superheroes')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const newHero = await superHeroApi.createSuperHero(formData)
      setHeroes([...heroes, newHero].sort((a, b) => b.humility - a.humility))
      setFormData({ name: '', power: '', humility: 1 })
      setError('')
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 4,
        }}
      >
        Humble Superhero Registry
      </Typography>

      {/* Hero Creation Form */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          backgroundColor: 'background.paper',
          borderRadius: 2,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Hero Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              fullWidth
              variant="outlined"
              slotProps={{ input: { sx: { borderRadius: 1.5 } } }}
            />

            <TextField
              slotProps={{ input: { sx: { borderRadius: 1.5 } } }}
              label="Power"
              value={formData.power}
              onChange={(e) => setFormData({ ...formData, power: e.target.value })}
              required
              fullWidth
              variant="outlined"
            />

            <Box>
              <Typography gutterBottom>Humility Level: {formData.humility}</Typography>
              <Slider
                value={formData.humility}
                onChange={(_, value) => setFormData({ ...formData, humility: value as number })}
                min={1}
                max={10}
                marks
                valueLabelDisplay="auto"
                sx={{
                  color: `hsl(${formData.humility * 12}, 70%, 50%)`,
                  transition: 'color 0.3s ease',
                }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
              }}
            >
              Add Superhero
            </Button>
          </Stack>
        </form>
      </Paper>

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Heroes Data Grid */}
      <Paper
        elevation={3}
        sx={{
          height: 400,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <DataGrid
          rows={heroes}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
            sorting: {
              sortModel: [{ field: 'humility', sort: 'desc' }],
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid',
              borderColor: 'divider',
            },
            '& .MuiDataGrid-row': {
              '&:nth-of-type(odd)': {
                backgroundColor: 'action.hover',
              },
              '&:hover': {
                backgroundColor: 'action.selected',
              },
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#1a237e',
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: 'bold',
              '& .MuiDataGrid-columnHeaderTitle': {
                color: '#ffffff',
              },
              '& .MuiDataGrid-iconButtonContainer': {
                color: '#ffffff',
              },
              '& .MuiDataGrid-sortIcon': {
                color: '#ffffff',
              },
              '& .MuiDataGrid-columnSeparator': {
                color: '#ffffff40',
              },
            },
            '& .MuiDataGrid-columnHeader:hover': {
              backgroundColor: '#283593',
            },
          }}
        />
      </Paper>
    </Container>
  )
}

export default SuperHeroManager
