import { Modal, CircularProgress } from "@mui/material";


const LoadingModal = ({open}) => {
    return (<Modal 
          open={open} 
          sx={{
            backdropFilter: "blur(2px)",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          disableAutoFocus={true}
        >
          <CircularProgress size="100px" />
    </Modal>)
}

export default LoadingModal