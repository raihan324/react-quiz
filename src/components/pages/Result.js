import { useLocation, useParams } from 'react-router-dom';
import useAnswers from '../../hooks/useAnswers';
import Analysis from '../Analysis';
import Summary from '../Summary';

export default function Result() {

    const { Id } = useParams();
    const location = useLocation();

    const { loading, error, answers } = useAnswers(Id);
    console.log(location)

    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>There was an error</div>}

            {answers && answers.length > 0 && (
                <>
                    <Summary />
                    <Analysis />
                </>
            )}
        </>
    )
}