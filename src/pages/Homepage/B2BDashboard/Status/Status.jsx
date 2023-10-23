import Card from "../../../../components/shared/Card/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Status = ({ statusCountB2B }) => {

  const getStatusColor = (statusName) => {
    switch (statusName) {
      case 'Novo':
        return 'var(--statusNew)';
      case 'Potvrđeno':
        return 'var(--statusConfirmed)';
      case 'Paket spreman za slanje':
        return 'var(--statusReady)';
      case 'U obradi':
        return 'var(--statusReady)';
      case 'Paket je preuzet':
        return 'var(--statusTaken)';
      case 'Porudžbina je dostavljena':
        return 'var(--statusDelivered)';
      case 'Kompletirano':
        return 'var(--statusCompleted)';
      case 'Otkazano':
        return 'var(--statusCanceled)';
      case 'Stornirano':
        return 'var(--statusCanceled)';
      default:
        return 'defaultnaBoja';
    }
  };

  return (
    <Card
      styleCard={{ display: "flex", flexDirection: "column", justifyContent: "center", gridColumn: "1/-1", boxShadow: "none" }}
      children={
        <>
          <CardHeader
            title={
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Typography variant="h6" sx={{ color: "var(--text-color)" }}>
                  Statusi kupovina
                </Typography>
              </Box>
            }

            subheader={
              <Box>
                <List sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", "@media (max-width: 1200px)": { display: "flex", flexWrap: "wrap", gap: "2rem" } }}>
                  {statusCountB2B?.map((status) => {
                    return (
                      <ListItem key={status?.name} sx={{ padding: 0, "@media (max-width: 1200px)": { width: "fit-content" } }}>
                        <ListItemText
                          primary={
                            <Typography variant="body2" sx={{ color: "var(--text-color)", fontWeight: "500" }}>
                              {status?.name}
                            </Typography>}
                          secondary={
                            <Typography
                              variant="caption"
                              sx={{ color: "var(--text-color)", fontWeight: "500", width: "2rem", height: "2rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: getStatusColor(status.name), marginTop: "0.3rem" }}
                            >
                              {status?.count ?? 0}
                            </Typography>
                          }
                        />
                      </ListItem>
                    )
                  })}
                </List>
              </Box>
            }
          />
        </>
      }
    />
  )
}

export default Status