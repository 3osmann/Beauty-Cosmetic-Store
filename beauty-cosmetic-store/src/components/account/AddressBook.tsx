"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Star,
  X,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

interface Address {
  id: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  isDefault: boolean
  label?: string
}

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

interface AddressBookProps {
  addresses?: Address[]
}

const MOCK_ADDRESSES: Address[] = [
  {
    id: "1",
    street: "123 Main Street, Apt 4B",
    city: "New York",
    state: "New York",
    zip: "10001",
    country: "United States",
    isDefault: true,
    label: "Home",
  },
  {
    id: "2",
    street: "456 Business Ave, Suite 200",
    city: "Los Angeles",
    state: "California",
    zip: "90001",
    country: "United States",
    isDefault: false,
    label: "Office",
  },
]

export function AddressBook({ addresses = MOCK_ADDRESSES }: AddressBookProps) {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [localAddresses, setLocalAddresses] = useState(addresses)

  const [formData, setFormData] = useState({
    label: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    isDefault: false,
  })

  const resetForm = () => {
    setFormData({
      label: "", street: "", apartment: "", city: "", state: "",
      zip: "", country: "United States", isDefault: false,
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleEdit = (addr: Address) => {
    setFormData({
      label: addr.label || "",
      street: addr.street,
      apartment: "",
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
      country: addr.country,
      isDefault: addr.isDefault,
    })
    setEditingId(addr.id)
    setShowForm(true)
  }

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      if (editingId) {
        setLocalAddresses((prev) =>
          prev.map((a) =>
            a.id === editingId
              ? { ...a, ...formData, id: editingId }
              : formData.isDefault ? { ...a, isDefault: false } : a
          )
        )
      } else {
        const newAddr: Address = {
          id: `${Date.now()}`,
          ...formData,
        }
        setLocalAddresses((prev) =>
          formData.isDefault
            ? [newAddr, ...prev.map((a) => ({ ...a, isDefault: false }))]
            : [...prev, newAddr]
        )
      }
      setSaving(false)
      resetForm()
    }, 800)
  }

  const handleDelete = (id: string) => {
    setLocalAddresses((prev) => prev.filter((a) => a.id !== id))
  }

  const handleSetDefault = (id: string) => {
    setLocalAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Address Book</h1>
        {!showForm && (
          <Button variant="primary" size="sm" onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-1.5" />
            Add Address
          </Button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingId ? "Edit Address" : "Add New Address"}
              </h3>
              <button
                onClick={resetForm}
                className="h-8 w-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="space-y-1.5">
                <Label>Label (e.g. Home, Office)</Label>
                <Input
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="Home"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Country</Label>
                <Select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>Street Address</Label>
                <Input
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  placeholder="123 Main St"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Apartment, suite, etc. (optional)</Label>
                <Input
                  value={formData.apartment}
                  onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                  placeholder="Apt 4B"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label>City</Label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="New York"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>State</Label>
                  <Select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  >
                    <option value="">Select state</option>
                    {US_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>ZIP Code</Label>
                  <Input
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    placeholder="10001"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={formData.isDefault}
                  onCheckedChange={(v) => setFormData({ ...formData, isDefault: !!v })}
                />
                <span className="text-sm text-gray-700">Set as default address</span>
              </label>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={resetForm}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSave}
                  disabled={saving || !formData.street || !formData.city || !formData.state || !formData.zip}
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                      Saving...
                    </>
                  ) : editingId ? (
                    "Update Address"
                  ) : (
                    "Save Address"
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {localAddresses.map((addr, idx) => (
            <motion.div
              key={addr.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={cn(
                "bg-white rounded-xl border-2 p-5 relative group transition-all",
                addr.isDefault ? "border-[#B76E79]" : "border-gray-200 hover:border-gray-300"
              )}
            >
              {addr.isDefault && (
                <div className="absolute -top-2.5 -right-2.5 h-6 w-6 rounded-full bg-[#B76E79] flex items-center justify-center shadow-md">
                  <Star className="h-3 w-3 text-white fill-white" />
                </div>
              )}

              <div className="flex items-start gap-3 mb-3">
                <div className={cn(
                  "h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0",
                  addr.isDefault ? "bg-[#B76E79]/10" : "bg-gray-50"
                )}>
                  <MapPin className={cn("h-4 w-4", addr.isDefault ? "text-[#B76E79]" : "text-gray-400")} />
                </div>
                <div className="flex-1 min-w-0">
                  {addr.label && (
                    <p className="text-sm font-semibold text-gray-900">{addr.label}</p>
                  )}
                  {addr.isDefault && (
                    <span className="text-[10px] font-semibold text-[#B76E79] uppercase tracking-wider">
                      Default
                    </span>
                  )}
                </div>
              </div>

              <div className="text-sm text-gray-600 space-y-0.5">
                <p>{addr.street}</p>
                <p>{addr.city}, {addr.state} {addr.zip}</p>
                <p>{addr.country}</p>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(addr)}
                  className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#B76E79] transition-colors px-2 py-1 rounded hover:bg-gray-50"
                >
                  <Pencil className="h-3 w-3" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-red-500 transition-colors px-2 py-1 rounded hover:bg-red-50"
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </button>
                {!addr.isDefault && (
                  <button
                    onClick={() => handleSetDefault(addr.id)}
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#B76E79] transition-colors px-2 py-1 rounded hover:bg-gray-50 ml-auto"
                  >
                    <Star className="h-3 w-3" />
                    Set Default
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
