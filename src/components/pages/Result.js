import { useLocation, useParams } from 'react-router-dom';
import useAnswers from '../../hooks/useAnswers';
import Analysis from '../Analysis';
import Summary from '../Summary';
import _ from 'lodash'

export default function Result() {

    const { Id } = useParams();
    const { state } = useLocation();
    const { qna } = state;

    const { loading, error, answers } = useAnswers(Id);

    function calculate() {
        let score = 0

        answers.forEach((question, index1) => {
            let correctIndex = [],
                checkedIndex = [];

            question.options.forEach((option, index2) => {
                if(option.correct) correctIndex.push(index2)
                if(qna[index1].options[index2].checked) {
                    checkedIndex.push(index2)
                    option.checked = true
                }
            })

            if(_.isEqual(correctIndex,checkedIndex)){
                score = score + 5
            }
        })

        return score
    }

    const userScore = calculate()

    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>There was an error</div>}

            {answers && answers.length > 0 && (
                <>
                    <Summary score={userScore} noq={answers.length} />
                    <Analysis answer={answers} />
                </>
            )}
        </>
    )
}