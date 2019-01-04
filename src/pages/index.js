import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Image from '../components/image';

import { initAuth } from '../app/services/auth';
initAuth();

class IndexPage extends React.Component {
  state = {
    loading: false,
    msg: null,
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
              {/* <li>
                Visit the <Link to="/app/">dynamic page</Link>
              </li> */}
            </ul>
            <hr />
            <button onClick={this.callLambdaFunction}>
              {loading ? 'Loading...' : 'Call Lambda Function'}
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
