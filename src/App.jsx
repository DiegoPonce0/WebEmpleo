import { Route, Routes } from 'react-router'

import { lazy, Suspense } from 'react'

import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'

import { useAuthCheck } from './hooks/useAuthCheck.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const Search = lazy(() => import('./pages/Search.jsx'))
const NotFound = lazy(() => import('./pages/404.jsx'))
const JobDetails = lazy(() => import('./pages/Details.jsx'))
const Profile = lazy(() => import('./pages/Profile.jsx'))
const Register = lazy(() => import('./pages/Register.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))

function App() {
  useAuthCheck() 

  return (
    <>
      <Header />
      <Suspense fallback={<div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={
          <ProtectedRoute redirectTo="/login">
            <Profile />
          </ProtectedRoute>
          } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App
