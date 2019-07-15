import React from 'react'
import { useDrag } from 'react-dnd'

function Selection({ style, onMouseDown, onTouchStart, children }) {
  const [{isDragging}, drag] = useDrag({
    item: { type: 'selection' },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
  })

  return (
    <div
      ref={drag}
				style={style}
				onMouseDown={onMouseDown}
				onTouchStart={onTouchStart}
				data-wrapper="wrapper"
    >
      {children}
    </div>
  )
}

export default Selection
