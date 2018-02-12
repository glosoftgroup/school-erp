import React from 'react';
import Select from 'react-select';
// import fetch from 'isomorphic-fetch';
import axios from 'axios';

class SiteUsers extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
		  displayName: 'SiteUsers',
		  label: '',
		  options:[],
          description:'',
          maximum_capacity: 0,
          current_capacity:0,
      };

	}

	// functions
	getInitialState = () =>{
        return {
			backspaceRemoves: true,
			multi: true,
			creatable: false,
		};
	}
	
	onChange = value =>{
		console.log(value);
		this.setState({
			value: value,
		});
	}

	switchToMulti = () =>{
		this.setState({
			multi: false,
			value: this.state.value ? this.state.value[0] : null
		});
	}

	switchToSingle = () =>{
		this.setState({
			multi: false,
			value: this.state.value ? this.state.value[0] : null
		});
	}

	getUsers = input =>{
		if (!input) {
			return Promise.resolve({ options: [] });
		}		
		// return fetch(`https://api.github.com/search/users?q=${input}`)
		// .then((response) => response.json())
		// .then((json) => {
		// 	return { options: json.items };
		// });
		var self = this;
		axios.get(listUsers+`?q=${input}`)
		.then(function (response) {
			alertUser('Data sent successfully');
			console.log(options);
			options  = response.data.items;
			console.log(response.data.items);
			self.setState({
				options: response.data.items,
			});
			return { options: options };
		})
		.catch(function (error) {
			console.log(error);
		});
		return Promise.resolve({ options: options });
	}

	gotoUser = (value, event) =>{
		window.open(value.html_url);
	}

	toggleBackspaceRemoves = () =>{
		this.setState({
			backspaceRemoves: !this.state.backspaceRemoves
		});
	}

	render() {
		const AsyncComponent =  Select.Async;
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label} <a href="https://github.com/JedWatson/react-select/tree/master/examples/src/components/GithubUsers.js">(Source)</a></h3>
				<AsyncComponent multi={this.state.multi} value={this.state.value} onChange={this.onChange} onValueClick={this.gotoUser} valueKey="id" labelKey="login" loadOptions={this.getUsers} backspaceRemoves={this.state.backspaceRemoves} />
			</div>
		);
	}

	// ./function
}


module.exports = SiteUsers;

