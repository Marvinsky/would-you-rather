import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
    
    render() {
        console.log(this.props)
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

function mapStateToProps({polls, authedUser, users}) {
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
        unansweredPolls
    }
}

export default connect(mapStateToProps)(Dashboard)