import { receiveUsers, saveUserAnswer, addUserPoll } from '../actions/users'
import { receivePolls, savePollAnswer, addPoll } from '../actions/polls'
import { setAuthedUser } from '../actions/authedUser'
import { getInitialUsers, getInitialPolls } from '../utils/api'
import { savePollAnswerAPI, savePollAPI } from '../utils/api'


export function handleInitialPolls() {
    return (dispatch) => {
        return getInitialPolls()
            .then((questions) => {
                dispatch(receivePolls(questions))
            })
    }
}

export function handleInitialUsers(AUTHED_ID) {
    return (dispatch) => {
        return getInitialUsers()
            .then((users) => {
                dispatch(receiveUsers(users))
                dispatch(setAuthedUser(AUTHED_ID))
            })
    }
}

export function handleSavePollAnswer(qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        return savePollAnswerAPI(authedUser, qid, answer)
            .then(() => {
                dispatch(savePollAnswer(authedUser, qid, answer))
                dispatch(saveUserAnswer(authedUser, qid, answer))
            })
    }
}

export function handleAddPoll(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        const author = authedUser
        return savePollAPI({optionOneText, optionTwoText, author})
            .then((poll) => {
                dispatch(addPoll(poll))
                dispatch(addUserPoll(authedUser, poll.id))
            })
    }
}
