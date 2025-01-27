import {
	Table,
	Column,
	Model,
	DataType,
	PrimaryKey,
	AllowNull,
	Default,
	IsUUID,
	ForeignKey,
	BelongsTo,
} from "sequelize-typescript";
import User from "./user.model";

@Table({
	tableName: "tasks",
	timestamps: true,
})
export default class Task extends Model {
	@IsUUID(4)
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.UUID)
	declare id: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	declare title: string;

	@AllowNull(false)
	@Column(DataType.TEXT)
	declare description: string;

	@ForeignKey(() => User)
	@AllowNull(false)
	@Column(DataType.UUID)
	declare userId: string;

	@BelongsTo(() => User)
	declare user: User;
}
