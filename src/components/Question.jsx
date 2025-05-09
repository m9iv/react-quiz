import Options from './Options'

function Question({ answer, question, dispatch }) {
  return (
    <div>
      <h4>{question.question}</h4>

      <Options question={question} answer={answer} dispatch={dispatch} />
    </div>
  )
}

export default Question
