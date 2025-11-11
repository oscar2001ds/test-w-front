'use client'

import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Button } from "../../../../shared/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../shared/components/ui/dialog"
import { Badge } from "../../../../shared/components/ui/badge"
import { Loader2 } from 'lucide-react'
import {
  CreateSimulationFormData,
  EditSimulationFormData,
  SimulationItem
} from '../../types/my-simulations.types'
import {
  FORM_LABELS,
  PAYMENT_METHOD_OPTIONS,
  STATUS_LABELS,
  STATUS_COLORS
} from '../../constants/my-simulations.constants'
import { SimulationInput } from '../common/SimulationInput'

interface SimulationFormModalProps {
  isOpen: boolean
  mode: 'create' | 'edit'
  simulation?: SimulationItem | null
  onClose: () => void
  onSubmit: (data: CreateSimulationFormData | EditSimulationFormData) => Promise<void>
  isLoading?: boolean
}

// Esquemas de validación con Yup
const CreateSimulationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(100, 'El título no puede exceder 100 caracteres')
    .required('El título es obligatorio'),
  amount: Yup.number()
    .positive('El monto debe ser mayor a 0')
    .max(999999999, 'El monto es demasiado alto')
    .required('El monto es obligatorio'),
  paymentMethod: Yup.string()
    .oneOf(['monthly', 'annual'], 'Método de pago inválido')
    .required('El método de pago es obligatorio'),
  startDate: Yup.date()
    .min(new Date(), 'La fecha de inicio debe ser futura')
    .required('La fecha de inicio es obligatoria'),
  endDate: Yup.date()
    .min(Yup.ref('startDate'), 'La fecha de fin debe ser posterior a la fecha de inicio')
    .required('La fecha de fin es obligatoria')
})

const EditSimulationSchema = Yup.object().shape({
  id: Yup.string().required(),
  title: Yup.string()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(100, 'El título no puede exceder 100 caracteres')
    .required('El título es obligatorio'),
  amount: Yup.number()
    .positive('El monto debe ser mayor a 0')
    .max(999999999, 'El monto es demasiado alto')
    .required('El monto es obligatorio'),
  paymentMethod: Yup.string()
    .oneOf(['monthly', 'annual'], 'Método de pago inválido')
    .required('El método de pago es obligatorio'),
  startDate: Yup.date()
    .required('La fecha de inicio es obligatoria'),
  endDate: Yup.date()
    .min(Yup.ref('startDate'), 'La fecha de fin debe ser posterior a la fecha de inicio')
    .required('La fecha de fin es obligatoria'),
  termMonths: Yup.number()
    .integer('La duración debe ser un número entero')
    .min(1, 'La duración debe ser al menos 1 mes')
    .required('La duración es obligatoria'),
  status: Yup.string()
    .oneOf(['active', 'completed', 'paused'], 'Estado inválido')
    .required('El estado es obligatorio')
})

