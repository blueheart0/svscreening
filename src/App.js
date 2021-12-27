import "./App.css";
import logo from "./logo.svg";

function App() {
  // const { isLoading, isError, data, error } = useQuery("todos", async () => {
  //   // const data = await fetch("http://10.50.20.16:5000/sharing/XzZQAH8pQ");
  //   console.log(data);
  //   return data;
  // });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
