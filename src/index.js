import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ThemeButton extends React.Component {
    render() {
        return <button className='theme-button' onClick={this.props.onClick}></button>
    }
}

class StopwatchWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: ''
        }
    }

    changeTheme() {
        this.setState({
            theme: this.state.theme === 'dark' ? '' : 'dark'
        })
    }

    render() {
        return <div className={`stopwatch-wrapper flex-centered ${this.state.theme}`}>
            <ThemeButton onClick={() => {this.changeTheme()}}/>
            <Stopwatch />
        </div>
    }
}

class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: new Date(),
            current: '0:00'
        }
    }

    millisToMinutesAndSeconds(millis) {
        const minutes = Math.floor(millis / 60000);
        const seconds = Math.floor((millis % 60000) / 1000);
        const milliseconds = ('0' + Math.floor(millis % 1000 / 10)).slice(-2);
        return ('0' + minutes).slice(-2) + ':' + (seconds < 10 ? '0' : '') + seconds + ':' + milliseconds;
    }

    getTimeDifference() {
        return this.millisToMinutesAndSeconds(new Date() - this.state.start);
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({
                current: this.getTimeDifference()
            })
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let time = this.state.current ? this.state.current.toString() : this.state.start.toString();
        return (
            <div className="stopwatch">
                {time}
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
<StopwatchWrapper />,
document.getElementById('root')
);  