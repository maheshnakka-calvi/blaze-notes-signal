export type serviceTodo = {
    id: number;
    todo: string;
    completed: boolean;
};

export type serviceResponse = {
    todos: serviceTodo[];
}