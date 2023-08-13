import {useState} from 'react'
import {v4 as uuid} from 'uuid'

import './index.css'
import SlidesList from '../SlidesList'
// import SlideDisplay from '../SlideDisplay'

const SlidesBar = props => {
  const {initialSlidesList} = props

  const [newList, setNewList] = useState(initialSlidesList)
  const [activeSlide, setActiveSlide] = useState(newList[0].id)

  const [editHead, setEditHead] = useState(false)
  const [newHead, setNewHead] = useState('')

  const [editPara, setEditPara] = useState(false)
  const [newPara, setNewPara] = useState('')

  //   console.log(activeSlide)
  const onAddNewSlide = () => {
    const currIndex = newList.findIndex(slide => slide.id === activeSlide)

    const newSlide = {
      id: uuid(),
      heading: 'Heading',
      description: 'Description',
    }

    const temp = [...newList]
    temp.splice(currIndex + 1, 0, newSlide)
    setNewList(temp)
    setActiveSlide(temp[currIndex + 1].id)
    // console.log(activeSlide)
  }

  const onSetActiveSlide = id => {
    setActiveSlide(id)
  }

  const onchangeHead = e => {
    setNewHead(e.target.value)
  }

  const onchangePara = e => {
    setNewPara(e.target.value)
  }

  const saveNewHead = () => {
    const activeIndex = newList.findIndex(slide => slide.id === activeSlide)
    const currSlide = newList[activeIndex]

    const temp = [...newList]
    const newSlide = {...currSlide, heading: newHead}

    temp.splice(activeIndex, 1, newSlide)
    setNewList(temp)

    setEditHead(prevState => !prevState)
  }

  const saveNewPara = () => {
    const activeIndex = newList.findIndex(slide => slide.id === activeSlide)
    const currSlide = newList[activeIndex]

    const temp = [...newList]
    const newSlide = {...currSlide, description: newPara}

    temp.splice(activeIndex, 1, newSlide)
    setNewList(temp)

    setEditPara(prevState => !prevState)
  }

  const currSlide = () => {
    const active = newList.findIndex(slide => slide.id === activeSlide)
    const slide = newList[active]

    // console.log(slide)

    return (
      <div
        style={{textAlign: 'center', display: 'flex', flexDirection: 'column'}}
      >
        {!editHead && (
          <h1
            className="slide-display-head"
            onClick={e => {
              e.stopPropagation()
              setNewHead(slide.heading)
              setEditHead(prevState => !prevState)
            }}
          >
            {slide.heading}
          </h1>
        )}
        {editHead && (
          <input
            className="input"
            value={newHead}
            onChange={onchangeHead}
            onBlur={saveNewHead}
          />
        )}
        {!editPara && (
          <p
            className="slide-display-para"
            onClick={e => {
              e.stopPropagation()
              setNewPara(slide.description)
              setEditPara(prevState => !prevState)
            }}
          >
            {slide.description}
          </p>
        )}
        {editPara && (
          <input
            className="input"
            value={newPara}
            onChange={onchangePara}
            onBlur={saveNewPara}
          />
        )}
      </div>
    )
  }

  return (
    <div className="main-container">
      <div className="container">
        <button className="side-button" type="button" onClick={onAddNewSlide}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
            alt="new plus icon"
            className="side-image"
          />
          New
        </button>
        <ol className="slides-container">
          {newList.map((slide, i) => (
            <SlidesList
              slide={slide}
              i={i}
              key={slide.id}
              onSetActiveSlide={onSetActiveSlide}
              active={activeSlide === slide.id}
            />
          ))}
        </ol>
      </div>
      <div className="slide-show">
        {/* {newList.map(slide => (
          <SlideDisplay
            key={slide.id}
            slide={slide}
            active={activeSlide === slide.id}
          />
        ))} */}
        {currSlide()}
      </div>
    </div>
  )
}

export default SlidesBar
