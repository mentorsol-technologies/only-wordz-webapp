'use client'

import { Dialog } from 'radix-ui'

interface OverlayLoaderProps {
  open: boolean
}

const OverlayLoader = ({ open }: OverlayLoaderProps) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/20 backdrop-blur-xs" />
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="h-14 w-14 animate-spin rounded-full border-6 border-[#FF99C9] border-t-transparent" />
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default OverlayLoader
