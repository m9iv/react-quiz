function Options({ answer, question, dispatch }) {
  const hasAnswered = answer !== null

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={crypto.randomUUID()}
          className={`btn btn-option ${index === answer ? 'answer' : ''}
          ${
            hasAnswered
              ? index === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }
          `}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
          disabled={hasAnswered}>
          {option}
        </button>
      ))}
    </div>
  )
}

export default Options
