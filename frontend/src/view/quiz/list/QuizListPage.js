import { i18n } from 'i18n'
import React, { Component } from 'react'
import Breadcrumb from 'view/shared/Breadcrumb'
import PageTitle from 'view/shared/styles/PageTitle'
import VideoListTable from 'view/quiz/list/VideoListTable'
import VideoListFilter from 'view/quiz/list/VideoListFilter'
import ContentWrapper from 'view/layout/styles/ContentWrapper'
import VideoListToolbar from 'view/quiz/list/VideoListToolbar'

class VideoListPage extends Component {
  render () {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[ [ i18n('home.menu'), '/' ], [ i18n('entities.quiz.menu') ] ]}
        />
        <ContentWrapper>
          <PageTitle>
            {i18n('entities.quiz.list.title')}
          </PageTitle>
          <VideoListToolbar />
          <VideoListFilter />
          <VideoListTable />
        </ContentWrapper>
      </React.Fragment>
    )
  }
}

export default VideoListPage
