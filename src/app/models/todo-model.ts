export type Todo = {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    addedDate: Date;
    updatedDate: Date | null;
}