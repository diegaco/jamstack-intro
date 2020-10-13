import React, { useEffect } from 'react';
import { Router } from '@reach/router';
import { navigate } from 'gatsby';
import Layout from '../components/Layout';
import Profile from '../components/Profile';
import RouteLogin from '../components/RouteLogin';
import RouteBase from '../components/RouteBase';
import RouteSecret from '../components/RouteSecret';

const Dashboard = ({ location }) => {

  useEffect(() => {
    if (location.pathname.match(/^\/dashboard\/?$/)) {
      navigate('/dashboard/login', {replace: true})
    }
  }, []);

  return (
    <Layout>
      <Profile />
      <Router>
        <RouteBase path="/dashboard/base" />
        <RouteSecret path="/dashboard/secret" />
        <RouteLogin path="/dashboard/login" />
      </Router>
    </Layout>
  );
};

export default Dashboard;