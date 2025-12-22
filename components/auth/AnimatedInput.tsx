'use client'

import { motion } from 'framer-motion'
import { TextField, TextFieldProps, FormHelperText, IconButton, InputAdornment } from '@mui/material'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'

interface AnimatedInputProps extends Omit<TextFieldProps, 'variant'> {
  label: string
  error?: boolean
  errorMessage?: string
  showSuccessState?: boolean
}

export default function AnimatedInput({
  label,
  error = false,
  errorMessage,
  showSuccessState = false,
  onFocus,
  onBlur,
  type,
  ...props
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    onBlur?.(e)
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const shakeAnimation = error
    ? {
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.4 },
      }
    : {}

  const getBorderColor = () => {
    if (error) return '#ff0033'
    if (showSuccessState) return '#00ff00'
    if (isFocused) return '#00ff00'
    return '#1a1a1a'
  }

  const getBoxShadow = () => {
    if (error) return '0 0 20px rgba(255, 0, 51, 0.5)'
    if (showSuccessState) return '0 0 20px rgba(0, 255, 0, 0.5)'
    if (isFocused) return '0 0 20px rgba(0, 255, 0, 0.5)'
    return 'none'
  }

  return (
    <motion.div
      animate={shakeAnimation}
      style={{ marginBottom: '1.5rem' }}
    >
      <motion.div
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
      >
        <TextField
          {...props}
          type={type === 'password' && showPassword ? 'text' : type}
          label={label}
          fullWidth
          variant="outlined"
          error={error}
          onFocus={handleFocus}
          onBlur={handleBlur}
          slotProps={{
            htmlInput: {
              autoComplete: props.autoComplete,
            },
          }}
          InputProps={{
            ...props.InputProps,
            endAdornment: type === 'password' ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePasswordVisibility}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                  sx={{
                    color: isFocused ? '#00ff00' : 'text.secondary',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: '#00ff00',
                      backgroundColor: 'rgba(0, 255, 0, 0.1)',
                    },
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ) : props.InputProps?.endAdornment,
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              transition: 'all 0.3s ease',
              backgroundColor: isFocused ? 'rgba(15, 15, 15, 0.9)' : 'transparent',
              '& fieldset': {
                borderColor: getBorderColor(),
                borderWidth: '1px',
                transition: 'all 0.3s ease',
              },
              '&:hover fieldset': {
                borderColor: error ? '#ff0033' : '#00ff00',
              },
              '&.Mui-focused fieldset': {
                borderColor: error ? '#ff0033' : '#00ff00',
                borderWidth: '1px',
              },
              boxShadow: getBoxShadow(),
            },
            '& .MuiInputLabel-root': {
              color: error ? '#ff0033' : 'text.secondary',
              '&.Mui-focused': {
                color: error ? '#ff0033' : '#00ff00',
              },
            },
            '& .MuiOutlinedInput-input': {
              color: 'text.primary',
            },
          }}
        />
        {error && errorMessage && (
          <FormHelperText error sx={{ ml: 2, mt: 0.5 }}>
            {errorMessage}
          </FormHelperText>
        )}
      </motion.div>
    </motion.div>
  )
}
