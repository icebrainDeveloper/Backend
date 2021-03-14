import * as mongoose from 'mongoose';
import {User} from './user.model';
import {Role} from './role.model'

const ROLES = ["user", "admin"];

export const db = {
    mongoose: mongoose,
    user: User,
    role: Role,
    ROLES: ROLES
};
