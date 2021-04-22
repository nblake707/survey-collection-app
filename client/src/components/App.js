import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux'; // gives certain components the ability to call action creators 
import * as actions from '../actions';

import Header from './Header';


const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>
 
// previously was a functional component - switched this to make use of lifecycle methods
class App extends Component {

  componentDidMount(){
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div> 
            <Header />
            <Route exact path="/" component={Landing} /> 
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div> 
        </BrowserRouter>
      </div>
    );
  }
}

// actions will be assigned to the app component as props - this allows us to call it above
export default connect(null, actions)(App); 