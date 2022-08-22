import _ from 'lodash'
import { useEffect, useReducer, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useQuizList from '../../hooks/useQuizList'
import Answers from '../Answers'
import MiniPlayer from '../MiniPlayer'
import ProgressBar from '../ProgressBar'
import { useAuth } from "../contexts/AuthContext";
import { getDatabase, ref, set } from 'firebase/database'

const intialState = null

const reducer = (state, action) => {
    switch (action.type) {
        case "question":
            action.value.forEach((question) => {
                question.options.forEach((option) => {
                    option.checked = false;
                })
            })
            return action.value
        case "answer":
            const questions = _.cloneDeep(state)
            questions[action.questionID].options[action.optionIndex].checked = action.value;

            return questions

        default:
            return state
    }
}

export default function Quiz() {
    const { Id } = useParams()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const { loading, error, questions } = useQuizList(Id)

    const [qna, dispatch] = useReducer(reducer, intialState)
    const {currentUser} = useAuth();
    const history = useNavigate()

    useEffect(() => {
        dispatch({
            type: "question",
            value: questions,
        })
    }, [questions])

    function handleAnswerChange(e, index) {
        dispatch({
            type: "answer",
            questionID: currentQuestion,
            optionIndex: index,
            value: e.target.checked
        })
    }

    //handle when useer clicks the next button to get the next question

    function nextQuestion(){
        if(currentQuestion <= questions.length) {
            setCurrentQuestion((prevQuestion => prevQuestion + 1))
        }
    }

    //handle when useer clicks the prev button to get back to the prev question

    function prevQuestion(){
        if(currentQuestion >= 1 && currentQuestion <= questions.length) {
            setCurrentQuestion((prevQuestion => prevQuestion - 1))
        }
    }

    //submit quiz
    async function submit() {
        const {uid} = currentUser;

        const db = getDatabase();
        const resultRef = ref(db, `result/${uid}`);

        await set(resultRef, {
            [Id]: qna
        })

        history(`/result/${Id}`, {
            state:{
                qna,
            }
        })
    }

    //calculate percentage of progress
    const percentage = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

    return (
        <>
            {loading && <div>Loading ...</div>}
            {error && <div>There was an error!</div>}
            {!loading && !error && qna && qna.length > 0 && (
                <>
                    <h1>{qna[currentQuestion].title}</h1>
                    <h4>Question can have multiple answers</h4>
                    <Answers options={qna[currentQuestion].options} handleChange={handleAnswerChange} />
                    <ProgressBar next={nextQuestion} prev={prevQuestion} progress={percentage} submit={submit}/>
                    <MiniPlayer />
                </>
            )}
        </>
    )
}