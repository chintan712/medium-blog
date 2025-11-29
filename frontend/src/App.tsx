import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Posts } from './pages/Posts';
import { Post } from './pages/Post';
import { Publish } from './pages/Publish';



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/Post/:id" element={<Post />} />
          <Route path="/Posts" element={<Posts />} />
          <Route path="/Publish" element={<Publish />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App