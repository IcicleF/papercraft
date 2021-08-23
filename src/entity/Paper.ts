import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Paper {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    title: string;
}
