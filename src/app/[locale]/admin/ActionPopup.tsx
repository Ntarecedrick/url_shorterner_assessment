import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import useActions from "./useActions";
import ProgressLoader from "@/_component/ProgressLoader";
import { Theme } from "@mui/material/styles";
import { Container, FormControl, Paper, TextField } from "@mui/material";

const style = [
  {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "8px",
  },
  (theme: Theme) => ({
    ...theme.applyStyles("dark", {
      backgroundColor: "#12161d",
      color: "white",
      backgroundImage: "none",
      boxShadow: "none",
    }),
  }),
];

export default function ActionPopup({
  trigger,
  id,
  isEdit,
  url,
  ttlInSeconds,
}: {
  trigger: string;
  id: string;
  isEdit?: boolean;
  url?: string;
  ttlInSeconds?: number;
}) {
  const {
    open,
    handleOpen,
    handleClose,
    handleDelete,
    isLoading,
    methods,
    handleEdit,
    isLoadingEdit,
    styles,
    inputStyles,
    tAdmin: t
  } = useActions({ id, url, ttlInSeconds });


  return (
    <Container sx={{ padding: 0, "@media (min-width: 600px)": { padding: 0 } }}>
      <Button
        variant="contained"
        color={isEdit ? "primary" : "error"}
        onClick={handleOpen}
        sx={{
          fontFamily: "Roboto",
          textTransform: "capitalize",
          transition: "all 0.3s ease-in-out",
          padding: "0px 10px",
          backgroundColor: isEdit ? "primary.main" : "error.main",
          color: isEdit ? "primary.contrastText" : "error.contrastText",
        }}
      >
        {trigger}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={[]}
      >
        {isEdit ? (
          <FormControl
            component="form"
            sx={style}
            onSubmit={methods.handleSubmit(handleEdit)}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "500", fontFamily: "Roboto" }}
            >
              {t("edit")}
            </Typography>
            <Paper sx={styles}>
              <Typography id="modal-modal-description" variant="h6" sx={{fontSize:"16px"}}>
                Url
              </Typography>
              <TextField
                {...methods.register("url")}
                sx={inputStyles}
              />
            </Paper>
            <Paper sx={styles}>
              <Typography id="modal-modal-description" variant="h6" sx={{fontSize:"16px"}}>
                TTL
              </Typography>
              <TextField
                {...methods.register("ttlInSeconds", { valueAsNumber: true })}
                type="number"
                sx={inputStyles}
              />
            </Paper>
            <Box sx={{ display: "flex", gap: 1, justifyContent: "end", mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isLoadingEdit}
                sx={{
                  textTransform: "capitalize",
                  height: "30px",
                  fontWeight: "500",
                  "&:disabled": {
                    bgcolor: "primary.200",
                    color: "primary.main",
                  },
                }}
              >
                {isLoadingEdit ? <ProgressLoader /> : t("edit")}
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "primary.200",
                  color: "primary.main",
                  height: "30px",
                  textTransform: "capitalize",
                }}
                onClick={handleClose}
              >
                {t("cancel")}
              </Button>
            </Box>
          </FormControl>
        ) : (
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {t("delete")}
            </Typography>
            <Typography id="modal-modal-description" sx={{}}>
              {t("deleteConfirm")}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "end", mt: 2 }}>
              <Button
                disabled={isLoading}
                variant="contained"
                color="error"
                sx={{
                  "&[disabled]": {
                    backgroundColor: "error.200",
                    color: "error.main",
                  },
                  backgroundColor: "error.main",
                  height: "30px",
                  boxShadow: "none",
                  textTransform: "capitalize",
                }}
                onClick={() => handleDelete(id)}
              >
                {isLoading ? <ProgressLoader /> : t("delete")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClose}
                sx={{
                  bgcolor: "primary.200",
                  color: "primary.main",
                  height: "30px",
                  textTransform: "capitalize",
                }}
              >
                {t("cancel")}
              </Button>
            </Box>
          </Box>
        )}
      </Modal>
    </Container>
  );
}
