import { Outlet } from "react-router-dom"
import { Header } from "./shared/components/Header"


function App() {
  return (
    <>
      <Header />
      <main className=" main-content bg-light">
        <div className="p-4 rounded shadow-sm bg-white">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default App
