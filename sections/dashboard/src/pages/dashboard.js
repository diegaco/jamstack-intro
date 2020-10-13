import React from 'react';
import { Router } from '@reach/router';
import Layout from '../components/Layout';
import Profile from '../components/Profile';
import RouteLogin from '../components/RouteLogin';
import RouteBase from '../components/RouteBase';
import RouteSecret from '../components/RouteSecret';

const Dashboard = () => (
  <Layout>
    <Profile />
    <Router>
      <RoutBase path="/dashboard/base/" />
      <RoutSecret path="/dashboard/secret/" />
      <RoutLogin path="/dashboard/login/" />
    </Router>
    <p>TODO: create a dashboard</p>
  </Layout>
);

export default Dashboard;