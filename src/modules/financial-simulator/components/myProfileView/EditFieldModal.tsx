'use client'

import React, { useEffect } from 'react'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { Button } from "@shared/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@shared/components/ui/dialog"
import {
  User,
  Mail,
  AtSign,
  Save
} from 'lucide-react'
import { EditFieldModalProps, EditableField } from '../../types/profile.types'
import { FIELD_LABELS, BUTTON_LABELS, FORM_VALIDATION, ERROR_MESSAGES } from '../../constants/my-profile.constants'

// Tipos para el formulario
interface FormValues {
  fieldValue: string
}

// Utilidades
const getFieldIcon = (field: EditableField | null) => {
  switch (field) {
    case 'firstName': return User
    case 'lastName': return User
    case 'username': return AtSign
    case 'email': return Mail
    default: return User
  }
}

const getFieldPlaceholder = (field: EditableField | null) => {
  switch (field) {
    case 'firstName': return 'Ingresa tu nombre'
    case 'lastName': return 'Ingresa tu apellido'
    case 'username': return 'Ingresa tu nombre de usuario'
    case 'email': return 'Ingresa tu correo electrónico'
    default: return ''
  }
}

// Esquemas de validación con Yup
const createValidationSchema = (field: EditableField | null) => {
  let schema = Yup.string().trim().required(ERROR_MESSAGES.requiredField)

  switch (field) {
    case 'firstName':
      schema = schema
        .min(FORM_VALIDATION.firstName.minLength, `Mínimo ${FORM_VALIDATION.firstName.minLength} caracteres`)
        .max(FORM_VALIDATION.firstName.maxLength, `Máximo ${FORM_VALIDATION.firstName.maxLength} caracteres`)
      break
    case 'lastName':
      schema = schema
        .min(FORM_VALIDATION.lastName.minLength, `Mínimo ${FORM_VALIDATION.lastName.minLength} caracteres`)
        .max(FORM_VALIDATION.lastName.maxLength, `Máximo ${FORM_VALIDATION.lastName.maxLength} caracteres`)
      break
    case 'username':
      schema = schema
        .min(FORM_VALIDATION.username.minLength, `Mínimo ${FORM_VALIDATION.username.minLength} caracteres`)
        .max(FORM_VALIDATION.username.maxLength, `Máximo ${FORM_VALIDATION.username.maxLength} caracteres`)
        .matches(FORM_VALIDATION.username.pattern, 'Solo letras, números y guiones bajos')
      break
    case 'email':
      schema = schema
        .email(ERROR_MESSAGES.invalidEmail)
        .matches(FORM_VALIDATION.email.pattern, ERROR_MESSAGES.invalidEmail)
      break
  }

  return Yup.object({
    fieldValue: schema
  })
}

export function EditFieldModal({
  isOpen,
  field,
  currentValue,
  onSave,
  onClose,
  isLoading
}: EditFieldModalProps) {
  const Icon = getFieldIcon(field)
  const fieldLabel = field ? FIELD_LABELS[field] : ''
  const placeholder = getFieldPlaceholder(field)
  const validationSchema = createValidationSchema(field)

  // Valores iniciales del formulario
  const initialValues: FormValues = {
    fieldValue: currentValue
  }

  const handleOpenChange = (open: boolean) => {
    if (!open && !isLoading) {
      onClose()
    }
  }

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    if (!field) return

    try {
      await onSave(field, values.fieldValue.trim())
    } catch (err) {
      console.error('Error saving field:', err)
      // El error se maneja en el hook, aquí solo necesitamos limpiar el estado
    } finally {
      setSubmitting(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, submitForm: () => void) => {
    if (e.key === 'Escape') {
      onClose()
    }
    // Enter se maneja automáticamente por el form submit
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ values, errors, touched, isSubmitting, isValid, dirty, submitForm }) => (
            <Form>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <DialogTitle>Editar {fieldLabel}</DialogTitle>
                    <DialogDescription>
                      Actualiza tu información personal
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {fieldLabel}
                  </label>
                  <div className="relative">
                    <Field
                      name="fieldValue"
                      type={field === 'email' ? 'email' : 'text'}
                      placeholder={placeholder}
                      onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e, submitForm)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.fieldValue && touched.fieldValue
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-gray-300'
                      }`}
                      disabled={isSubmitting || isLoading}
                      autoFocus
                    />
                  </div>
                  {errors.fieldValue && touched.fieldValue && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.fieldValue}
                    </p>
                  )}
                </div>

                {/* Current vs New Value Preview */}
                {dirty && values.fieldValue.trim() !== currentValue && (
                  <div className="bg-gray-50 rounded-lg p-3 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-600">Actual:</span>
                        <p className="font-medium text-gray-900 truncate">{currentValue}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Nuevo:</span>
                        <p className="font-medium text-blue-600 truncate">{values.fieldValue.trim()}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className='mt-4'>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting || isLoading}
                >
                  {BUTTON_LABELS.cancel}
                </Button>
                <Button
                  type="submit"
                  disabled={!isValid || !dirty || isSubmitting || isLoading}
                  className="min-w-[100px]"
                >
                  {isSubmitting || isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Guardando...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      {BUTTON_LABELS.save}
                    </div>
                  )}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}