
const [columns, setColumns] = useState(columnsFromBackend);

const itemsFromBackend = [
    { id: uuid(), content: "first task" },
    { id: uuid(), content: "second task" },
];

const columnsFromBackend = {
    [uuid()]: {
        name: "Todo",
        items: itemsFromBackend,
    },
    [uuid()]: {
        name: "In progress",
        items: [],
    },
};


const onDragEnd = (result, columns, setColumns) => {
    
    if (!result.destination) {
        return;
    }
    const { source, destination } = result

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];

        const [removed] = sourceItems.splice(source.index, 1)
        destItems.splice(destination.index, 0, removed)
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        })
    } else {
        const { source, destination } = result;
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...columns,
                items: copiedItems,
            },
        });
    }
};



<DragDropContext
onDragEnd={(result) =>
    onDragEnd(result, columns, setColumns)
}
>
{Object.entries(columns).map(([id, column]) => {
    return (
        <div>
            <h2>{column.name}</h2>
            <Droppable droppableId={id} key={id}>
                {(provided, snapshot) => {
                    return (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                                background: snapshot.isDraggingOver
                                    ? "lightblue"
                                    : "lightgrey",
                                padding: 4,
                                width: 250,
                                minHeight: 500,
                                marginRight: 10,
                            }}
                        >
                            {column.items.map(
                                (item, index) => {
                                    return (
                                        <Draggable
                                            key={item.id}
                                            draggableId={
                                                item.id
                                            }
                                            index={index}
                                        >
                                            {(
                                                provided,
                                                snapshot
                                            ) => {
                                                return (
                                                    <div
                                                        ref={
                                                            provided.innerRef
                                                        }
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{
                                                            userSelect:
                                                                "none",
                                                            padding: 16,
                                                            margin:
                                                                "0 0 8px 0",
                                                            minHeight:
                                                                "50px",
                                                            backgroundColor: snapshot.isDragging
                                                                ? "#263b4a"
                                                                : "#456c86",
                                                            color:
                                                                "white",
                                                            ...provided
                                                                .draggableProps
                                                                .style,
                                                        }}
                                                    >
                                                        {
                                                            item.content
                                                        }
                                                    </div>
                                                );
                                            }}
                                        </Draggable>
                                    );
                                }
                            )}
                            {provided.placeholder}
                        </div>
                    );
                }}
            </Droppable>
        </div>
    );
})}
</DragDropContext>