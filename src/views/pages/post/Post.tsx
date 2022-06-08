import { useEffect, useState } from 'react';

function PostComponent() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log('ComponentDidMount Post');
  }, [])

  useEffect(() => {
    console.log('ComponentDidUpdate Post');
  }, [count])

  const add = () => {
    setCount(count + 1)
  }
  const sub = () => {
    if (count) {
      setCount(count - 1)
    }
  }

  return (
    <div>
      This is page posts
      <div>{count}</div>
      <button onClick={add}>+</button>
      <button onClick={sub}>-</button>
    </div>
  );
}

export default PostComponent
