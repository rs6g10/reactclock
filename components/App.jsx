
import React from 'react'
import modular from 'simple-modular-scale'
import Analog from './Analog.jsx'
import Digital from './Digital.jsx'

let id = false

class App extends React.Component {

	constructor () {
		super()
		this.state = {
			now: new Date(),
			secs: new Date().getSeconds() + 1
		}
		this.tick = this.tick.bind(this)
	}

	tick () {
		clearInterval(id)
		let now = new Date()
		let secs = this.state.secs
		if (secs % 60 !== this.state.now.getSeconds()) {
			let offset = this.state.now.getSeconds() - secs % 60
			secs = secs + offset
		}
		if (now.getSeconds() > this.state.now.getSeconds() || now.getSeconds() + 60 > this.state.now.getSeconds()) {
			secs++
		}
		this.setState({ now: now, secs: secs })
		id = setInterval(this.tick, 1000)
	}

	componentDidMount () {
		this.tick()
	}

	render () {
		let now = this.state.now
		let utc = now.getTime() - (now.getTimezoneOffset() * 60000)

		// create new Date object for different city
		// using supplied offset
		let newNow = new Date(utc + (3600000*5.5))
		let ms = modular({
			ratios: [9/8, 4/3, 4/3],
			length: 32
		})
		let styles = {
			container: {
				fontFamily: 'sans-serif',
				display: 'table',
				width: '100%',
				boxSizing: 'border-box',
				padding: ms[6],
				minHeight: '100vh',
				color: 'black',
				backgroundColor: '#fff'
			},
			center: {
				display: 'table-cell',
				verticalAlign: 'middle'
			},
			watch: {
				maxWidth: ms[16],
				maxHeight: '100%',
				margin: 'auto'
			}
		}
		let time = {
			hour: now.getHours(),
			min: now.getMinutes(),
			sec: now.getSeconds(),
			millisecs: now.getMilliseconds(),
			secs: this.state.secs,
			city:'LON'
		}
		let time2 = {
			hour: newNow.getHours(),
			min: newNow.getMinutes(),
			sec: newNow.getSeconds(),
			secs: this.state.secs,
			city:'BOM'
		}

		return (
			<div style={styles.container}>
				<div style={styles.center}>
					<div style={styles.watch} >
						<Digital {...this.state} {...time} />
						<br />
						<br />
						<br />
						<Analog {...this.state} {...time} />
					</div>
				</div>
				<div style={styles.center}>
					<div style={styles.watch} >
						<Digital {...this.state2} {...time2} />
						<br />
						<br />
						<br />
						<Analog {...this.state} {...time2} />
					</div>
				</div>
			</div>
		)
	}
}

export default App
