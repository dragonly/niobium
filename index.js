const libui = require('libui-node')
const htmlParser = require('fast-html-parser')

const {
	window,
	entry,
	vBox,
} = require('./uiMaker')

let root = htmlParser.parse('<p id="root">Hello World!</p>')


function buildSolidBrush(color, alpha) {
	let component
	component = (color >> 16) & 0xff
	const R = component / 255
	component = (color >> 8) & 0xff
	const G = component / 255
	component = color & 0xff
	const B = component / 255
	const A = alpha

	const brush = new libui.DrawBrush()
	brush.color = new libui.Color(R, G, B, A)
	brush.type = libui.brushType.solid
	return brush
}

const WIN_WIDTH = 600
const WIN_HEIGHT = 400
let webPageSize = [WIN_WIDTH - 40, WIN_HEIGHT * 2]
let webPage = newWebPage(webPageSize)
function newWebPage(webPageSize) {
  return new libui.UiArea(
    function draw(area, param) {
      let brush = buildSolidBrush(0xffffff, 1.0)
      path = new libui.UiDrawPath(0)
      path.addRectangle(0, 0, ...webPageSize)
      path.end()
      param.getContext().fill(path, brush)
      console.log('draw', webPageSize)
    },
    function mouseEvent(area, e) {
      // console.log({
      //   area: area,
      //   x: e.getX(),
      //   y: e.getY(),
      //   areaWidth: e.getAreaWidth(),
      //   areaHeight: e.getAreaHeight(),
      //   down: e.getDown(),
      //   up: e.getUp(),
      //   count: e.getCount(),
      //   modifiers: e.getModifiers(),
      //   held1To64: e.getHeld1To64()
      // })
    },
    function mouseCrossed(area, left) {
      if (left === 0) {
        console.log('mouse in')
      } else {
        console.log('mouse out')
      }
    },
    null,
    function keyEvent(area, e) {
      if (e.getUp() === 0) {
        console.log('keydown')
      } else {
        console.log('keyup')
      }
      console.log({
        up: e.getUp(),
        extKey: e.getExtKey(),
        key: e.getKey(),
        modifiers: e.getModifiers()
      })
    },
    ...webPageSize
  )
}

let urlEntry
let win = window({
    title: 'Niobium - A Damn Simple Web Browser :/',
    width: WIN_WIDTH,
    height: WIN_HEIGHT,
    hasMenubar: true,
    onClosing: () => libui.stopLoop()
  },
  vBox(
    {padded: true},
    urlEntry = entry({
      text: 'url',
      onChanged: (data) => {console.log(urlEntry)}
    }),
    webPage
  )
)

win.onContentSizeChanged(() => {
  webPageSize = [win.contentSize.w - 40, win.contentSize.h * 2]
  webPage = newWebPage(webPageSize)
  win.setChild(vBox(
    {padded: true},
    urlEntry = entry({
      text: 'url',
      onChanged: (data) => {console.log(urlEntry)}
    }),
    webPage
  ))
})

win.show()

libui.startLoop()
