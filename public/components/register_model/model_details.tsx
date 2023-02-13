/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiFieldText, EuiFormRow, EuiTitle, EuiTextArea, EuiText } from '@elastic/eui';
import { useController, useFormContext } from 'react-hook-form';
import { ModelFileFormData, ModelUrlFormData } from './register_model.types';

const NAME_MAX_LENGTH = 80;
const DESCRIPTION_MAX_LENGTH = 200;
const ANNOTATION_MAX_LENGTH = 200;

export const ModelDetailsPanel = () => {
  const { control } = useFormContext<ModelFileFormData | ModelUrlFormData>();
  const nameFieldController = useController({
    name: 'name',
    control,
    rules: {
      required: { value: true, message: 'Name can not be empty' },
      maxLength: { value: NAME_MAX_LENGTH, message: 'Text exceed max length' },
    },
  });

  const descriptionFieldController = useController({
    name: 'description',
    control,
    rules: {
      required: { value: true, message: 'Description can not be empty' },
      maxLength: { value: DESCRIPTION_MAX_LENGTH, message: 'Text exceed max length' },
    },
  });

  const annotationsFieldController = useController({
    name: 'annotations',
    control,
    rules: { maxLength: { value: ANNOTATION_MAX_LENGTH, message: 'Text exceed max length' } },
  });

  const { ref: nameInputRef, ...nameField } = nameFieldController.field;
  const { ref: descriptionInputRef, ...descriptionField } = descriptionFieldController.field;
  const { ref: annotationsInputRef, ...annotationsField } = annotationsFieldController.field;

  return (
    <div>
      <EuiTitle size="s">
        <h3>Model Details</h3>
      </EuiTitle>
      <EuiFormRow
        label="Name"
        isInvalid={Boolean(nameFieldController.fieldState.error)}
        error={nameFieldController.fieldState.error?.message}
        helpText={
          <EuiText color="subdued" size="xs">
            {Math.max(NAME_MAX_LENGTH - nameField.value.length, 0)} characters allowed.
            <br />
            Use a unique for the model.
          </EuiText>
        }
      >
        <EuiFieldText
          inputRef={nameInputRef}
          isInvalid={Boolean(nameFieldController.fieldState.error)}
          {...nameField}
        />
      </EuiFormRow>
      <EuiFormRow
        label="Description"
        isInvalid={Boolean(descriptionFieldController.fieldState.error)}
        error={descriptionFieldController.fieldState.error?.message}
        helpText={`${Math.max(
          DESCRIPTION_MAX_LENGTH - descriptionField.value.length,
          0
        )} characters allowed.`}
      >
        <EuiTextArea
          inputRef={descriptionInputRef}
          isInvalid={Boolean(descriptionFieldController.fieldState.error)}
          {...descriptionField}
        />
      </EuiFormRow>
      <EuiFormRow
        helpText={`${Math.max(
          ANNOTATION_MAX_LENGTH - (annotationsField.value?.length ?? 0),
          0
        )} characters allowed.`}
        isInvalid={Boolean(annotationsFieldController.fieldState.error)}
        error={annotationsFieldController.fieldState.error?.message}
        label={
          <>
            Annotation - <i style={{ fontWeight: 'normal' }}>Optional</i>
          </>
        }
      >
        <EuiTextArea
          inputRef={annotationsInputRef}
          isInvalid={Boolean(annotationsFieldController.fieldState.error)}
          {...annotationsField}
        />
      </EuiFormRow>
    </div>
  );
};