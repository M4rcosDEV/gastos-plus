import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import type { DialogProps } from "@/interfaces/DialogProps"
import { IconCirclePlusFilled } from "@tabler/icons-react"
import { useState } from "react"
import type { persist } from "zustand/middleware"


export function DialogFx({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  maxWidth = "sm:max-w-md",
  persist,
}:DialogProps) {

  const [shake, setShake] = useState(false)

  const triggerShake = () => {
    setShake(true)
    setTimeout(() => setShake(false), 300)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        onInteractOutside={(e) => {
          if(persist){
            e.preventDefault()     // impede fechar - OUT MODEL
            triggerShake()         // ativa animação
          }
        }}

        onEscapeKeyDown={(e) => {
          if(persist){
            e.preventDefault()     // impede fechar - ESCAPE
            triggerShake()         // ativa animação
          }

        }}
          className={`${maxWidth} ${shake ? "animate-shake" : ""}`}
        >
        
       <DialogHeader>
        {(title || description) && (
          <>
            <div className="flex items-center gap-2">
              {/* Ícone aqui */}
              <IconCirclePlusFilled className="size-5 text-primary" />

              {title && <DialogTitle>{title}</DialogTitle>}
            </div>

            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </>
        )}
      </DialogHeader>

        {children}

        {footer && <DialogFooter>{footer}</DialogFooter>}
        
      </DialogContent>
    </Dialog>
  )
}
