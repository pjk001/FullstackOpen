import {useState} from 'react'


const Header = (props) => {
  return (
    <>
      <h1>{props.title}</h1>
    </>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}


const Statistics = (props) => {
  if (props.all === 0) {
    return (
    <>
    <h1>{props.statsTitle}</h1>
     <div>
       No feedback given
     </div>   
    </>
    );
  }else{
    return (
    <>
      <h1>{props.statsTitle}</h1>

      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.all} />
          <StatisticLine text="average" value={props.average} />
          <StatisticLine text="positive" value={props.positive + ' %'} />
        </tbody>
      </table>
      
    </>
    );
  }
};




const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)


  const handleGoodClick = () => {
    console.log('clicked good')
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutralClick = () => {
    console.log('clicked neutral');
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBadClick = () => {
    console.log('clicked bad')
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <>
      <Header title="give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics statsTitle="statistics" good={good} neutral={neutral} bad={bad} all={all} 
        average={(good*1 + neutral*0 + bad*-1) / all} positive={(good / all) * 100} />

    </>
  )
}


export default App;
