import { receiveUsers, saveUserAnswer, addUserPoll } from '../actions/users'
import { receivePolls, savePollAnswer, addPoll } from '../actions/polls'
import { setAuthedUser } from '../actions/authedUser'
import { getInitialUsers, getInitialPolls } from '../utils/api'
import { savePollAnswerAPI, savePollAPI } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'


export function handleInitialPolls() {
    return (dispatch) => {
        dispatch(showLoading)
        return getInitialPolls()
            .then((questions) => {
                dispatch(receivePolls(questions))
                dispatch(hideLoading())
            })
    }
}

export function handleInitialUsers(AUTHED_ID) {
    return (dispatch) => {
        dispatch(showLoading)
        return getInitialUsers()
            .then((users) => {
                dispatch(receiveUsers(users))
                dispatch(setAuthedUser(AUTHED_ID))
                dispatch(hideLoading())
            })
    }
}

export function handleSavePollAnswer (qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        return savePollAnswerAPI({authedUser, qid, answer})
            .then(() => {
                dispatch(savePollAnswer(authedUser, qid, answer))
                dispatch(saveUserAnswer(authedUser, qid, answer))
                dispatch(hideLoading())
            })  
    }
}

export function handleAddPoll(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        dispatch(showLoading)
        const { authedUser } = getState()
        const author = authedUser
        return savePollAPI({optionOneText, optionTwoText, author})
            .then((poll) => {
                dispatch(addPoll(poll))
                dispatch(addUserPoll(authedUser, poll.id))
                dispatch(hideLoading())
            })
    }
}
