import { 
 type TypedUseSelectorHook, 
  useDispatch, 
  useSelector 
} from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useTasks = () => {
  const tasks = useAppSelector(state => state.tasks.tasks);
  const filter = useAppSelector(state => state.tasks.filter);
  const dispatch = useAppDispatch();
  
  return {
    tasks,
    filter,
    dispatch
  };
};

export const useAuth = () => {
  const user = useAppSelector(state => state.auth.user);
  const token = useAppSelector(state => state.auth.token);
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  return {
    user,
    token,
    isAuthenticated,
    dispatch
  };
};
