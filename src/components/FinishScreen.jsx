import ResetButton from './ResetButton'

function FinishScreen({ points, maxPossiblePoints, highscore, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100

  let emoji
  if (percentage === 100) emoji = '🥇'
  if (percentage >= 80 && percentage < 100) emoji = '🥳'
  if (percentage >= 50 && percentage < 90) emoji = '🙂'
  if (percentage >= 0 && percentage < 50) emoji = '🤔'
  if (percentage === 0) emoji = '😲'

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored{' '}
        <strong>
          {points} out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
        </strong>
      </p>

      <p className="highscore">(Highscore: {highscore} points)</p>

      <ResetButton dispatch={dispatch} />
    </>
  )
}

export default FinishScreen
