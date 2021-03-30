import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialPolls } from '../actions/shared'

class Dashboard extends Component {
    state = {
        selectedTab: 'unanswered'
    }
    
    componentDidMount() {
        this.props.dispatch(handleInitialPolls())
    }

    render() {
        console.log("errordddddd: ",this.props)
        return (
            <div>
                <h3>Dashboard</h3>
                <ul>
                    {this.props.answeredPolls.map((id) => (
                        <li key={id}>
                            <div>POLL ID : {id}</div>
                        </li>
                    ))}

                </ul>
            </div>
        )
    }
}

function mapStateToProps({polls, authedUser, users, loadingBar}) {
    const user = users[authedUser]
    const answeredPolls = Object.keys(polls).length !== 0
        ? Object.keys(user.answers)
            .sort((a, b) => polls[b].timestamp - polls[a].timestamp)
        : []

    const unansweredPolls = Object.keys(polls).length !== 0
        ? Object.keys(polls)
            .filter(pollID => !answeredPolls.includes(pollID))
            .sort((a, b) => polls[a].timestamp - polls[b].timestamp)
        : []
    return {
        answeredPolls,
        unansweredPolls,
        loadingBar
    }
}

export default connect(mapStateToProps)(Dashboard)