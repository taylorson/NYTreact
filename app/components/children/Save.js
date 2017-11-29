// Include React
var React = require("react");

// Helper for making AJAX requests to our API
var helpers = require("../utils/helpers");

var Save = React.createClass({
    getInitialState: function(){
        return {
            something : 123
        };
    },

    handleDelete: function(event){
        var articleDBId = event.target.value;
        var that = this;
        helpers.apiDelete(articleDBId).then(function(){
            helpers.apiGet().then(function(query){
                that.props.resetdbRes(query.data)
            });
        });
    },

    render: function(){
        var that= this;

        return (
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title text-center">Saved Articles</h3>
              </div>
              <div className="panel-body">
                  <ul className="list-group col-md-8">
                        Article title goes here 
                        {this.props.dbResults.map(function(search, i){
                            return(
                                <li key= "search.id" className="list-group-item">
                                    <div className="input-group">
                                        <div type="text" className="form-control">
                                            <a href="{search.url}" target="_new">{search.title}</a>
                                            {search.date}
                                        </div>
                                        <span className="input-group-btn">
                                        <button type="button" className="btn btn-default pull-right" onClick={that.handleDelete}
                                        value={search.id}>Remove</button>
                                        </span>
                                    </div>
                                </li>
                            );
                        })}
                  </ul>             
              </div>
            </div>
        );
    }
});

module.exports = Save;