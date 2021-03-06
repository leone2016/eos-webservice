import {BaseModel, schemaOptions} from '../../base.model';
import {DocumentStatus} from '../../configuration/documentStatus.enum';
import {InstanceType, ModelType, prop} from 'typegoose';
import { Expose } from 'class-transformer';
import {TodoLevel} from "../../../todo/models/todo-level.enum";

export class Catalogue extends BaseModel<Catalogue> {
    @prop({
       required: [true, 'Label is required'],
        minlength: [1, 'Must be at least 1 characters'],
        maxlength: [100, 'Must be at most 100 characters'],
    })
    @Expose()
    label: string;

    @prop({
        required: [true, 'Value is required'],
        minlength: [1, 'Must be at least 1 characters'],
        maxlength: [100, 'Must be at most 100 characters'],
    })
    @Expose()
    value: string;

    @prop({
        maxlength: [500, 'Must be at most 500 characters'],
    })
    @Expose()
    description: string;

    @prop()
    @Expose()
    order: number;

    @prop()
    @Expose()
    company: string;

    @prop({ enum: DocumentStatus, default: DocumentStatus.ENABLED })
    @Expose()
    documentStatus: DocumentStatus;


    static get model(): ModelType<Catalogue> {
        return new Catalogue().getModelForClass(Catalogue, { schemaOptions });
    }

    static createModel(): InstanceType<Catalogue> {
        return new this.model();
    }
}
