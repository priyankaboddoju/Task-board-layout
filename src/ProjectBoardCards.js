import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    cursor: 'move',
}));

// Define the types for drag and drop
const ItemType = {
    CARD: 'CARD',
};

// Draggable Item Component
const DraggableItem = ({ id, text, onDrop }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemType.CARD,
        item: { id, text },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const [, drop] = useDrop(() => ({
        accept: ItemType.CARD,
        drop: () => onDrop(id),
    }));

    return (
        <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <Item>{text}</Item>
        </div>
    );
};

export default function ResponsiveGrid() {
    const [backlogCards, setBacklogCards] = React.useState(["Card 1", "Card 2", "Card 3", "Card 4"]);
    const [todoCards, setTodoCards] = React.useState([]);

    const handleDropToTodo = (cardId) => {
        const cardIndex = backlogCards.findIndex((card) => cardId === `backlog-${card}`);
        if (cardIndex !== -1) {
            const draggedCard = backlogCards[cardIndex];
            setBacklogCards((prevBacklogCards) => prevBacklogCards.filter((_, index) => index !== cardIndex));
            setTodoCards((prevTodoCards) => [...prevTodoCards, draggedCard]);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <Box sx={{ flexGrow: 1, mt: 3 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {/* Backlog Section */}
                    <Grid item xs={2} sm={4} md={3}>
                        <Item>
                            <Grid container spacing={2} direction="column">
                                <Grid item>
                                    <Typography variant="h6" gutterBottom>
                                        Backlog
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {`Total Cards: ${backlogCards.length}`}
                                    </Typography>
                                </Grid>
                                {backlogCards.map((card, index) => (
                                    <Grid item key={index}>
                                        <DraggableItem id={`backlog-${index}`} text={card} onDrop={handleDropToTodo} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Item>
                    </Grid>

                    {/* TO DO Section */}
                    <Grid item xs={2} sm={4} md={3}>
                        <Item>
                            <Grid container spacing={2} direction="column">
                                <Grid item>
                                    <Typography variant="h6" gutterBottom>
                                        TO DO
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {`Total Tasks: ${todoCards.length}`}
                                    </Typography>
                                </Grid>
                                {todoCards.map((task, index) => (
                                    <Grid item key={index}>
                                        <Item>{task}</Item>
                                    </Grid>
                                ))}
                            </Grid>
                        </Item>
                    </Grid>

                    {/* Additional Grid items can be added here */}
                </Grid>
            </Box>
        </DndProvider>
    );
}
