import { Button, Form, Row, Col, Icon } from 'antd';
import { Formik, FieldArray, Field} from 'formik';
import { i18n } from 'i18n';
import model from 'modules/quiz/quizModel';
import React, { Component } from 'react';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import Spinner from 'view/shared/Spinner';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import FormSchema from 'view/shared/form/formSchema';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import InputNumberFormItem from 'view/shared/form/items/InputNumberFormItem';

const { fields } = model;

const initialValues = {
  options: [
    {
      name: "option1",
      correct: true
    }
  ]
};

class QuizForm extends Component {
  schema = new FormSchema(fields.id, [
    fields.url,
    fields.videoLength,
    fields.evaluationname,
    fields.evaluationoperator,
    fields.requiredWatchTime,
  ]);

  handleSubmit = (values) => {
    const { id, ...data } = this.schema.cast(values);
    const newPayload = {
      url: data.url,
      videoLength: data.videoLength,
      evaluationCriteria: {
        name: data.evaluationCriteriaName,
        operator: data.evaluationCriteriaOperator,
        requiredWatchTime: data.evaluationCriteriaRequiredWatchTime
      },
    }
    this.props.onSubmit(id, newPayload);
  };

  initialValues = () => {
    const record = this.props.record;
    return this.schema.initialValues(record || { options: []});
  };

  renderForm() {
    const { saveLoading, isEditing } = this.props;

    return (
      <FormWrapper>
        <Formik
          initialValues={initialValues}
          validationSchema={this.schema.schema}
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <Form onSubmit={form.handleSubmit}>
                {isEditing && (
                  <ViewFormItem
                    name={fields.id.name}
                    label={fields.id.label}
                  />
                )}
                <InputFormItem
                  name={fields.url.name}
                  label={fields.url.label}
                  required={fields.url.required}
                  autoFocus
                />
                <InputNumberFormItem
                  name={fields.videoLength.name}
                  label={fields.videoLength.label}
                  required={
                    fields.videoLength.required
                  }
                />
                <div>Add Options</div>
                <FieldArray
                name="options"
                render={({ insert, remove, push }) => (
                  <div>
                  {form.values.options.length > 0 &&
                    form.values.options.map((friend, index) => (
                      <Row key={index}>
                        <Col span={12}>
                          <Field
                            className="ant-input"
                            name={`options.${index}.name`}
                            placeholder="add options here ..."
                            type="text"
                          />
                          {form.errors.options &&
                            form.errors.options[index] &&
                            form.errors.options[index].name &&
                            form.touched.options &&
                            form.touched.options[index].name && (
                              <div className="field-error">
                                {form.errors.options[index].name}
                              </div>
                            )}
                        </Col>
                        <Col span={12}>
                          <label htmlFor={`options.${index}.correct`}>
                            Is Correct?
                          </label>
                          <Field
                            name={`options.${index}.correct`}
                            type="checkbox"
                          />
                          <Icon
                            type="delete"
                            className="secondary"
                            onClick={() => remove(index)}
                          />
                          {form.errors.options &&
                            form.errors.options[index] &&
                            form.errors.options[index].correct &&
                            form.touched.options &&
                            form.touched.options[index].correct && (
                              <div className="field-error">
                                {form.errors.options[index].correct}
                              </div>
                            )}
                        </Col>
                      </Row>
                    ))}
                  <Button
                    type="dashed"
                    onClick={() => push({ name: "", correct: "" })}
                  >
                    <Icon type="plus" /> Add New Option
                  </Button>
                </div>
              )}
            />
                <InputFormItem
                  name={fields.evaluationname.name}
                  label={fields.evaluationname.label}
                  required={fields.evaluationname.required}
                />
                <SelectFormItem
                  name={fields.evaluationoperator.name}
                  label={fields.evaluationoperator.label}
                  options={fields.evaluationoperator.options.map(
                    (item) => ({
                      value: item.id,
                      label: item.label,
                    }),
                  )}
                  required={fields.evaluationoperator.required}
                />
                <InputNumberFormItem
                  name={fields.requiredWatchTime.name}
                  label={fields.requiredWatchTime.label}
                  required={
                    fields.requiredWatchTime.required
                  }
                />

                <Form.Item
                  className="form-buttons"
                  {...tailFormItemLayout}
                >
                  <Button
                    loading={saveLoading}
                    type="primary"
                    onClick={form.handleSubmit}
                    icon="save"
                  >
                    {i18n('common.save')}
                  </Button>

                  <Button
                    disabled={saveLoading}
                    onClick={form.handleReset}
                    icon="undo"
                  >
                    {i18n('common.reset')}
                  </Button>

                  {this.props.onCancel ? (
                    <Button
                      disabled={saveLoading}
                      onClick={() => this.props.onCancel()}
                      icon="close"
                    >
                      {i18n('common.cancel')}
                    </Button>
                  ) : null}
                </Form.Item>
              </Form>
            );
          }}
        />
      </FormWrapper>
    );
  }

  render() {
    const { isEditing, findLoading, record } = this.props;

    if (findLoading) {
      return <Spinner />;
    }

    if (isEditing && !record) {
      return <Spinner />;
    }

    return this.renderForm();
  }
}

export default QuizForm;
