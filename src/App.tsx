import './App.css'
import { CourseViewer } from './components/CourseViewer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CourseViewer />
    </QueryClientProvider>
  )
}

export default App
