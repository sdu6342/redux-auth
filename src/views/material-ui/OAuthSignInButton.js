import React, { PropTypes } from "react";
import { connect } from "react-redux";
import ButtonLoader from "./ButtonLoader";
import {ActionExitToApp} from "material-ui/lib/svg-icons";
import { oAuthSignIn } from "../../actions/oauth-sign-in";

class OAuthSignInButton extends React.Component {
  static propTypes = {
    provider: PropTypes.string.isRequired,
    label: PropTypes.string,
    signInParams: PropTypes.object,
    children: PropTypes.node,
    icon: PropTypes.func
  }

  static defaultProps = {
    signInParams: {},
    children: <span>OAuth Sign In</span>,
    icon: ActionExitToApp
  }

  getEndpoint () {
    return (
      this.props.endpoint ||
      this.props.auth.getIn(["configure", "currentEndpointKey"]) ||
      this.props.auth.getIn(["configure", "defaultEndpointKey"])
    );
  }

  handleClick () {
    this.props.dispatch(oAuthSignIn({
      provider: this.props.provider,
      params: this.props.signInParams,
      endpointKey: this.getEndpoint()
    }));
  }

  render () {
    let disabled = this.props.auth.getIn(["user", "isSignedIn"]);
    let loading = (
      (this.props.auth.getIn(["ui", "oAuthSignInLoadingProvider"]) === this.props.provider) &&
      this.props.auth.getIn(["oAuthSignIn", this.getEndpoint(), "loading"])
    );

    return (
      <ButtonLoader
        loading={loading}
        icon={this.props.icon}
        className="oauth-sign-in-submit"
        disabled={disabled}
        onClick={this.handleClick.bind(this)}
        {...this.props} />
    );
  }
}

export default connect(({auth}) => ({auth}))(OAuthSignInButton);