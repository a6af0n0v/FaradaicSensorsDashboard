import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

require('bootstrap');

function Menu() {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">FaradaIC</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Measure</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">Sensors</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Measurements</a>
            </li>
          </ul>
          <form className="d-flex" role="login">
            <button className="btn btn-outline-success" type="submit">Login</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

function MeasurePage() {
  const [msg, setMsg] = useState({ text: "", visible: false, type: "alert alert-danger" });
  async function selectPortClicked() {
    console.log("Select port");
    try {
      let port = await navigator.serial.requestPort();
      let info = await port.getInfo();
      console.log(info);
    } catch (error) {
      setMsg({ text: error.toString(), visible: true, type: "alert alert-warning" });
      console.log(error);
    }
  }
  return (
    <>
      <h5>FaradaIC Sensor Dashboard</h5>
      {
        msg.visible &&
        <div className={msg.type} role="alert" >
          {msg.text}
        </div>
      }
      <div className='row'>
        <div className='col-2'>
          <button className='btn btn-primary'
            onClick={selectPortClicked}
          >Select Port</button>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <div className="App container">
      <div className='row'>
        <Menu />
      </div>
      <div className='row'>
        <MeasurePage />
      </div>
    </div >
  );
}

export default App;
