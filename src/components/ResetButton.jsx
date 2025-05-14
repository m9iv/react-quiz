function ResetButton({ dispatch }) {
  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: 'reset' })}>
      Restart quiz
    </button>
  )
}

export default ResetButton
