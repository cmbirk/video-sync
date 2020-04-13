import React from 'react'

import { storiesOf } from '@storybook/react'

import 'styles.css'

import Layout from '@layout/Layout'

storiesOf('layout/Layout', module)
  .add('Layout', () => (
    <Layout>
      Some Page Content
    </Layout>
  ))
  .add('With Sidebar', () => (
    <Layout
      hasSidebar
    >
      Some Page Content with Sidebar
    </Layout>
  ))
