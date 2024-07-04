import { Outlet } from "react-router-dom"
import { Dashboard } from "./shared/components/Dashboard"


function App() {
  return (
    <>
      <Dashboard>
        <Outlet />
      </Dashboard>
    </>
  )
}

export default App
