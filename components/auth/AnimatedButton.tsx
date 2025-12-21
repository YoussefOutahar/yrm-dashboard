'use client'

import { motion } from 'framer-motion'
import { Button, ButtonProps, CircularProgress } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'

interface AnimatedButtonProps extends Omit<ButtonProps, 'component'> {
  loading?: boolean
  success?: boolean
  loadingText?: string
}

export default function AnimatedButton({
  children,
  loading = false,
  success = false,
  loadingText,
  disabled,
  ...props
}: AnimatedButtonProps) {
  const buttonVariants = {
    idle: {
      scale: 1,
      boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 0 30px rgba(0, 255, 0, 0.6)',
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
    loading: {
      boxShadow: [
        '0 0 10px rgba(0, 255, 0, 0.3)',
        '0 0 20px rgba(0, 255, 0, 0.6)',
        '0 0 10px rgba(0, 255, 0, 0.3)',
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
      },
    },
    success: {
      scale: [1, 1.1, 1],
      transition: { duration: 0.6 },
    },
  }

  const getAnimationState = () => {
    if (loading) return 'loading'
    if (success) return 'success'
    return 'idle'
  }

  return (
    <motion.div
      variants={buttonVariants}
      initial="idle"
      animate={getAnimationState()}
      whileHover={!loading && !disabled ? 'hover' : undefined}
      whileTap={!loading && !disabled ? 'tap' : undefined}
      style={{ width: '100%', marginTop: '16px' }}
    >
      <Button
        {...props}
        disabled={disabled || loading}
        variant="contained"
        size="large"
        fullWidth
        sx={{
          position: 'relative',
          background: success
            ? 'linear-gradient(135deg, #00ff00 0%, #0dff92 100%)'
            : 'linear-gradient(135deg, #00ff00 0%, #00cc00 100%)',
          color: '#000',
          fontWeight: 600,
          textTransform: 'none',
          fontSize: '1rem',
          py: 1.5,
          boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
          '&:hover': {
            background: success
              ? 'linear-gradient(135deg, #00ff00 0%, #0dff92 100%)'
              : 'linear-gradient(135deg, #33ff33 0%, #00ff00 100%)',
          },
          '&.Mui-disabled': {
            background: 'rgba(0, 255, 0, 0.3)',
            color: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        {loading && (
          <CircularProgress
            size={20}
            sx={{
              color: '#000',
              position: 'absolute',
              left: '50%',
              marginLeft: '-10px',
            }}
          />
        )}
        {success && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
            }}
            style={{
              position: 'absolute',
              left: '50%',
              marginLeft: '-12px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <CheckIcon />
          </motion.div>
        )}
        <span style={{ opacity: loading || success ? 0 : 1 }}>
          {loading && loadingText ? loadingText : children}
        </span>
      </Button>
    </motion.div>
  )
}
