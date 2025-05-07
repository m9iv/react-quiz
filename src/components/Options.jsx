function Options({ question }) {
  return (
    <div className="options">
      {question.options.map((option) => (
        <button className="btn btn-option" key={crypto.randomUUID()}>
          {option}
        </button>
      ))}
    </div>
  )
}

export default Options
