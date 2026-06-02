// components/users/InlineEditField.tsx
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Pencil, Check, X } from "lucide-react"

type Props = {
  label:    string
  value:    string | null | undefined
  canEdit:  boolean
  onSave:   (value: string) => Promise<void>
  saving:   boolean
}

export function InlineEditField({ label, value, canEdit, onSave, saving }: Props) {
  const [editing, setEditing] = useState(false)
  const [inputValue, setInputValue] = useState(value ?? "")

  const handleSave = async () => {
    await onSave(inputValue)
    setEditing(false)
  }

  const handleCancel = () => {
    setInputValue(value ?? "")
    setEditing(false)
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1">
        <p className="text-sm font-medium">{label}</p>
        {editing ? (
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="mt-1 h-8 text-sm"
            autoFocus
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            {value ?? "Not set"}
          </p>
        )}
      </div>

      {canEdit && (
        <div className="flex gap-1">
          {editing ? (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={handleSave}
                disabled={saving}
              >
                <Check className="w-4 h-4 text-green-500" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={handleCancel}
              >
                <X className="w-4 h-4 text-destructive" />
              </Button>
            </>
          ) : (
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => setEditing(true)}
            >
              <Pencil className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}