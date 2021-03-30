import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialUsers } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from '../components/Login'
import PollDetails from '../components/PollDetails'
import AddPoll from '../components/AddPoll'

class App extends Component {
    componentDidMount() {
        const AUTHED_ID = null
        this.props.dispatch(handleInitialUsers(AUTHED_ID))
    }
    render() {
        console.log("notnull: ", this.props.authedUser)
        return (
            <Router>
                <Fragment>
                    <LoadingBar style={{ backgroundColor: '#25baa2'}}/>
                    <Switch>
                        {
                            this.props.authedUser === null
                            ? <Route path='/' exact component={Login} />
                            : <Fragment>
                                <Route path='/' exact component={Dashboard} />
                                <Route path='/questions/:questions_id' component={PollDetails} />
                                <Route path='/add' exact component={AddPoll} />
                            </Fragment>
                        }
                    </Switch>
                </Fragment>
            </Router>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(App)