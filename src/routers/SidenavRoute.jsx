import { Routes, Route, Navigate } from 'react-router-dom'
import Country from '../page/Country'
import Company from '../page/Company'
import Department from '../page/Department';
import Project from '../page/Project';
import { Typography } from '@mui/material'

function Home() {
  return <Typography variant="h2">Homepage</Typography>
}

export default function SidenavRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country" element={<Country />} />
      <Route path="/company" element={<Company />} />
      <Route path="/department" element={<Department />} />
      <Route path="/project" element={<Project />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}