export function SimulationFormModal({
  isOpen,
  mode,
  simulation,
  onClose,
  onSubmit,
  isLoading = false
}: SimulationFormModalProps) {

  const getInitialValues = () => {
    if (mode === 'create') {
      return {
        title: '',
        amount: '',
        paymentMethod: 'monthly',
        startDate: '',
        endDate: ''
      }
    } else if (simulation) {
      return {
        id: simulation.id,
        title: simulation.title,
        amount: simulation.amount,
        paymentMethod: simulation.paymentMethod,
        startDate: simulation.startDate ? new Date(simulation.startDate).toISOString().split('T')[0] : '',
        endDate: simulation.endDate ? new Date(simulation.endDate).toISOString().split('T')[0] : '',
        termMonths: simulation.termMonths,
        status: simulation.status
      }
    }
    return {}
  }

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      let dataToSubmit;
      
      if (mode === 'create') {
        dataToSubmit = {
          title: values.title,
          amount: parseFloat(values.amount),
          paymentMethod: values.paymentMethod,
          startDate: new Date(values.startDate).toISOString(),
          endDate: new Date(values.endDate).toISOString()
        } as CreateSimulationFormData;
      } else {
        dataToSubmit = {
          id: values.id,
          title: values.title,
          amount: parseFloat(values.amount),
          paymentMethod: values.paymentMethod,
          startDate: new Date(values.startDate).toISOString(),
          endDate: new Date(values.endDate).toISOString(),
          termMonths: values.termMonths, // Se mantiene el valor calculado
          status: values.status
        } as EditSimulationFormData;
      }
      
      await onSubmit(dataToSubmit);
      onClose();
    } catch (error) {
      console.error('Error al enviar formulario:', error);
    } finally {
      setSubmitting(false);
    }
  }

  const validationSchema = mode === 'create' ? CreateSimulationSchema : EditSimulationSchema;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {mode === 'create' ? 'Nueva Simulación' : 'Editar Simulación'}
            {mode === 'edit' && simulation && (
              <Badge className={STATUS_COLORS[simulation.status]}>
                {STATUS_LABELS[simulation.status]}
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create' 
              ? 'Completa los datos para crear una nueva simulación financiera.'
              : 'Modifica los datos de la simulación existente.'
            }
          </DialogDescription>
        </DialogHeader>

        <Formik
          initialValues={getInitialValues()}
          validationSchema={validationSchema}
          enableReinitialize={true}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, values, setFieldValue }) => {
            // Calcular automáticamente termMonths cuando cambien las fechas en modo edición
            React.useEffect(() => {
              if (mode === 'edit' && values.startDate && values.endDate) {
                const startDate = new Date(values.startDate)
                const endDate = new Date(values.endDate)
                if (endDate > startDate) {
                  const diffTime = endDate.getTime() - startDate.getTime()
                  const diffMonths = Math.round(diffTime / (1000 * 60 * 60 * 24 * 30.44))
                  setFieldValue('termMonths', Math.max(1, diffMonths))
                }
              }
            }, [values.startDate, values.endDate, mode, setFieldValue])

            return (
            <Form className="space-y-4">
              {/* Título */}
              <SimulationInput
                label={FORM_LABELS.title}
                name="title"
                type="text"
                placeholder="Ej: Plan de inversión a largo plazo"
                error={errors.title}
              />

              {/* Monto */}
              <SimulationInput
                label={FORM_LABELS.amount}
                name="amount"
                type="number"
                placeholder="0.00"
                min="0"
                step="0.01"
                error={errors.amount}
              />

              {/* Método de Pago */}
              <SimulationInput
                label={FORM_LABELS.paymentMethod}
                name="paymentMethod"
                placeholder="Seleccionar método"
                options={PAYMENT_METHOD_OPTIONS}
                error={errors.paymentMethod}
              />

              {/* Fechas de Inicio y Fin */}
              <div className="grid grid-cols-2 gap-4">
                <SimulationInput
                  label={FORM_LABELS.startDate}
                  name="startDate"
                  type="date"
                  error={errors.startDate}
                />

                <SimulationInput
                  label={FORM_LABELS.endDate}
                  name="endDate"
                  type="date"
                  error={errors.endDate}
                />
              </div>

              {/* Duración (solo para mostrar en edición) */}
              {mode === 'edit' && (
                <div className="space-y-2">
                  <SimulationInput
                    label={FORM_LABELS.termMonths}
                    name="termMonths"
                    type="number"
                    disabled={true}
                    error={errors.termMonths}
                  />
                  <p className="text-xs text-gray-500">
                    Esta duración se calcula automáticamente basada en las fechas de inicio y fin
                  </p>
                </div>
              )}

              {/* Estado (solo para edición) */}
              {mode === 'edit' && (
                <SimulationInput
                  label={FORM_LABELS.status}
                  name="status"
                  placeholder="Seleccionar estado"
                  options={[
                    { value: 'active', label: STATUS_LABELS.active },
                    { value: 'paused', label: STATUS_LABELS.paused },
                    { value: 'completed', label: STATUS_LABELS.completed }
                  ]}
                  error={errors.status}
                />
              )}

              <DialogFooter className="gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting || isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="min-w-[100px]"
                >
                  {(isSubmitting || isLoading) ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {mode === 'create' ? 'Creando...' : 'Guardando...'}
                    </>
                  ) : (
                    mode === 'create' ? 'Crear Simulación' : 'Guardar Cambios'
                  )}
                </Button>
              </DialogFooter>
            </Form>
            )
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}