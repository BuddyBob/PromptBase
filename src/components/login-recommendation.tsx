import { Modal } from './ui/modal'
import { loginWithGoogle } from '@/lib/supabase'

interface LoginRecommendationProps {
  isOpen: boolean
  onClose: () => void
  message: string
  actionText: string
  onContinueWithoutLogin?: () => void
}

export function LoginRecommendation({ 
  isOpen, 
  onClose, 
  message, 
  actionText, 
  onContinueWithoutLogin 
}: LoginRecommendationProps) {
  const handleLogin = async () => {
    try {
      await loginWithGoogle()
      onClose()
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const handleContinue = () => {
    onContinueWithoutLogin?.()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Account Recommended">
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-300">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={handleContinue}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-600 rounded"
          >
            Continue without account
          </button>
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {actionText}
          </button>
        </div>
      </div>
    </Modal>
  )
}
