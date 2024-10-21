import "./App.css";
import { TemplateCreatorComponent } from "./components/template-creator";
import { DraggableTable } from "./DraggableTable";

function App() {
  return (
    <>
      <TemplateCreatorComponent />
      <DraggableTable />
    </>
  );
}

export default App;
