'use client'

import { motion } from 'framer-motion'
import { Paper } from '@mui/material'
import { ReactNode, useState } from 'react'

interface GlowCardProps {
  children: ReactNode
  className?: string
  enableTilt?: boolean
}

export default function GlowCard({
  children,
  className,
  enableTilt = true,
}: GlowCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt) return

    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const tiltX = ((y - centerY) / centerY) * -5 // Max 5deg tilt
    const tiltY = ((x - centerX) / centerX) * 5

    setTilt({ x: tiltX, y: tiltY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  const cardVariants = {
    default: {
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
    },
    hover: {
      boxShadow: '0 8px 50px rgba(0, 255, 0, 0.3)',
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="default"
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        borderRadius: '16px',
      }}
    >
      <Paper
        elevation={4}
        className={className}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          background: 'rgba(10, 10, 10, 0.85)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)', // Safari support
          border: '1px solid #1a1a1a',
          borderRadius: '16px',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '16px',
            padding: '1px',
            background: 'linear-gradient(135deg, rgba(0, 255, 0, 0.1) 0%, rgba(0, 255, 0, 0.05) 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            pointerEvents: 'none',
          },
          '&:hover': {
            borderColor: 'rgba(0, 255, 0, 0.3)',
          },
        }}
      >
        {children}
      </Paper>
    </motion.div>
  )
}
