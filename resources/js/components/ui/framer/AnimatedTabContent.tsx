import { motion } from 'framer-motion'

import { TabsContent } from '@/components/ui/tabs'

import type { ReactNode } from 'react'


interface AnimatedTabContentProps {
  value: string
  children: ReactNode
}

export default function AnimatedTabContent({ value, children }: AnimatedTabContentProps) {
  return (
    <motion.div
      key={value}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <TabsContent value={value} forceMount>
        {children}
      </TabsContent>
    </motion.div>
  )
}
