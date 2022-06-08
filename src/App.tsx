import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import AuthLayout from './views/layout/AuthLayout'
import MainLayout from './views/layout/MainLayout'
import HomePage from './views/pages/home/Home'
import LoginPage from './views/pages/login/Login'
import PostComponent from './views/pages/post/Post'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="blogs" element={<PostComponent />} />
          {/* <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="blogs" element={<PostComponent />} />
          </Route>
          <Route path="/login" element={<AuthLayout />}>
            <Route index element={<LoginPage />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  )

  function RequireAuth({ children, isAuth }: { children: JSX.Element, isAuth: boolean }) {
    if(isAuth) {
      return <Navigate to='/login' replace/>
    }
    return children
  }
}

export default App
function createBrowserHistory(arg0: { window: Window & typeof globalThis }) {
  throw new Error('Function not implemented.')
}

