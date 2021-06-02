import { AuthState } from '../store/auth/auth.actions';
import { Api } from './api.interface';

export * from './api.interface'

export interface AppState{
    readonly auth : AuthState
}