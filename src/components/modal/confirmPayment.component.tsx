import { UserContext } from '@/contexts/user.context'
import { StyledModal } from '@/styles/modalstyles'
import { TitleH2 } from '@/styles/typography'
import CancelIcon from '@mui/icons-material/Cancel'
import { useRouter } from 'next/navigation'
import React from 'react'

const ConfirmPaymentModal = () => {
  const modalRef = React.useRef<HTMLDivElement>(null)

  const userContext = React.useContext(UserContext)

  const router = useRouter()

  const preventSubmit = (event: any) => {
    if (event.key === 'Enter') event.preventDefault()
    if (event.key === 'Escape') {
      event.preventDefault()
      userContext.setModalContinue(false)
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', preventSubmit)
    return () => {
      document.removeEventListener('keydown', preventSubmit)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !(modalRef.current as HTMLElement).contains(event.target as HTMLElement)
      ) {
        userContext.setModalContinue(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalRef])

  return (
    <StyledModal>
      <section className="modal" ref={modalRef}>
        <form>
          <CancelIcon
            fontSize="large"
            color="disabled"
            onClick={(event) => {
              event.preventDefault()
              userContext.setModalContinue(false)
            }}
          />

          <h3 style={{ textAlign: 'center', fontSize: '12px' }}>
            Você informou o código na descrição do pagamento?
          </h3>
          <div style={{ gap: '1rem' }}>
            <button
              type="submit"
              onClick={() => handleFinish()}
            >
              Sim
            </button>

            <button
              type="submit"
              onClick={(event) => {
                event.preventDefault()
                userContext.setModalContinue(false)
                router.push('/cart')
              }}
            >
              Não
            </button>
          </div>
        </form>
      </section>
    </StyledModal>
  )
}

export default ConfirmPaymentModal
