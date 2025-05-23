import { useEffect, useReducer } from 'react'

import Header from './Header'
import Main from './Main'
import StartScreen from './StartScreen'
import FinishScreen from './FinishScreen'
import Question from './Question'
import NextButton from './NextButton'
import Progress from './Progress'

import Loader from './Loader'
import Error from './Error'
import Timer from './Timer'

const SECS_PER_QUESTION = 30

const initialState = {
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
}

function reducer(state, action) {
  switch (action.type) {
    case 'dataRecieved':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      }

    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      }

    case 'start':
      return {
        ...state,
        status: 'active',
      }

    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      }

    case 'reset':
      return { ...initialState, status: 'ready', questions: state.questions }

    case 'newAnswer': {
      const question = state.questions.at(state.index)

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      }
    }

    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null }

    default:
      throw new Error('Action unknown')
  }
}

export default function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState)

  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  )

  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataRecieved', payload: data }))
      .catch((error) => dispatch({ type: 'dataFailed' }))
  }, [])

  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />

            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <footer>
              <Timer
                dispatch={dispatch}
                initialTime={SECS_PER_QUESTION * numQuestions}
              />

              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </footer>
          </>
        )}

        {status === 'finished' && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  )
}
