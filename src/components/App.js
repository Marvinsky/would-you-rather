import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialUsers } from '../actions/shared'
import Dashboard from './Dashboard'

class App extends Component {
    componentDidMount() {
        const AUTHED_ID = null
        this.props.dispatch(handleInitialUsers(AUTHED_ID))
    }
    render() {
        return (
            <div>
                <Dashboard />
            </div>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(App)