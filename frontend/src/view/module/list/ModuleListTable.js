import { Table, Popconfirm } from 'antd';
import { i18n } from 'i18n';
import actions from 'modules/module/list/moduleListActions';
import destroyActions from 'modules/module/destroy/moduleDestroyActions';
import selectors from 'modules/module/list/moduleListSelectors';
import destroySelectors from 'modules/module/destroy/moduleDestroySelectors';
import model from 'modules/module/moduleModel';
import moduleSelectors from 'modules/module/moduleSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TableWrapper from 'view/shared/styles/TableWrapper';
import ButtonLink from 'view/shared/styles/ButtonLink';
import ImagesListView from 'view/shared/list/ImagesListView';
import CasedListItem from 'view/cased/list/CasedListItem';
import TaskListItem from 'view/task/list/TaskListItem';
import ModuleListItem from 'view/module/list/ModuleListItem';

const { fields } = model;

class ModuleListTable extends Component {
  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;

    dispatch(
      actions.doChangePaginationAndSort(pagination, sorter),
    );
  };

  doDestroy = (id) => {
    const { dispatch } = this.props;
    dispatch(destroyActions.doDestroy(id));
  };

  columns = [
    fields.owner.forTable({
      render: (value) => <CasedListItem value={value} />,
    }),
    fields.name.forTable(),
    fields.status.forTable(),
    fields.tasks.forTable({
      render: (value) => <TaskListItem value={value} />,
    }),
    fields.featuredImage.forTable({
      render: (value) => <ImagesListView value={value} />,
    }),
    fields.prerequisite.forTable({
      render: (value) => <ModuleListItem value={value} />,
    }),
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/module/${record.id}`}>
            {i18n('common.view')}
          </Link>
          {this.props.hasPermissionToEdit && (
            <Link to={`/module/${record.id}/edit`}>
              {i18n('common.edit')}
            </Link>
          )}
          {this.props.hasPermissionToDestroy && (
            <Popconfirm
              title={i18n('common.areYouSure')}
              onConfirm={() => this.doDestroy(record.id)}
              okText={i18n('common.yes')}
              cancelText={i18n('common.no')}
            >
              <ButtonLink>
                {i18n('common.destroy')}
              </ButtonLink>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  rowSelection = () => {
    return {
      selectedRowKeys: this.props.selectedKeys,
      onChange: (selectedRowKeys) => {
        const { dispatch } = this.props;
        dispatch(actions.doChangeSelected(selectedRowKeys));
      },
    };
  };

  render() {
    const { pagination, rows, loading } = this.props;

    return (
      <TableWrapper>
        <Table
          rowKey="id"
          loading={loading}
          columns={this.columns}
          dataSource={rows}
          pagination={pagination}
          onChange={this.handleTableChange}
          rowSelection={this.rowSelection()}
          scroll={{ x: true }}
        />
      </TableWrapper>
    );
  }
}

function select(state) {
  return {
    loading:
      selectors.selectLoading(state) ||
      destroySelectors.selectLoading(state),
    rows: selectors.selectRows(state),
    pagination: selectors.selectPagination(state),
    filter: selectors.selectFilter(state),
    selectedKeys: selectors.selectSelectedKeys(state),
    hasPermissionToEdit: moduleSelectors.selectPermissionToEdit(
      state,
    ),
    hasPermissionToDestroy: moduleSelectors.selectPermissionToDestroy(
      state,
    ),
  };
}

export default connect(select)(ModuleListTable);
