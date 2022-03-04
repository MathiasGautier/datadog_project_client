import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import MainPage from "./pages/Main.jsx";
import { datadogLogs } from '@datadog/browser-logs';

import { datadogRum } from '@datadog/browser-rum';
    
datadogRum.init({
    applicationId: '4954c376-cedb-47b1-8df9-9eba0b834728',
    clientToken: 'pubced77c9b02b3b9184bafde0d72e4be71',
    site: 'datadoghq.com',
    service:'test_your_stuff',
    env:'math_ec2',
    // Specify a version number to identify the deployed version of your application in Datadog 
    // version: '1.0.0',
    sampleRate: 100,
    trackInteractions: true,
    defaultPrivacyLevel: 'mask-user-input',
    allowedTracingOrigins: [process.env.REACT_APP_BACKEND_URL]
});
    
//datadogRum.startSessionReplayRecording();

datadogLogs.init({
  clientToken: 'pub7bdeedb11ec507b756025e62aa459d19',
  site: 'datadoghq.com',
  forwardErrorsToLogs: true,
  sampleRate: 100,
  env: "math_ec2",
  service:"test_your_stuff",
  silentMultipleInit:false
})


// datadogLogs.logger.info('Button clicked', { name: 'buttonName', id: 123 })

function App() {
  return (
    <>
    <Switch>
 
    <Route exact path="/" render={(props) => <Landing {...props} />} />
    <Route
          exact
          path="/send_stuff"
          render={(props) => <MainPage {...props} />}
        />

    </Switch>
    </>
  );
}

export default App;
