import { h, Component } from 'preact'
import {sendScreen} from '../../Tracker'
import {wrapArray} from '../utils/array'
import theme from '../Theme/style.css'
import NavigationBar from '../NavigationBar'

class StepsRouter extends Component {
  constructor(props) {
    super(props)
  }

  trackScreen = (screenNameHierarchy, properties = {}) => {
    const { step } = this.currentComponent()
    sendScreen(
      [step.type, ...wrapArray(screenNameHierarchy)],
      {...properties, ...step.options})
  }

  currentComponent = () => this.props.componentsList[this.props.step]

  render = ({options: {...globalUserOptions}, ...otherProps}) => {
    const componentBlob = this.currentComponent()
    const CurrentComponent = componentBlob.component
    return (
      <div className={theme.step}>
        {!this.props.disableBackNavigation && <NavigationBar back={this.props.back} />}
        <CurrentComponent
          {...{...componentBlob.step.options, ...globalUserOptions, ...otherProps}}
          trackScreen = {this.trackScreen}
        />
      </div>
    )
  }
}

export default StepsRouter
