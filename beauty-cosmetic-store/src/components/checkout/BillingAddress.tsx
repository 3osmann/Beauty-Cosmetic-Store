"use client"

import type { UseFormReturn } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
]

const COUNTRIES = [
  "United States", "Canada", "United Kingdom", "Australia",
  "France", "Germany", "Italy", "Spain",
]

interface BillingAddressProps {
  form: UseFormReturn<any>
  prefix?: string
}

export function BillingAddress({ form, prefix = "billing" }: BillingAddressProps) {
  const { register, formState: { errors } } = form
  const fieldError = (name: string) => {
    const err = name.split(".").reduce((obj: any, key) => obj?.[key], errors)
    return err?.message as string | undefined
  }

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-gray-900">Billing Address</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor={`${prefix}.firstName`}>First Name</Label>
          <Input id={`${prefix}.firstName`} {...register(`${prefix}.firstName`)} />
          {fieldError(`${prefix}.firstName`) && (
            <p className="text-xs text-red-500">{fieldError(`${prefix}.firstName`)}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`${prefix}.lastName`}>Last Name</Label>
          <Input id={`${prefix}.lastName`} {...register(`${prefix}.lastName`)} />
          {fieldError(`${prefix}.lastName`) && (
            <p className="text-xs text-red-500">{fieldError(`${prefix}.lastName`)}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={`${prefix}.company`}>Company (optional)</Label>
        <Input id={`${prefix}.company`} {...register(`${prefix}.company`)} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={`${prefix}.country`}>Country</Label>
        <Select id={`${prefix}.country`} {...register(`${prefix}.country`)}>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Select>
        {fieldError(`${prefix}.country`) && (
          <p className="text-xs text-red-500">{fieldError(`${prefix}.country`)}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={`${prefix}.street`}>Street Address</Label>
        <Input id={`${prefix}.street`} {...register(`${prefix}.street`)} placeholder="123 Main St" />
        {fieldError(`${prefix}.street`) && (
          <p className="text-xs text-red-500">{fieldError(`${prefix}.street`)}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={`${prefix}.apartment`}>Apartment, suite, etc. (optional)</Label>
        <Input id={`${prefix}.apartment`} {...register(`${prefix}.apartment`)} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor={`${prefix}.city`}>City</Label>
          <Input id={`${prefix}.city`} {...register(`${prefix}.city`)} />
          {fieldError(`${prefix}.city`) && (
            <p className="text-xs text-red-500">{fieldError(`${prefix}.city`)}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`${prefix}.state`}>State</Label>
          <Select id={`${prefix}.state`} {...register(`${prefix}.state`)}>
            <option value="">Select state</option>
            {US_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Select>
          {fieldError(`${prefix}.state`) && (
            <p className="text-xs text-red-500">{fieldError(`${prefix}.state`)}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`${prefix}.zip`}>ZIP Code</Label>
          <Input id={`${prefix}.zip`} {...register(`${prefix}.zip`)} />
          {fieldError(`${prefix}.zip`) && (
            <p className="text-xs text-red-500">{fieldError(`${prefix}.zip`)}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor={`${prefix}.phone`}>Phone</Label>
          <Input id={`${prefix}.phone`} {...register(`${prefix}.phone`)} type="tel" />
          {fieldError(`${prefix}.phone`) && (
            <p className="text-xs text-red-500">{fieldError(`${prefix}.phone`)}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`${prefix}.email`}>Email</Label>
          <Input id={`${prefix}.email`} {...register(`${prefix}.email`)} type="email" />
          {fieldError(`${prefix}.email`) && (
            <p className="text-xs text-red-500">{fieldError(`${prefix}.email`)}</p>
          )}
        </div>
      </div>
    </div>
  )
}
