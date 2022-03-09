
import './App.css';

import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

class App extends Component {
	apiKey = process.env.REACT_APP_NEWS_API
	state = {
		progress: 0
	}
	setProgress = (prog) => {
		this.setState({progress: prog})
	}
	render() {
		return (
			<Router>
				<div>
					<Navbar />
					<LoadingBar
						// height={3}
						color='#f11946'
						progress={this.state.progress}
					/>
					<Switch>
						<Route exact path="/">
							<News apiKey={this.apiKey} setProgress={this.setProgress} key="general" pageSize={9} country="in" category="general" />
						</Route>
						<Route exact path="/business"><News apiKey={this.apiKey} setProgress={this.setProgress} key="business" pageSize={9} country="in" category="business" /></Route>
						<Route exact path="/entertainment"><News apiKey={this.apiKey} setProgress={this.setProgress} key="entertainment" pageSize={9} country="in" category="entertainment" /></Route>
						<Route exact path="/general"><News apiKey={this.apiKey} setProgress={this.setProgress} key="general" pageSize={9} country="in" category="general" /></Route>
						<Route exact path="/health"><News apiKey={this.apiKey} setProgress={this.setProgress} key="health" pageSize={9} country="in" category="health" /></Route>
						<Route exact path="/science"><News apiKey={this.apiKey} setProgress={this.setProgress} key="science" pageSize={9} country="in" category="science" /></Route>
						<Route exact path="/sports"><News apiKey={this.apiKey} setProgress={this.setProgress} key="sports" pageSize={9} country="in" category="sports" /></Route>
						<Route exact path="/technology"><News apiKey={this.apiKey} setProgress={this.setProgress} key="technology" pageSize={9} country="in" category="technology" /></Route>

					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;







