import { useEffect, useRef, useState } from 'react'

function Timer({ dispatch, initialTime }) {
  const [secondsRemaining, setSecondsRemaining] = useState(initialTime)
  const refSecondsRemaining = useRef(initialTime)

  const minutes = Math.floor(secondsRemaining / 60)
  const seconds = secondsRemaining % 60

  useEffect(
    function () {
      const id = setInterval(function () {
        if (refSecondsRemaining.current <= 0) {
          dispatch({ type: 'finish' })
        } else {
          const nextSecondsRemaining = refSecondsRemaining.current - 1

          refSecondsRemaining.current = nextSecondsRemaining
          setSecondsRemaining(nextSecondsRemaining)
        }
      }, 1000)

      return () => clearInterval(id)
    },
    [dispatch]
  )

  return (
    <>
      {secondsRemaining > 0 && (
        <div className="timer">
          {minutes < 10 && '0'}
          {minutes}:{seconds < 10 && '0'}
          {seconds}
        </div>
      )}
    </>
  )
}

export default Timer
