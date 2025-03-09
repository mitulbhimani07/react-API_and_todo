import React from 'react'
import Home from '../pages/Home'
import { Route, Routes } from 'react-router-dom'
import Card from '../pages/Card'

export default function AllRoutes() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todoList" element={<Card />} />
        </Routes>
    </div>
  )
}
