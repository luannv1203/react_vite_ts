import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [isAuth, setIsAuth] = useState(false)
  const navigate = useNavigate()
  const onClick = () => {
    setIsAuth(true)
    navigate('/', {replace: true})
  }
  useEffect(() => {
    console.log('i fire once');
    return () => {
      console.log('Component Will Unmount');
    }
  },[]);

  useEffect(() => {
    console.log('Component Did Update');
  }, [isAuth])

  return (
    <div>
      This is login page
      <button onClick={onClick}>hihih</button>
    </div>
  );
}

export default LoginPage
