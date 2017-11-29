// Include the Main React Dependencies
var React = require("react");
var ReactDOM = require("react-dom");

// Include the News Component
var Main = require("./components/children/Main");

// This code here allows us to render our main component (in this case Form)
ReactDOM.render(<Main />, document.getElementById("app"));
