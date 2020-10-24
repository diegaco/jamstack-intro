import React, { useEffect, useState } from 'react';
import { Router } from '@reach/router';
import { navigate } from 'gatsby';
import Layout from '../components/Layout';
import IdentityModal from 'react-netlify-identity-widget';
import Profile from '../components/Profile';
import RoutePrivate from '../components/RoutePrivate';
import RouteLogin from '../components/RouteLogin';
import RouteBase from '../components/RouteBase';
import RouteSecret from '../components/RouteSecret';

import 'react-netlify-identity-widget/styles.css';

const Dashboard = ({ location }) => {

  const [isVisible, setVisibility] = useState(false);

  useEffect(() => {
    if (location.pathname.match(/^\/dashboard\/?$/)) {
      navigate('/dashboard/login', {replace: true})
    }
  }, []);

  const showModal = () => {
    setVisibility(true);
  }

  return (
    <Layout>
      <Profile showModal={showModal} />
      <Router>
        <RoutePrivate component={RouteBase} path="/dashboard/base" />
        <RoutePrivate component={RouteSecret} path="/dashboard/secret" />
        <RouteLogin path="/dashboard/login" showModal={showModal}/>
      </Router>
      <IdentityModal showDialog={isVisible} onCloseDialog={() => setVisibility(false)}/>
    </Layout>
  );
};

export default Dashboard;