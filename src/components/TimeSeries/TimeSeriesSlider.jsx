import React, { useEffect, useState } from 'react'
import leftArrow from '../../assets/imgs/leftArrowTimeseries.svg'
import rightArrow from '../../assets/imgs/rightArrowTimeseries.svg'


const TimeSeriesSlider = (props) => {
  const [datesLength, setDatesLength] = useState()
  const [active, setActive] = useState(0)
  const [timeline, setTimeline] = useState({ start: "", end: "", active: "" })

  useEffect(() => {
    if (props.body && props.body.Data.length > 0) {
      setActive(props.body.Data.length - 1)
      setTimeline({ start: props.body.Data[0].date, end: props.body.Data[props.body.Data.length - 1].date, active: props.body.Data[props.active] })
      setDatesLength(props.body.Data.length)
    }
  }, [props.body])

  useEffect(() => {
    setActive(props.active)
  }, [props?.body, props.active])

  return (
    <div className="timeseriesslider">
      {(active > 0) ?
        <img className='leftBtn' onClick={() => { props.previousProduct(props.active) }} src={leftArrow} alt="left arrow slider" />
        : ""
      }
      <div className='timelineContainer'>
        <div className='timeline'>
          {props.body.Data.map((element, i) => {
            if (active == i) {
              return (<i key={i} className='active'></i>)
            } else {
              return (<i onClick={() => { props.showCurrent(i) }} key={i}></i>)
            }
          })}
        </div>
        <span className='startDate'>{timeline.start}</span>
        <span className='activeDate'>{props.body.Data[props.active]?.date}</span>
        <span className='endDate'>{timeline.end}</span>
      </div>
      {(active < props.body.Data.length - 1) ?
        <img className='rightBtn' onClick={() => { props.nextProduct(props.active) }} src={rightArrow} alt="right arrow slider" /> : <></>
      }

    </div>
  )
}

export default TimeSeriesSlider