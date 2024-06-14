import {BrowserRouter , Routes ,Route} from "react-router-dom"
import Welcome from "./components/Welcome/Welcome"
import Form from "./components/Form/Form"
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Welcome/>}></Route>
      <Route path="/form" element={<Form/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
