// Include React
var React = require("react");

var Form = require('./Form.js');
var Result = require('./Result.js');
var Save = require('./Save.js');


// Helper for making AJAX requests to our API
var helpers = require("../utils/helpers");

var Main = React.createClass({
    getInitialState: function(){
        return {
          apiResults :[],
          dbResults:[],
          searchTerms: ["", "", ""]
        };

    },

    setSearchFields : function(topic, start, end){
        this.setState({searchTerms: [topic, start, end]});
    },

    resetdbRes: function(newdata){
        this.setState({dbResults: newdata});
    },

    componentDidMount: function(){
        helpers.apiGet().then(function(query){
            this.setState({dbResults: query.data});
        }.bind(this));
    },
    
    componentDidUpdate: function(prevState){
        if(this.state.searchTerms != prevState.searchTerms){
            helpers.articleQuery(this.state.searchTerms[0], this.state.searchTerms[1], this.state.searchTerms[2])
            .then(function(data){
                this.setState({apiResults: data})
            }.bind(this));
        }
    },

render: function(){
    return(
          <div className="container"> 
          <div>
            <h2>New York Times Article Scrubber</h2>
            <p><em>FInd news article based on the search term.</em></p>
          </div>

  <Form  setSearchFields= {this.setSearchFields}  />
   <Result apiResults = {this.state.apiResults} resetdbRes= {this.resetdbRes}/>
   <Save dbResults = {this.state.dbResults} resetdbRes= {this.resetdbRes}/>

        </div>
    );
}

});

// Export the component back for use in other files
module.exports = Main;