import { useEffect, useState } from 'react'

const HELLO_WORLD_URL = 'http://localhost:5015/HelloWorld'

type FetchState =
  | { status: 'loading' }
  | { status: 'success'; data: string }
  | { status: 'error' }

function App() {
  const [state, setState] = useState<FetchState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false

    fetch(HELLO_WORLD_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        return response.text()
      })
      .then((data) => {
        if (!cancelled) {
          setState({ status: 'success', data })
        }
      })
      .catch(() => {
        if (!cancelled) {
          setState({ status: 'error' })
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (state.status === 'loading') {
    return <p>Loading...</p>
  }

  if (state.status === 'error') {
    return <p>Failed to load content from the backend.</p>
  }

  return <h1>{state.data}</h1>
}

export default App
