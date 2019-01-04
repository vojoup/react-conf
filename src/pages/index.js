import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Image from '../components/image';

import { initAuth, getUser } from '../utils/auth';
initAuth();

class IndexPage extends React.Component {
  state = {
    loading: false,
    msg: null,
  };

  authHello = e => {
    e.preventDefault();
    const user = getUser();
    this.setState({ loading: true });
    fetch('/.netlify/functions/auth-hello', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token.access_token,
      },
    })
      .then(response => response.json())
      .then(json => this.setState({ loading: false, json }));
  };

  callLambdaFunction = e => {
    e.preventDefault();

    this.setState({ loading: true });
    fetch('/.netlify/functions/hello')
      .then(response => response.json())
      .then(({ msg }) => this.setState({ loading: false, msg }));
  };

  render() {
    const { loading, msg } = this.state;
    return (
      <Layout>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <ul>
              <li>
                visit the <Link to="/page-2/">statically generated page</Link>
              </li>
            </ul>
            <hr />
            <button onClick={this.callLambdaFunction}>
              {loading ? 'Loading...' : 'Call Lambda greeting'}
            </button>
            <button onClick={this.authHello}>
              {loading ? 'Loading...' : 'Call Lambda login'}
            </button>
            <br />
            <span>
              {msg
                ? 'Here is the response: ' + msg
                : 'click the button and watch this!'}
            </span>
          </div>
          <div
            style={{
              borderLeft: 'brown',
              borderLeftStyle: 'dashed',
              paddingLeft: '3rem',
            }}
          >
            <p>Now go build something great.</p>
            <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
              <Image />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default IndexPage;
