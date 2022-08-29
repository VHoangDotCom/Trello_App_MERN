export const initialData = {
    boards: [
        {
            id: 'board-1',
            columnOrder: ['column-1', 'column-2', 'column-3'],
            columns: [
                {
                    id: 'column-1',
                    boardId: 'board-1',
                    title: 'To do column',
                    cardOrder: ['card-1', 'card-2', 'card-3', 'card-4'],
                    cards: [
                        {
                            id: 'card-1', boardId: 'board-1',columnId: 'column-1',title: 'Title of card 1',cover: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
                        },
                        {
                            id: 'card-2', boardId: 'board-1',columnId: 'column-1',title: 'Title of card 2',cover: null
                        },
                        {
                            id: 'card-3', boardId: 'board-1',columnId: 'column-1',title: 'Title of card 3',cover: null
                        },
                        {
                            id: 'card-4', boardId: 'board-1',columnId: 'column-1',title: 'Title of card 4',cover: null
                        },
                    ]
                },

                {
                    id: 'column-2',
                    boardId: 'board-1',
                    title: 'Inprogress column',
                    cardOrder: ['card-8', 'card-9', 'card-10'],
                    cards: [
                        {
                            id: 'card-8', boardId: 'board-1',columnId: 'column-2',title: 'Title of card 8',cover: null
                        },
                        {
                            id: 'card-9', boardId: 'board-1',columnId: 'column-2',title: 'Title of card 9',cover: null
                        },
                        {
                            id: 'card-10', boardId: 'board-1',columnId: 'column-2',title: 'Title of card 10',cover: null
                        },
                       
                    ]
                },

                {
                    id: 'column-3',
                    boardId: 'board-1',
                    title: 'Done column',
                    cardOrder: ['card-11', 'card-12', 'card-13'],
                    cards: [
                        {
                            id: 'card-11', boardId: 'board-1',columnId: 'column-3',title: 'Title of card 11',cover: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
                        },
                        {
                            id: 'card-12', boardId: 'board-1',columnId: 'column-3',title: 'Title of card 12',cover: null
                        },
                        {
                            id: 'card-13', boardId: 'board-1',columnId: 'column-3',title: 'Title of card 13',cover: null
                        },
                      
                    ]
                },

            ]
        }
    ]
}