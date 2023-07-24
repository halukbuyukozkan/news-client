import { Box, Button, Paper, TextField } from '@mui/material'
import React from 'react'

export default function StaffForm() {
  return (
    <div className='w-full'>
      <Paper className='w-full'>
        <Box
          component="form"
          /* sx={{
            '& .MuiTextField-root': { m: 1, width: '58ch' },
          }} */
          noValidate
          autoComplete="off"
        >
          <div className='p-24 grid grid-cols-1 gap-10 w-full ' >
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Öğretmen Ad Soyad"
            /> 
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Yetki"
            /> 
          </div>
        </Box>
        <div className='p-24'>
        <Button variant="contained" color='success' >Ekle</Button>
        </div>
        
      </Paper>
    </div>
  )
}
