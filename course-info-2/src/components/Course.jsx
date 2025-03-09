  const Course = (props) => {
       return (
          <div>
            {props.courses.map(course => {
              return (
                <div key={course.id}>                  
                  <h1>Web development curriculum</h1>
                  <Header course={course} />
                  <Content course={course} />
                  <Total course={course} />
                </div>
              )
            })
            }       
          </div>
        )
  };

  const Header = (props) => <h2>{props.course.name}</h2>;

  const Content = (props) => {
    return (
      <div>
        {props.course.parts.map(part => {
          return <p key={part.id}>{part.name} {part.exercises}</p>
        })}
      </div>
    )
  };

  
  const Total = (props) => <p><strong>Sum of exercises is {props.course.parts.reduce((sum, part) => sum + part.exercises, 0)}</strong></p>;

  export default Course;