import { Route, Routes } from 'react-router'

import { lazy, Suspense } from 'react'


import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import { RoleRoute } from './components/RoleRoute.jsx'
import { ProfileLayout } from './layouts/ProfileLayout.jsx'
import { MainLayout } from './layouts/MainLayout.jsx'

import { useAuthCheck } from './hooks/useAuthCheck.jsx'


const Home = lazy(() => import('./pages/Home.jsx'))
const Search = lazy(() => import('./pages/Search.jsx'))
const NotFound = lazy(() => import('./pages/404.jsx'))
const JobDetails = lazy(() => import('./pages/Details.jsx'))

const Profile = lazy(() => import('./pages/Profile.jsx'))
const UpdateProfile = lazy(() => import('./pages/profile/EditProfile.jsx'))
const FavoriteJobs = lazy(() => import('./pages/profile/FavoriteJobs.jsx'))
const AppliedJobs = lazy(() => import('./pages/profile/AppliedJobs.jsx'))
const CreateJobs = lazy(() => import('./pages/profile/CreateJobs.jsx'))
const ViewCandidates = lazy(() => import('./pages/profile/ViewCandidates.jsx'))


const Register = lazy(() => import('./pages/Register.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))

function App() {
  useAuthCheck() 

  return (
    <>

      <Suspense fallback={<div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>Loading...</div>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          
          <Route path="/profile" element={
            <ProtectedRoute redirectTo="/login">
              <ProfileLayout />
            </ProtectedRoute>
            } 
          >
            <Route index element={<Profile />} />
            <Route path="edit" element={<UpdateProfile />} />
            <Route path="favorites" element={<FavoriteJobs />} />
            <Route path="applied" element={<AppliedJobs />} />
            <Route path="create" element={<RoleRoute allow={['employer', 'admin']}> <CreateJobs /> </RoleRoute>} />
            <Route path="candidates" element={<RoleRoute allow={['employer', 'admin']}> <ViewCandidates /> </RoleRoute> } />
          </Route>
            
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

    </>
  )
}

export default App
