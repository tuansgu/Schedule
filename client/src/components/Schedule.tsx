import React from 'react'

const Schedule = () => {
  return (
    <>
      <div className='container' style={{marginTop: '50px'}}>
        <form>
          <input type='text' className='form-control' placeholder='Input work in here'/>
          <button type='submit' className='btn btn-primary rounded-4'>Insert</button>
        </form>
      </div>
    </>
  )
}

export default Schedule