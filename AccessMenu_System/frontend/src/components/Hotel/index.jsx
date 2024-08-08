import { QuerySchema } from "schema";
import { Form, Input } from "components/Form";
import { useGlobalContext } from "hooks";
import { useState, useRef } from "react";
import { getErrorMessage } from "utils";
import { useAuthControls } from "hooks/useAuthControls";
import { Box, Button, Card, Typography, useTheme, Grid, Fab, TextField, MenuItem } from "@mui/material";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import LinearProgress from '@mui/material/LinearProgress';
import { request } from "api";
import { DataGrid } from '@mui/x-data-grid';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { styled } from '@mui/material/styles';
import { red } from "@mui/material/colors";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export default function Hotel(props) {
    const { rawMenu, hotelName, q1, k1, q2, k2, q3, k3, q4, k4, q5, k5 } = props
    const [mainMenu, setMainMenu] = useState(rawMenu)
    const [error, setError] = useState(null);
    const { setPageLoading } = useGlobalContext();
    const { login } = useAuthControls();
    const theme = useTheme()
    const queryClient = useQueryClient()

    const handleSubmit = (data) => {
        console.log('Submitted Query', data.query);
        if ((data.query).toLowerCase().includes(k1))
            setMainMenu(q1)
        else if ((data.query).toLowerCase().includes(k2))
            setMainMenu(q2)
        else if ((data.query).toLowerCase().includes(k3))
            setMainMenu(q3)
        else if ((data.query).toLowerCase().includes(k4))
            setMainMenu(q4)
        else if ((data.query).toLowerCase().includes(k5))
            setMainMenu(q5)

    }

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 150,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 550,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'dietary_preference',
            headerName: 'Dietary Preference',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => {
                const dp = params.row.options.dietary_preference
                console.log('DPpppp ', dp);
                if (dp)
                    return dp[0]
                else
                    return "N/A"

            }
        }
    ]
    return (<>

        <Typography variant="h3" gutterBottom>
            <Fab style={{ marginRight: '20px' }} onClick={() => setMainMenu(rawMenu)} color="primary" aria-label="add"><RestaurantMenuIcon /></Fab>
            {(hotelName).toUpperCase()}
        </Typography>
        <Form schema={QuerySchema} onSubmit={handleSubmit}>
            <Grid container style={{ padding: '10px' }}>
                <Grid item lg={9}>
                    <Input name="query" label="User Query" fullWidth />
                </Grid>
                <Grid lg={3} align="right">
                    <Fab color="primary" aria-label="add"><MicIcon /></Fab>
                    <Fab style={{ marginLeft: '20px' }} onClick={() => { console.log('Fabbb Clickeddd'); }} type="submit" color="primary" aria-label="add"><SendIcon /></Fab>
                </Grid>
            </Grid>
            {error && <p>{error}</p>}
        </Form>
        {
            mainMenu.items.map((data) => {
                return (<Accordion sx={{ margin: '10px' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ backgroundColor: '#EEF5FF' }}
                    >
                        {(data.name)}
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{ backgroundColor: '#176B87' }}
                    >
                        <Grid container spacing={2}>
                            <Grid item>
                                <Item tabIndex={0}>Description : {data.description}</Item>
                            </Grid>
                            <Grid item>
                                <Item tabIndex={0}>Price : $ {data.price}</Item>
                            </Grid>
                            {data.options?.dietary_preference && <Grid item>
                                <Item tabIndex={0}>Dietary Preference : {data.options.dietary_preference}</Item>
                            </Grid>}
                            {data.calories && <Grid item>
                                <Item tabIndex={0}>Calories : {data.calories}</Item>
                            </Grid>}
                            {data.ingredients && <Grid item>
                                <Item tabIndex={0}>Ingredients : {data.ingredients.map((items) => { return (items + ",") })} </Item>
                            </Grid>}
                        </Grid>
                    </AccordionDetails>
                </Accordion>)
            }

            )
        }
    </>
    );
}
