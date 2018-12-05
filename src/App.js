import React, { Component } from 'react';
import DisplayTable from './DisplayTable';
import Record from './Record';
import AppConstants from './AppConstants';

class App extends Component {
	constructor(props) {
		super(props)
		
		
		this.reloadInterval = null;
		this.timeOut = AppConstants.RETRY_PARAMS.RETRY_AFTER;
		this.state ={
			data :{},
			reloadNeeded : false
		}
		this.socket = null;
	}
	
	componentDidMount() {
		// Start a connection to socket		
		this.socket = new WebSocket(AppConstants.serverConfig.url);
		this.socket.onopen = ()=> {
			this.timeOut = AppConstants.RETRY_PARAMS.RETRY_AFTER;
			console.log('open');
		};
		
		this.reloadInterval = setInterval(()=>{
			console.log('reload checked',this.timeOut)
			this.timeOut = this.timeOut-AppConstants.RETRY_PARAMS.CHECK_EVERY;
			if(this.timeOut<0) {
				console.log('reload tried',this.socket)
				this.setState({reloadNeeded : true})
				this.socket = new WebSocket(AppConstants.serverConfig.url);
			}
		},AppConstants.RETRY_PARAMS.CHECK_EVERY * 1000)
		
		this.socket.onerror = (e)=>{
			console.log('e',e)
		}
		
		// listening to a particular event and updating the state		
		this.socket.onmessage = (e)=>{
			this.timeOut = AppConstants.RETRY_PARAMS.RETRY_AFTER;
			this.setState((prevState)=>this.updateState(prevState,JSON.parse(e.data)))
		}
		
		this.socket.onclose = ()=> {
			this.handleError();
			// ASK THE USER TO RELOAD THE PAGE
			console.log('close');
		};
	}

	componentWillUnmount(){
		clearInterval(this.reloadInterval)
		if(this.socket) {
			this.socket.close()
		}
	}
	
	handleError(err){
		// Handle error by showing toaster or bluring out screen denoting the data is not getting refreshed
		// console.log(err)
	}
	
	// independent function that returns a newly formed state to call setState
	updateState(prevState,newData) {
		const data = Object.assign({},prevState.data)
		
		// for each script in new data
		newData.forEach(
			([scriptName,price])=>{
				// check for existance of that record
				if(data[scriptName]) {
					const recordScript = data[scriptName];
					
					// if it exist then update the price using method of Record class
					recordScript.updatePrice(price)
				}
				else {
					// if it's a new script then create a new entry for it
					data[scriptName] = new Record(scriptName,price);
				}
			}
			)
			return({data})
			
		}
		
		render() {
			// extrating the data from object and passing the data in required format to dump component
			const data = Object.values(this.state.data);
			const reloadNeeded = this.state.reloadNeeded;
			const style ={
				opacity : reloadNeeded? '0.2' : '1'
			}
			return (
					<div>
						<div style={style}> 
				    		<DisplayTable data={data}/>
						</div>
						{reloadNeeded && <div>
							PLEASE RELOAD YOUR PAGE. IT"S BEEN more than 30 Seconds Since last reload
						</div>}
					</div>
				);
			}
		}
		
		export default App;	