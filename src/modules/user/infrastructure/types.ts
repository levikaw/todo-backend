import { ROLE_ALIAS } from './constants';

export type RoleAliasType = (typeof ROLE_ALIAS)[keyof typeof ROLE_ALIAS];
