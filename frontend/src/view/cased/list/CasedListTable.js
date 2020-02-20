import { Table, Popconfirm } from 'antd';
import { i18n } from 'i18n';
import actions from 'modules/cased/list/casedListActions';
import destroyActions from 'modules/cased/destroy/casedDestroyActions';
import selectors from 'modules/cased/list/casedListSelectors';
import destroySelectors from 'modules/cased/destroy/casedDestroySelectors';
import model from 'modules/cased/casedModel';
import casedSelectors from 'modules/cased/casedSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TableWrapper from 'view/shared/styles/TableWrapper';
import ButtonLink from 'view/shared/styles/ButtonLink';
import ImagesListView from 'view/shared/list/ImagesListView';
import ModuleListItem from 'view/module/list/ModuleListItem';
import PatientListItem from 'view/patient/list/PatientListItem';

const { fields } = model;

class CasedListTable extends Component {
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
    fields.id.forTable(),
    fields.name.forTable(),
    fields.description.forTable(),
    fields.status.forTable(),
    fields.featuredImage.forTable({
      render: (value) => <ImagesListView value={value} />,
    }),
    fields.modules.forTable({
      render: (value) => <ModuleListItem value={value} />,
    }),
    fields.patients.forTable({
      render: (value) => <PatientListItem value={value} />,
    }),
    fields.availableFrom.forTable(),
    fields.createdAt.forTable(),
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/cased/${record.id}`}>
            {i18n('common.view')}
          </Link>
          {this.props.hasPermissionToEdit && (
            <Link to={`/cased/${record.id}/edit`}>
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
    hasPermissionToEdit: casedSelectors.selectPermissionToEdit(
      state,
    ),
    hasPermissionToDestroy: casedSelectors.selectPermissionToDestroy(
      state,
    ),
  };
}

export default connect(select)(CasedListTable);
