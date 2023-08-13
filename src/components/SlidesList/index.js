import './index.css'

const SlidesList = props => {
  const {slide, i, onSetActiveSlide, active} = props
  const onSetActiveSlideID = () => {
    onSetActiveSlide(slide.id)
    // console.log(slide.id)
  }

  const setClass = active ? 'curr-slide-button active' : 'curr-slide-button'
  const slideNumber = i + 1

  return (
    <>
      <button className={setClass} type="button" onClick={onSetActiveSlideID}>
        <li
          key={slide.id}
          className="list-obj"
          testid={`slideTab ${slideNumber}`}
        >
          <p className="index">{slideNumber}.</p>
          <div className="slides">
            <h1 className="list-head">{slide.heading}</h1>
            <p className="slide-para">{slide.description}</p>
          </div>
        </li>
      </button>
    </>
  )
}

export default SlidesList
