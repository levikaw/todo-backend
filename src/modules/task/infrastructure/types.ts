import { PRIORITY_NAMES, STATUS_NAMES } from './constants';

export type StatusType = (typeof STATUS_NAMES)[keyof typeof STATUS_NAMES];

export type PriorityType = (typeof PRIORITY_NAMES)[keyof typeof PRIORITY_NAMES];
