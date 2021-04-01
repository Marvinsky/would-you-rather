import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialUsers } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Login'
import PollDetails from './PollDetails'
import AddPoll from './AddPoll'
import Leaderboard from './Leaderboard'
import Page404 from './Page404'

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
                                <Route path='/questions/:question_id' component={PollDetails} />
                                <Route path='/add' exact component={AddPoll} />
                                <Route path='/leaderboard' exact component={Leaderboard}/>
                            </Fragment>
                        }
                        <Route component={Page404} />
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