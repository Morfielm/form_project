import "./App.css";
import { Form } from "./components/Form";
import { FormYup } from "./components/FormYup";
import { FormYupHook } from "./components/FormYupHook";

function App() {
  return (
    <div className="App">
      <h3>simple form</h3>
      <Form />
      <h3>yup validation</h3>
      <FormYup />
      <h3>yup + react hook form</h3>
      <FormYupHook />
    </div>
  );
}

export default App;
