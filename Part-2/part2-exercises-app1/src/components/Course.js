const Course = ({ course }) => {
  const totalAmount = course.parts.reduce(function(sum, course) {
    return sum + course.exercises
  }, 0)

  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total total={totalAmount} />
    </>
  )
}


const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />
        )}
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Total = ({ total }) => {
  return (
    <strong>total of {total} exercises</strong>
  )
}


//failed attempt
/*
const Part = ({name, exercises}) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = ({ courses }) => {
  const contents = courses.part.map(function(course) {
   return <p key={course.id}>{course.name} {course.exercises}</p>
  })

  return <div>{contents}</div>
}


const Total = ({ courses }) => {
  const totalAmount = courses.part.reduce(function(sum, course) {
    return sum + course.exercises
  }, 0)

  return <p><strong>total of {totalAmount} exercises</strong></p>
}
*/

export default Course
