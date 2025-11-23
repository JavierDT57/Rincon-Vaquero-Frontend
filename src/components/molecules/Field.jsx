import React from "react"
import Label from "../atoms/Label"
import Input from "../atoms/Input"

export default function Field({ id, label, icon: Icon, testId, inputProps = {}, labelClass="", inputClass="" }) {
  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id} className={"text-foreground font-medium " + labelClass}>{label}</Label>}
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />}
        <Input id={id} data-testid={testId} className={(Icon ? "pl-10 " : "") + inputClass} {...inputProps} />
      </div>
    </div>
  )
}
