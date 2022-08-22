import Questions from './Questions'
import classes from '../styles/Analycsis.module.css'

export default function Analysis ({answer}) {
    return (
        <div className={classes.analysis}>
          <h1>Question Analysis</h1>
          <Questions answer={answer}/>
        </div>
    )
}